const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
const {Customer} = require("../model/customer.model");

exports.findAll = (req, res) =>{
    Customer.find()
    .then(customers => {
        res.send(customers);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
}

exports.create = (req, res) =>{
    const customer = new Customer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age
    })

    customer.save().then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.status(500).send(err);
    })
}

exports.findOne = (req, res) =>{
    Customer.findById(req.params.customerId)
        .then((customer)=>{
            if(!customer){
                return res.status(404).send({
                    message: "Customer not found with id " + req.params.customerId
                });  
            }
            res.send(customer);
        }).catch((err)=>{
            console.log(err)
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Customer not found with id " + req.params.customerId
                });                
            }
            return res.status(500).send({
                message: "Error retrieving Customer with id " + req.params.customerId
            });
        })
}

exports.update = (req, res) =>{
    console.log(req.body)
    Customer.findByIdAndUpdate(req.params.customerId,{
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age
    }, {new:true})
    .then((customer)=>{
        if(!customer) {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });
        }
        res.send(customer);
    })
    .catch((err)=>{
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });                
        }
        return res.status(500).send({
            message: "Error updating customer with id " + req.params.customerId
        });
    })
}

exports.delete = (req, res) =>{
    Customer.findByIdAndDelete(req.params.customerId)
    .then((customer)=>{
        if(!customer){
            return res.status(404).send({
                message: `Customer with ObjectID ${req.params.customerId} not found`
            })
        }
        res.send({message: "Customer deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });                
        }
        return res.status(500).send({
            message: "Could not delete customer with id " + req.params.customerId
        });
    });
}