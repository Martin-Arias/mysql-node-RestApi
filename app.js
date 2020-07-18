const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')


//Import routes
const productsRouter = require('./routes/products.route');
const usersRouter = require('./routes/orders.route');

//Inicializo express
const app = express();

//CORS configuration
app.use(cors({
    origin: '*',
    methods: ['GET','POST', 'PATCH', 'DELETE', 'PUT'],
    allowedHeaders: 'content-Type, Authorization, Origin, X-Requested-With, Accept'
}))

//Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Routes use
 app.use('/api/products', productsRouter);
 app.use('/api/users', usersRouter);


module.exports = app;
