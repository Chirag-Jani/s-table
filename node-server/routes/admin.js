// * importing express
const express = require("express");

// * to perform validation
const { body, validationResult } = require("express-validator");

const { MenuItem, Order, Resto, User } = require("../modals/Resto");

// * to use router and create routes
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const restos = await Resto.find({});
    if (!restos) throw new Error("No data found!");
    res.send({
      success: true,
      restos: restos,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/add-resto", async (req, res) => {
  try {
    const { name, menu, orders, users } = req.body;

    // Create menu items
    const menuItems = await MenuItem.create(menu);

    // Create orders
    const ordersArray = await Promise.all(
      orders.map((order) => Order.create(order))
    );

    // Create users
    const usersArray = await Promise.all(
      users.map((user) => User.create(user))
    );

    // Create restaurant with associated menu items, orders, and users
    const newResto = await Resto.create({
      name,
      menu: menuItems,
      orders: ordersArray,
      users: usersArray,
    });

    res.status(201).json(newResto);
  } catch (e) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/restaurants/:restoId/orders", async (req, res) => {
  try {
    const { restoId } = req.params;
    const { items, netAmount, timestamp, tableNumber } = req.body;

    // Find the restaurant by ID
    const restaurant = await Resto.findById(restoId);

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    // Create order items
    const orderItems = items.map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      imageUrl: item.imageUrl,
    }));

    // Create the order
    const newOrder = await Order.create({
      items: orderItems,
      netAmount,
      timestamp,
      tableNumber,
    });

    // Add the new order to the restaurant's orders array
    restaurant.orders.push(newOrder);
    await restaurant.save();

    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/restaurants/:restoId/update-menu", async (req, res) => {
  try {
    const { restoId } = req.params;
    const { menuItems } = req.body; // Assuming you send an array of menu items in the request body

    // Find the restaurant by ID
    const restaurant = await Resto.findById(restoId);

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    // Concatenate the new menu items with the existing menu

    let newItem = await MenuItem.create({
      id: menuItems[0].id,
      title: menuItems[0].title,
      price: menuItems[0].price,
      img: menuItems[0].img,
      desc: menuItems[0].desc,
    });
    // restaurant.menu = [...restaurant.menu, ...menuItems];
    restaurant.menu.push(newItem);

    // Save the updated restaurant
    const updatedRestaurant = await restaurant.save();

    res.json({
      message: "Menu items updated successfully",
      restaurant: updatedRestaurant,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
