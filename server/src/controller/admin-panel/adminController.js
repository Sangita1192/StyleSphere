const Admin = require("../../models/admin");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');  ///need to send otp from this email


const otpStore = new Map();  //to store otp, for verification-(same as object but powerful when server heavy and store data in key:value)


//there is no feature of create Admin, that is why no need of req, response
const registerAdmin = async () => {
    try {
        const adminData = await Admin.find();
        if (adminData.length !== 0) return console.log(adminData[0]);
        const newAdmin = new Admin({
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD
        })
        const response = await newAdmin.save();
        console.log('admin registered', response);
    }
    catch (error) {
        console.log(error);
    }
}

//login controller

const adminLogin = async (req, res) => {
    try {
        const adminData = await Admin.findOne({ email: req.body.email });

        if (!adminData) return res.status(401).json({ message: "Invalid Email" });

        if (adminData.password !== req.body.password) return res.status(401).json({ message: "Invalid Password" });

        jwt.sign(adminData._doc, process.env.JWT_KEY, { expiresIn: '10d' }, (error, token) => {
            if (error) {
                console.log(error);
                res.status(501).json({ message: "try after some time" });
                return;
            }
            res.status(200).json({ message: "success", data: adminData, token });
        })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
}

const verifyAdminLogin = async (req, res) => {
    try {
        jwt.verify(req.body.auth, process.env.JWT_KEY, (error, decode) => {
            if (error) return res.status(401).json({ message: "invalid token" });
            const filePath = `${req.protocol}://${req.get('host')}/frank-and-oak-admin-files/`;
            res.status(200).json({ message: "success", filePath, data: decode });
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error!" });
    }
}

//generate OTP controller

const generateOtp = async (req, res) => {
    try {
        let otp;
        let loop = true;
        while (loop) {
            let tempOtp = Math.floor(Math.random() * 10000);
            if (tempOtp >= 1000 && tempOtp <= 9999) {
                otp = tempOtp;
                loop = false;
            } else {
                loop = true;
            }
        }

        otpStore.set(req.body.email, otp);  //save email and otp

        setTimeout(() => {
            otpStore.delete(req.body.email);
        }, 60000);    ///it will delete after 60seconds

        //create transport from where otp has to be sent
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAILER_EMAIL,
                pass: process.env.MAILER_PASSWORD
            },
            tls: {
                rejectUnauthorized: false,
            }
        });

        //where mail need to be send
        const options = {
            from: process.env.MAILER_EMAIL,
            to: req.body.email,
            subject: "OTP",
            text: `your otp is ${otp}`
        }

        //send mailer method takes two argument one is mail information and other is callback, that further takes twor
        // arguments first should be always error and second decode.
        transport.sendMail(options, (error, decode) => {
            if (error) {
                console.log(error.message);
                return res.status(500).json({ message: "error" })
            }
            ;
            res.status(200).json({ message: "otp sent" });

        })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server errror" });
    }
}


//verify otp and update email controller

const updateEmail = async (req, res) => {
    try {
        const sentOtp = otpStore.get(req.body.email);
        console.log(req.body);

        if (sentOtp !== Number(req.body.otp)) return res.status(401).json({ message: "invalid otp" });
        const response = await Admin.updateOne(
            { email: req.body.email },
            { $set: { email: req.body.newemail } }
        );
        res.status(200).json({ message: "success", data: response });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
}

module.exports = {
    registerAdmin,
    adminLogin,
    generateOtp,
    updateEmail,
    verifyAdminLogin

}