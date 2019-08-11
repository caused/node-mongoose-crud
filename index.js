require("./config/dbConfig")

const express = require("express")
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json())

require("./routes/customer.routes")(app);

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});