const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

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
    count: {
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
    updated: Date,
    user: { type: ObjectId, ref: "User" },
    address: String,
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, CartItem };
