const Order = require('../../models/order');
const Product = require('../../models/product');

//import payment gateway with key;
const stripe = require('stripe')('sk_test_51LiyTNSH4QsKt7gAYWZpIajuDuTSeWPEHeErouhsUMtjITkHYE1cLM96gn6LvqicLVyyuy0D32wz2IK60S74ERLy00xyqVFrDo');

const createCheckout = async (req, res) => {
    try {
        const product = req.body.cart.map((product)=>product.product);
        const user = req.body.cart[0].user;
        //create lineitems as stripe payment gateway require data has be in the line format(object of array--every product details has be in object)
        const lineItems = req.body.cart.map((item) => (
            {
                price_data: {
                    currency: 'usd',
                    product_data:
                    {
                        name: item.product.name,
                        images: ['https://fashionista.com/.image/t_share/MTkxODQ2MTY0MzkwMjI1NTcx/copenhagen-denim-style.jpg'],   //has to live image
                    },
                    unit_amount: item.product.price * 100   // unit amount is the smallest amount as for 1 dollor cent is the smallest amount
                },
                quantity: item.quantity,
            }
        ));

        //next step is create customer to use payment gateway-customer need to be registered

        const customer = await stripe.customers.create({
            name: req.body.address.firstname + ' ' + req.body.address.lastname,
            address: {
                line1: req.body.address.address1,
                line2: req.body.address.address2,
                city: req.body.address.city,
                state: req.body.address.state,
                postal_code: req.body.address.zipcode,
                country: req.body.address.country
            }
        });

        const responseOrder = new Order({
            user,
            items: lineItems,
            customer: customer,
            amount: req.body.totalAmt,
            productId: product   //store product Ids
        });

        const orderData = await responseOrder.save();

        //create sessions
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],   //here can be other payment method 
            line_items: lineItems,
            mode: 'payment',
            success_url: `http://localhost:3000/payment/success/${orderData._id}`,
            cancel_url: `http://localhost:3000/payment/failed/${orderData._id}`,
            customer: customer.id
        });

        //update session object in Order model

        await Order.updateOne({ _id: orderData._id }, {
            $set: {
                session
            }
        })


        res.status(200).json({ message: "success", session: session.id });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
}


//update-payment-status controller

const updatePaymentStatus = async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.id });
        const response = await Order.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    status: req.body.status
                }
            }
        )
        if (req.body.status === 'success') {
            for (const id of order.productId) {
                const updatedProduct = await Product.findById(id);
                
                if (updatedProduct) {
                    updatedProduct.salesCount += 1;
    
                    // Save the updated product
                    const productResponse = await updatedProduct.save();
                    console.log('Product salesCount updated', productResponse);
                }
            }
        }
        res.status(200).json({ message: "success", data: response });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
}
module.exports = {
    createCheckout,
    updatePaymentStatus
}