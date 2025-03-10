const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./Models/db');
const app = express();
const PORT = process.env.PORT || 8080;
const UserModel = require('./Models/User');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');

app.use(bodyParser.json());
app.use(cors())

app.use('/auth',AuthRouter);

app.use('/products',ProductRouter)

app.listen(PORT,(req,res)=>{
    console.log(`Server is running on port ${PORT}`);
})