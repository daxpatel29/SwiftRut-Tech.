const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  lowStockThreshold: { type: Number, default: 10 },
  description: { type: String, required: true },
  category: { type: String, required: true },
  stockStatus: {
    type: String,
    enum: ["In Stock", "Out of Stock", "low stock"],
    default: "In Stock",
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
  },
});

itemSchema.pre("save", function (next) {
  if (this.isModified("quantity")) {
    if (Number(this.quantity) > Number(this.lowStockThreshold)) {
      this.stockStatus = "In Stock";
    } else if (
      Number(this.quantity) <= Number(this.lowStockThreshold) &&
      Number(this.quantity) > 0
    ) {
      this.stockStatus = "low stock";
      console.log(this.title + " is low stock");
    } else if (Number(this.quantity) <= 0) {
      this.stockStatus = "Out of Stock";
      console.log(this.title + " is Out of stock");
    }
  }
  next();
});

itemSchema.pre(/^find/, function (next) {
  this.populate("supplier");
  next();
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
