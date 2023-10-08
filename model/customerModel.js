const mongoose = require('mongoose');
const Loan = require('./loanModel');

const customerSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: [true, 'A customer must have a name'],
        unique: false,
        trim: true,
        maxlength: [40, 'A customer name must have less than or equal to 40 characters'],
        minlength: [2, 'A customer name must have more than or equal to 2 characters']
    
    },
    firstName: {
        type: String,
        required: [true, 'A customer must have a first name'],
        unique: false,
        trim: true,
        maxlength: [20, 'A customer first name may not exceed 20 characters'],
        minlength: [1, 'A customer first name must have more than or equal to 1 character']
    },
    middleName: {
        type: String,
        required: false,
        unique: false,
        trim: true,
        maxlength: [10, 'A customer middle name may not exceed 20 characters']
    },
    lastName: {
        type: String,
        required: [true, 'A customer must have a last name'],
        unique: false,
        trim: true,
        maxlength: [20, 'A customer last name may not exceed 20 characters'],
        minlength: [1, 'A customer last name must have more than or equal to 1 character']
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Customer must enter date of birth'],
        unique: false,
        trim: true
    },
    gender: {
        type: String,
        required: [true, 'Customer must enter gender'],
        unique: false,
        trim: true
    },
    phoneNumber:{
        type: Number,
        required: [true, 'A customer must have a phone number'],
        unique: false,
        trim: true,
        maxlength: [10, 'A phone number must have max of 10 characters'],
        maxlength: [10, 'A phone number must have minimum of 10 characters']
    },
    address: {
        type: String,
        required: [true, 'A customer must have an address'],
        unique: false,
        trim: true,
        maxlength: [100, 'An address must have less than or equal to 100 characters'],
        minlength: [10, 'A from  must have more than or equal to 10 characters']
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
    // array of loan ids on customer
    loans: { 
        type: [String],
        required: false
    }, 
});
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;