const mongoose = require('mongoose');

const loanLedgerSchema = new mongoose.Schema({
    loanId: {
        type: String,
        required: true
    },
    paymentAmount: {
        type: Number,
        default: 1,
        min: [0, 'Payment amount must be greater than or equal to 0']
    },
    interest: {
        type: Number,
        default: 1,
        min: [0, 'Interest must be greater than or equal to 0'],
    },
    principal: {
        type: Number,
        default: 1, // FIXME - ADD MIDDLEWARE TO GET LOAN AMOUNT
        min: [0, 'Principal balance must be greater than or equal to 0']
    },
    createdDate: {
        type: Date,
        default: Date.now,
        required: [true, 'A created date is required'],
        autopopulate: true,
        trim: false
    },
    insertedDate: {
        type: Date,
        default: Date.now,
        required: [true, 'A inserted date is required'],
        autopopulate: true,
        trim: false
    },
    isDeleted:  {
        type: Boolean,
        default: false
    }
});
const Ledger = mongoose.model('Ledger', loanLedgerSchema);

module.exports = Ledger;