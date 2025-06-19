// // utils/mockData.js
// const mockSymbols = [
//   "AAPL", "GOOGLE", "MSFT", "TSLA", "AMAZON",
//   "TATA", "NFT", "ATHNI PORTS", "GSK pls",
//   "INFOSYS", "ITC Limited", "NVIDIA", "AMD",
//   "INTEL", "NIKE"
// ];

// const generateMockData = () => {
//   const symbol = mockSymbols[Math.floor(Math.random() * mockSymbols.length)];
//   const price = (Math.random() * 1000 + 100).toFixed(2);
//   const change = (Math.random() * 20 - 10).toFixed(2);
//   return {
//     symbol,
//     price: parseFloat(price),
//     change: parseFloat(change),
//   };
// };

// module.exports = { generateMockData };




const mockStocks = [
  { symbol: "AAPL", price: 178.23, change: 1.45 },
  { symbol: "GOOG", price: 2914.00, change: -12.45 },
  { symbol: "TSLA", price: 690.20, change: 4.12 },
  { symbol: "AMZN", price: 3489.99, change: 2.35 },
  { symbol: "NFLX", price: 520.10, change: -3.67 },
  { symbol: "MSFT", price: 310.42, change: 1.12 },
];

module.exports = mockStocks;
