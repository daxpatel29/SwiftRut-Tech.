const { Router } = require("express");
const {
  getSuppliers,
  getSupplierById,
  addSupplier,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/supplierController");

const supplierRouter = Router();

supplierRouter.get("/all", getSuppliers);
supplierRouter.get("/supplier/:id", getSupplierById);
supplierRouter.post("/add", addSupplier);
supplierRouter.patch("/update/:id", updateSupplier);
supplierRouter.delete("/delete/:id", deleteSupplier);

module.exports = supplierRouter;
