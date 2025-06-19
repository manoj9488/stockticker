// controllers/stockController.js
const mongoose = require("mongoose");
const { generateMockData } = require("../utils/mockData");

const stockSchema = new mongoose.Schema({
  symbol: String,
  price: Number,
  change: Number,
  timestamp: { type: Date, default: Date.now }
});

const Stock = mongoose.model("Stock", stockSchema);

const getStockData = (req, res) => {
  const data = generateMockData();
  res.json(data);
};

const saveStockData = async (req, res) => {
  try {
    const stock = new Stock(req.body);
    await stock.save();
    res.status(201).json({ message: "Stock saved", stock });
  } catch (err) {
    res.status(500).json({ error: "Failed to save stock" });
  }
};

module.exports = { getStockData, saveStockData };
