const express = require("express");
const router = express.Router();
const Order = require("../models/order");

// Create order
router.post("/", async (req, res) => {
  try {
    const { name, address, phone, paymentMethod, products, totalPrice } =
      req.body;

    // Validate required fields
    if (
      !name ||
      !address ||
      !phone ||
      !paymentMethod ||
      !products ||
      products.length === 0
    ) {
      return res.status(400).json({
        error: "All fields are required and products cannot be empty",
      });
    }

    // Create and save order
    const order = new Order({
      name,
      address,
      phone,
      paymentMethod,
      products,
      totalPrice,
      status: "Pending",
    });

    await order.save();
    res.status(201).json({ message: "Order saved successfully", order });
  } catch (err) {
    console.error("Order save error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "name email");
    res.json(orders);
  } catch (err) {
    console.error("Get orders error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
