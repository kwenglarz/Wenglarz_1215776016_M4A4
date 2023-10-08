// // Import the required modules
const express = require('express');
const morgan = require('morgan');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
const customerRouter = require('./routes/customerRoutes');
app.use('/api/v1/customers', customerRouter);

const loanRouter = require('./routes/loanRoutes');
app.use('/api/v1/loans', loanRouter);

const ledgerRouter = require('./routes/ledgerRoutes');
app.use('/api/v1/ledgers', ledgerRouter);

module.exports = app;