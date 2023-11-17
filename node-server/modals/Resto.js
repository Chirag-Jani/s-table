const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define menu item schema
const menuItemSchema = new Schema({
  id: String,
  title: String,
  price: Number,
  img: String,
  desc: String,
});

// Define order item schema
const orderItemSchema = new Schema({
  id: String,
  title: String,
  price: Number,
  quantity: Number,
  imageUrl: String,
});

// Define order schema
const orderSchema = new Schema({
  items: [orderItemSchema], // Array of order items
  netAmount: Number,
  timestamp: Date,
  tableNumber: Number,
});

// Define user schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  // Add any other user-related fields here
});

// Define restaurant schema
const restoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  menu: [menuItemSchema], // Array of menu items
  orders: [orderSchema], // Array of orders
  users: [userSchema], // Array of users
});

// Create models
const Resto = mongoose.model("Resto", restoSchema);
const MenuItem = mongoose.model("MenuItem", menuItemSchema);
const Order = mongoose.model("Order", orderSchema);
const User = mongoose.model("User", userSchema);

module.exports = {
  Resto,
  MenuItem,
  Order,
  User,
};
