const Ledger = require('./../model/loanLedgerModel');
const Loan = require('./../model/loanModel');
const APIFeatures = require('../dataBaseManager/loanDbContext');

exports.getAllLedgers = async (req, res) => {
  try {
    // EXECUTE QUERY
    // only pull ledgers that are NOT deleted
    const features = new APIFeatures(Ledger.find(), {isDeleted: false})
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const ledgers = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: ledgers.length,
      data: {
        ledgers
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getLedgerById = async (req, res) => {
  try {
    const ledger = await Ledger.findOne({ _id: req.params.id })

    res.status(200).json({
      status: 'success',
      results: ledger.length,
      data: {
        ledger
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

// Validates that the ledger amoount is not greater than the 
// loan amount on the attached loan
exports.createLedgerValidator = async (req, res, next) => {
  try {
    const ledger = req.body;
    const loanId = req.body.loanId;
    const customerLoan = await Loan.findById(loanId);

    if(ledger.paymentAmount > customerLoan.loanAmount) {
      return res.status(400).json({
        status: 'fail',
        data: 'Ledger amount must not be greater than loan amount'
      });
    }
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      message: err
    });
  }

  next();
}

exports.createLedger = async (req, res) => {
  try {
    const dateTime = new Date().toISOString();
    const newLedger = {...req.body, createdDate: dateTime, insertedDate: dateTime, isDeleted: false};

    const savedLedger = await Ledger.create(newLedger);

    // Update the loan with the attached ledger id
    const customerLoan = await Loan.findById(req.body.loanId);
    customerLoan.ledgers.push(savedLedger.id);
    await  Loan.findByIdAndUpdate(customerLoan.id, customerLoan, {
      new: true,
      runValidators: true
    });

    res.status(201).json({
      status: 'success',
      data: savedLedger
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

// DO NOT ACTUALLY DELETE ITEM FOR AUDITING PURPOSES
exports.deleteLedgerById = async (req, res) => {
  try {
    // get existing loan
    const existingLedger = await Ledger.findById(req.params.id);

    // mark isDeleted as true
    existingLedger.isDeleted = true;

    // update DB with isDeleted as true
    await ledger.findByIdAndUpdate(req.params.id, existingLedger, {
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