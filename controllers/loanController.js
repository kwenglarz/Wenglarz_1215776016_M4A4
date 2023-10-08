const Loan = require('./../model/loanModel');
const Customer = require('./../model/customerModel');
const APIFeatures = require('../dataBaseManager/loanDbContext');

exports.getAllLoans = async (req, res) => {
  try {
    // EXECUTE QUERY
    // only pull loans that are NOT deleted
    const features = new APIFeatures(Loan.find(), {isDeleted: false})
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const loans = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: loans.length,
      data: {
        loans
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getLoanById = async (req, res) => {
  try {
    const customerloan = await Loan.findOne({ _id: req.params.id })

    res.status(200).json({
      status: 'success',
      results: customerloan.length,
      data: {
        customerloan
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.createLoan = async (req, res) => {
  try {
    const newLoan = req.body;
    const dateTime = new Date().toISOString();
    const newCustomerLoan = {...newLoan, createdDate: dateTime, insertedDate: dateTime, isDeleted: false};

    // Create loan
    const savedLoan = await Loan.create(newCustomerLoan);

    // Must update the customer object to have the new Loan Id
    const custId = req.body.customerId;
    const customerWithId = await Customer.findById(custId);
    customerWithId.loans.push(savedLoan.id);
    await Customer.findByIdAndUpdate(custId, customerWithId, {
      new: true,
      runValidators: true
    });
    
    res.status(201).json({
      status: 'success',
      data: savedLoan
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.updateLoanById = async (req, res) => {
  try {
    const customerloan = await Loan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        customerloan
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

// DO NOT ACTUALLY DELETE ITEM FOR AUDITING PURPOSES
exports.deleteLoanById = async (req, res) => {
  try {
    // get existing loan
    const existingLoan = await Loan.findById(req.params.id);

    // mark isDeleted as true
    existingLoan.isDeleted = true;

    // update DB with isDeleted as true
    await Loan.findByIdAndUpdate(req.params.id, existingLoan, {
      new: true,
      runValidators: true
    });

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};