const mongoose = require("mongoose");

var Customer = mongoose.model("Customer", {
    firstName: String,
    lastName: String,
    age: {
        type: Number,
        min: 18, 
        max: 65
    }
})

module.exports = {Customer}