const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController.js');

router.route('/')
    .get(loanController.getAllLoans)
    .post(loanController.createLoan)

router.route('/:id')
    .get(loanController.getLoanById)
    .put(loanController.updateLoanById)
    .delete(loanController.deleteLoanById);

module.exports = router;