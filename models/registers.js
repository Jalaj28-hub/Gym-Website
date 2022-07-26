const mongoose = require("mongoose")

const RegisterMember = new mongoose.Schema({
    Username : {
        type: String,
        require : true
    },
    email : {
      type: String,
        require : true  
    },
    password : {
        type: String,
        require : true
    },
    confirmpassword : {
        type: String,
        require : true
    }
})

const Register = new mongoose.model("Register",RegisterMember);

module.exports = Register;