const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;
const CartItemSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    trim: true,
  },
});

const CartItem = mongoose.model("CartItem", CartItemSchema);
const PaymentInfoSchema = new mongoose.Schema({
  paymentHolderName: {
    type: String,
    trim: true,
  },
  transactionId: {
    type: String,
    trim: true,
  },
  paymentType: {
    type: String,
    trim: true,
  },
});

const PaymentInfo = mongoose.model("PaymentInfo", PaymentInfoSchema);

const OrderSchema = new mongoose.Schema(
  {
    products: [CartItemSchema],
    paymentDetails: PaymentInfoSchema,
    amount: { type: Number },
    status: {
      type: String,
      default: "No Procesada",
      enum: ["No Procesada", "Procesada", "Enviada", "Entregada", "Cancelada"],
    },
    deliveryInstructions: String,
    updated: Date,
    user: { type: ObjectId, ref: "User" },
    address: String,
    deliveryDate: Date,
    orderNumber: { type: Number, default: 0, unique: true },
  },
  { timestamps: true }
);
autoIncrement.initialize(mongoose.connection);
OrderSchema.plugin(autoIncrement.plugin, {
  model: "Order",
  field: "orderNumber",
  startAt: 100,
  incrementBy: 1,
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, CartItem, PaymentInfo };
