const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController.js');
// const loanController = require('../controllers/loanController.js');
// const ledgerController = require('../controllers/ledgerController.js');

router.route('/')
    .get(customerController.getAllCustomers)
    .post(customerController.createCustomer)

router.route('/:id')
    .get(customerController.getCustomerById)
    .put(customerController.updateCustomerById)
    .delete(customerController.deleteCustomerById);

// TODO: in future, we should create these routes
// router.route('/:id/loans')
//     .get(loanController.getAllLoansForCustomer)
//     .post(loandcontroller.createLoanForCustomer)

// router.route('/:id/loans/:loanID')
//     .get(loanController.getLoanById)
//     .put(loanController.updateLoanById)
//     .delete(loanController.deleteLoanById);

// router.route('/:id/loans/:loanID/ledgers')
//     .get(ledgerController.getAllLedgers)
//     .post(ledgerController.createLedger)

// router.route('/:id/loans/:loanID/ledgers/:ledgerID')
//     .get(ledgerController.getLedgerById)
//     .put(ledgerController.updateLedgerById)
//     .delete(ledgerController.deleteLedgerById)

module.exports = router;