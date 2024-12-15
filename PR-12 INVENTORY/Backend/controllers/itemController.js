const Item = require("../models/itemSchema");
const { importCsv } = require("../utils/items");
const { Parser } = require("json2csv");

const addItem = async (req, res) => {
  try {
    const item = new Item({
      title: req.body.title,
      price: req.body.price,
      quantity: req.body.quantity,
      description: req.body.description,
      category: req.body.category,
      supplier: req.body.supplier,
    });
    await item.save();
    res.status(201).json({ message: "item added successfully!", item: item });
  } catch (error) {
    res
      .status(400)
      .json({ message: "error adding item!!!", error: error.message });
  }
};

const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate();
    if (!item) return res.status(404).json({ message: "item not found!" });
    res.json({ item });
  } catch (error) {
    res.status(500).json({ message: "server error!!!", error: error.message });
  }
};

const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json({ items });
  } catch (error) {
    res.status(500).json({ message: "server error!!!", error: error.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "item not found!" });
    item.title = req.body.title || item.title;
    item.price = req.body.price || item.price;
    item.quantity = req.body.quantity || item.quantity;
    item.description = req.body.description || item.description;
    item.category = req.body.category || item.category;
    item.supplier = req.body.supplier || item.supplier;
    await item.save();
    res.json({ message: "item updated successfully!", item: item });
  } catch (error) {
    res
      .status(400)
      .json({ message: "error updating item!!!", error: error.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "item not found!" });
    res.json({ message: "item deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "server error!!!", error: error.message });
  }
};

const getItemsBySupplier = async (req, res) => {
  try {
    const items = await Item.find({ supplier: req.params.id });
    if (!items)
      return res
        .status(404)
        .json({ message: "items not found for this supplier!" });
    res.json({ items });
  } catch (error) {
    res.status(500).json({ message: "server error!!!", error: error.message });
  }
};

const importItems = async (req, res) => {
  try {
    if (!req.file) return res.status(404).json({ message: "file not found!" });
    const importedItems = await importCsv(req.file.buffer, Item);
    res.json({ message: "items imported successfully!", items: importedItems });
  } catch (error) {
    res.status(500).json({ message: "server error!!!", error: error.message });
  }
};

const exportItems = async (req, res) => {
  try {
    const items = await Item.find();
    let csvData = items.map((item) => ({
      title: item.title,
      description: item.description,
      price: item.price,
      quantity: item.quantity,
      lowStockThreshold: item.lowStockThreshold,
      category: item.category,
      stockStatus: item.stockStatus,
      supplier: {
        name: item.supplier.name,
        email: item.supplier.email,
        phone: item.supplier.phone,
      },
    }));

    const jsontocsv = new Parser({
      fields: [
        "title",
        "description",
        "price",
        "quantity",
        "lowStockThreshold",
        "category",
        "stockStatus",
        "supplier.name",
        "supplier.email",
        "supplier.phone",
      ],
    });
    const csv = jsontocsv.parse(csvData);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=items.csv");
    res.status(200).send(csv);
  } catch (error) {
    res.status(500).json({ message: "server error!!!", error: error.message });
  }
};
module.exports = {
  addItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  getItemsBySupplier,
  importItems,
  exportItems,
};
