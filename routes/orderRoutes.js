const express = require("express");
const router = express.Router();
const Order = require("../models/order");

// ✅ Create new order
router.post("/", async (req, res) => {
  try {
    console.log("📦 Incoming order data:", req.body);

    const { name, address, phone, paymentMethod, products, totalPrice } =
      req.body;

    // ✅ Validate fields
    if (
      !name ||
      !address ||
      !phone ||
      !paymentMethod ||
      !products ||
      products.length === 0
    ) {
      return res
        .status(400)
        .json({
          error: "All fields are required and products cannot be empty",
        });
    }

    // ✅ Save to MongoDB
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
    console.log("✅ Order saved successfully:", order);

    res.status(201).json({ message: "Order saved successfully", order });
  } catch (err) {
    console.error("❌ Order save error:", err.message);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// ✅ Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    console.error("❌ Get orders error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
