const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
    customerId: {
        type: String,
        required: true
    },
    loanType: {
        type: String,
        required: [true, 'A loan type is required'],
        unique: false,
        trim: false,
        maxlength: [30, 'Loan type must be less than or equal to 30 characters'],
        minlength: [3, 'Loan type must be greater than or equal to 3 characters']
    },
    loanNumber: {
        type: Number,
        required: [true, 'A loan must have a loan number'],
        unique: false,
        trim: true,
        min: [1, 'Loan number must be greater than or equal to 1']
    },
    loanAmount: {
        type: Number,
        required: [true, 'A loan amount is required'],
        unique: false,
        trim: true,
        max: [1000000, 'Loan amount must be less than or equal to 1000000'],
        min: [1, 'Loan amount must be greater than or equal to 1']
    },
    interest: {
        type: Number,
        default: 1,
        min: [0, 'Interest rate must be greater than or equal to 0'],
        max: [20, 'Interest rate must be less than or equal to 20']
    },
    loanTermYears: {
        type: Number,
        required: [true, 'A loan term is required'],
        default: 5,
        unique: false,
        trim: true,
        maxlength: [30, 'Loan term must be less than or equal to 30'],
        minlength: [1, 'Loan term must be greater than or equal to 1']
    },
    description: {
        type: String,
        required: [true, 'A loan description is required'],
        unique: true,
        trim: true,
        maxlength: [50, 'A description must have less than or equal to 50 characters'],
        minlength: [10, 'A description must have greater than or equal to 10 characters']
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
    },
    // array of ledger ids attached to this loan
    ledgers: {
        type: [String],
        required: false
    }
});
const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;