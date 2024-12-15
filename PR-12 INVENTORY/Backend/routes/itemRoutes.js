const { Router } = require("express");
const {
  getAllItems,
  getItemById,
  getItemsBySupplier,
  addItem,
  updateItem,
  deleteItem,
  exportItems,
  importItems,
} = require("../controllers/itemController");
const upload = require("../utils/multer");

const itemRouter = Router();

itemRouter.get("/allitems", getAllItems);
itemRouter.get("/item/:id", getItemById);
itemRouter.get("/exportitems", exportItems);
itemRouter.get("/supplier/:id", getItemsBySupplier);
itemRouter.post("/additem", addItem);
itemRouter.post("/importitems", upload.single("file"), importItems);
itemRouter.patch("/update/:id", updateItem);
itemRouter.delete("/delete/:id", deleteItem);

module.exports = itemRouter;
