module.exports = function(app){
    const customerController = require("../controller/customer.controller");

    app.post("/customer", customerController.create)
    app.get("/customer",customerController.findAll )
    app.get("/customer/:customerId", customerController.findOne)
    app.put('/customer/:customerId', customerController.update);
    app.delete('/customer/:customerId', customerController.delete);
}