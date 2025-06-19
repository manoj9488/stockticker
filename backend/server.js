// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const stockRoutes = require("./routes/stocks");
// const connectDB = require("./config/db");
// const http = require("http");
// const { Server } = require("socket.io");

// // Load env and connect DB
// dotenv.config();
// connectDB();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middlewares
// app.use(cors());
// app.use(express.json());
// app.use("/api/stocks", stockRoutes);

// // Create HTTP server
// const server = http.createServer(app);

// // Setup Socket.IO
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173", // Frontend URL
//     methods: ["GET", "POST"]
//   }
// });

// // Broadcast stock update every second
// const generateMockStock = () => {
//   const symbols = ["AAPL", "GOOG", "TSLA", "AMZN","NFT","TATA","ITC","NIKE","CAMLLIN"];
//   const symbol = symbols[Math.floor(Math.random() * symbols.length)];
//   const price = (Math.random() * 1000).toFixed(2);
//   const change = (Math.random() * 10 - 5).toFixed(2);
//   return { symbol, price: parseFloat(price), change: parseFloat(change) };
// };

// setInterval(() => {
//   const stockData = generateMockStock();
//   io.emit("stockUpdate", stockData);
// }, 1000);

// // Start server
// server.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });




const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const stockRoutes = require("./routes/stocks");
const connectDB = require("./config/db");
const http = require("http");
const { Server } = require("socket.io");
const axios = require("axios");

// Load env and connect DB
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;

app.use(cors());
app.use(express.json());
app.use("/api/stocks", stockRoutes);

const server = http.createServer(app);

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Change as needed
    methods: ["GET", "POST"]
  }
});

// List of symbols to track
const symbols = ["AAPL", "GOOG", "TSLA", "AMZN", "MSFT", "NFLX","INFOSYS", "ITC Limited", "NVIDIA", "AMD",
"INTEL", "NIKE"];

// Function to fetch real-time stock data
const fetchStockPrice = async (symbol) => {
  try {
    const response = await axios.get(`https://finnhub.io/api/v1/quote`, {
      params: {
        symbol: symbol,
        token: FINNHUB_API_KEY
      }
    });
    const data = response.data;
    return {
      symbol,
      price: parseFloat(data.c), // current price
      change: parseFloat((data.c - data.pc).toFixed(2)) // change from prev close
    };
  } catch (err) {
    console.error(`Error fetching ${symbol}:`, err.message);
    return null;
  }
};

// Emit stock updates every second
setInterval(async () => {
  for (let symbol of symbols) {
    const stockData = await fetchStockPrice(symbol);
    if (stockData) {
      io.emit("stockUpdate", stockData);
    }
  }
}, 10000);

// Start server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
