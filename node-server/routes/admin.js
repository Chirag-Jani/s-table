// * importing express
const express = require("express");

const { MenuItem, Order, Resto, User } = require("../modals/Resto");

// * to use router and create routes
const router = express.Router();

router.get("/dashboard", async (req, res) => {
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

router.delete("/delete-resto/:restoId", async (req, res) => {
  try {
    const resto = await Resto.findByIdAndDelete(req.params.restoId);
    if (!resto) throw new Error("No data found!");
    res.send({
      success: true,
      message: "Deleted successfully!",
    });
  } catch (e) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
