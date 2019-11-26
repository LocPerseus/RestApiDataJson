const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const tourRoutes = require('./routes/tourRoutes');
const userRoutes = require('./routes/userRoutes');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// 1. FIRST 
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.json())
app.use(express.static(`${__dirname}/public`));
app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', userRoutes);
// app.use((req, res, next) => {
//     console.log("Say hello. I'm middleware.");
//     next();
// });
// app.use((req, res, next) => {
//     req.requestTime = new Date().toISOString();
//     next();
// });
// convert json biến tours thành 1 đối tượng trong javascript

module.exports = app;