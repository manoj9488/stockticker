// routes/stocks.js
const express = require("express");
const router = express.Router();
const { getStockData, saveStockData } = require("../controller/stockController");

router.get("/", getStockData);
router.post("/", saveStockData); // New route

module.exports = router;
