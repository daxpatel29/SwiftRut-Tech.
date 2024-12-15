const Supplier = require("../models/supplierSchema");

const addSupplier = async (req, res) => {
  try {
    let { name, email, phone } = req.body;
    let supplier = new Supplier({ name, email, phone });
    await supplier.save();
    res
      .status(201)
      .json({ message: "Supplier added successfully", supplier: supplier });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier)
      return res.status(404).json({ message: "Supplier not found" });
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!supplier)
      return res.status(404).json({ message: "Supplier not found" });
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!supplier)
      return res.status(404).json({ message: "Supplier not found" });
    res.json({ message: "Supplier deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
};
