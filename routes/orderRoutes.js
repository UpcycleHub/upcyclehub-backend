const express = require("express");
const router = express.Router();
const Order = require("../models/order");

// Create a new order
router.post("/", async (req, res) => {
  try {
    console.log("Request body:", req.body);

    const { name, address, phone, paymentMethod, products, totalPrice } =
      req.body;

    // Validation
    if (
      !name ||
      !address ||
      !phone ||
      !paymentMethod ||
      !products ||
      products.length === 0 ||
      totalPrice === undefined
    ) {
      return res.status(400).json({
        error: "All fields are required and products cannot be empty",
      });
    }

    // Create new order document
    const order = new Order({
      name,
      address,
      phone,
      paymentMethod,
      products: products.map((p) => ({
        productId: p.productId,
        quantity: p.quantity,
      })),
      totalPrice,
      status: "Pending",
    });

    // Save order to MongoDB
    await order.save();
    console.log("Order saved:", order);

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
