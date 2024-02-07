// * importing express
const express = require("express");

const { MenuItem, Order, Resto, User } = require("../modals/Resto");

// * to use router and create routes
const router = express.Router();

router.put("/restaurants/:restoId/order-item", async (req, res) => {
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

router.put("/restaurants/:restoId/update-menu", async (req, res) => {
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

    res.status(201).json({
      message: "Menu items updated successfully",
      restaurant: updatedRestaurant,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put(
  "/restaurants/:restoId/:itemId/update-menuitem",
  async (req, res) => {
    try {
      const { itemId, restoId } = req.params;
      const { title, price, img, desc } = req.body;
      // Find the restaurant and its menu
      const restaurant = await Resto.findById(restoId);
      if (!restaurant) {
        return res.status(404).json({ error: "Restaurant not found" });
      }
      const menuItem = await MenuItem.findById(itemId);
      if (!menuItem) {
        return res.status(404).json({ error: "MenuItem not found" });
      }
      // Update the menu item
      menuItem.title = title;
      menuItem.price = price;
      menuItem.img = img;
      menuItem.desc = desc;
      // Save the updated menu item
      const updatedMenuItem = await menuItem.save();
      // Return a success response along with the updated menu item
      res.status(201).json({
        message: "MenuItem updated successfully",
        menuItem: updatedMenuItem,
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

module.exports = router;
