const Customer = require('./../model/customerModel');
const APIFeatures = require('../dataBaseManager/loanDbContext');

exports.getAllCustomers = async (req, res) => {
  try {
    // EXECUTE QUERY
    // only pull Customers that are NOT deleted
    const features = new APIFeatures(Customer.find(), {isDeleted: false})
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const customers = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: customers.length,
      data: {
        customers
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id })

    res.status(200).json({
      status: 'success',
      results: customer.length,
      data: {
        customer
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.createCustomer = async  (req, res) => {
    const dateTime = new Date().toISOString();

    const newCustomer = {...req.body, createdDate: dateTime, insertedDate: dateTime, isDeleted: false};
  try {
    const savedCustomer = await Customer.create(newCustomer)
    res.status(201).json({
      status: 'success',
      data: savedCustomer
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.updateCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        customer
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
exports.deleteCustomerById = async (req, res) => {
  try {
    // get existing customer
    const existingCustomer = await Customer.findById(req.params.id);

    // mark isDeleted as true
    existingCustomer.isDeleted = true;

    // update DB with isDeleted as true
    await Customer.findByIdAndUpdate(req.params.id, existingCustomer, {
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