const express = require('express');
const router = express.Router();
const ledgerController = require('../controllers/ledgerController.js');

router.route('/')
    .get(ledgerController.getAllLedgers)
    .post(ledgerController.createLedgerValidator, ledgerController.createLedger)

// Not allowing ledgers to be updated for auditing purposes
router.route('/:id')
    .get(ledgerController.getLedgerById)
    .delete(ledgerController.deleteLedgerById);

module.exports = router;