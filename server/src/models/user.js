const mongoose = require('mongoose');

// Define a regex for alphabet-only validation
const alphabetRegex = /^[A-Za-z]+$/;

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "First Name is required"],
        maxlength: [50, 'First Name cannot exceed 50 characters'],
        validate: {
            validator: function (value) {
              return alphabetRegex.test(value);
            },
            message: 'First name must contain only alphabetic characters',
          },
    },
    lastname: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: [8, 'password must be at least 8 characters long'],
    },
    created_at : Date,
    updated_at: {
        type:Date,
        default: Date.now()
    }
})

userSchema.pre('save', function(){
    this.created_at = Date.now();
});
userSchema.pre('insertOne', function(){
    this.created_at = Date.now();
});


const User = mongoose.model('users', userSchema);

module.exports = User;