const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;
const CartItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      trim: true,
    },
  },
  { timestamps: true }
);

const CartItem = mongoose.model("CartItem", CartItemSchema);

const OrderSchema = new mongoose.Schema(
  {
    products: [CartItemSchema],
    transaction_id: {},
    amount: { type: Number },
    status: {
      type: String,
      default: "No Procesada",
      enum: ["No Procesada", "Procesada", "Enviada", "Entregada", "Cancelada"],
    },
    paymentType: String,
    deliveryInstructions: String,
    updated: Date,
    user: { type: ObjectId, ref: "User" },
    address: String,
    deliveryDate: Date,
    orderNumber: Number,
  },
  { timestamps: true }
);

OrderSchema.plugin(autoIncrement.plugin, {
  model: "Order",
  field: "orderNumber",
  startAt: 100,
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, CartItem };
