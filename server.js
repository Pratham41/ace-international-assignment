const express = require('express')
require("dotenv").config();
require('./config/db')
const productRouter = require('./routes/product')

const app = express();

app.use(express.json())

app.use('/aceinternational/products',productRouter)

let port = process.env.PORT || 8000;

app.listen(port,() => {
    console.log(`server is running on port ${port}`);
})
