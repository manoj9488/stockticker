import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Container,
} from "@mui/material";

const socket = io("http://localhost:5000");

const StockTicker = () => {
  const [stocks, setStocks] = useState({});

  useEffect(() => {
    socket.on("stockUpdate", (data) => {
      console.log("Stock Update:", data);
      setStocks((prev) => ({
        ...prev,
        [data.symbol]: data,
      }));
    });

    return () => {
      socket.off("stockUpdate");
    };
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card sx={{ backgroundColor: "#212121", color: "white", borderRadius: 3, boxShadow: 6 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            📈  Stock Ticker (Socket.IO)
          </Typography>
          <Divider sx={{ mb: 2, borderColor: "#424242" }} />
          {Object.values(stocks).map((stock) => (
            <Box
              key={stock.symbol}
              display="flex"
              justifyContent="space-between"
              py={1}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                {stock.symbol}
              </Typography>
              <Typography
                variant="subtitle1"
                color={stock.change >= 0 ? "success.main" : "error.main"}
              >
                ${stock.price.toFixed(2)} ({stock.change >= 0 ? "+" : ""}
                {stock.change.toFixed(2)})
              </Typography>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Container>
  );
};

export default StockTicker;
