const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const providerRoutes = require("./routes/providerRoutes");
const authRoutes = require("./routes/authRoutes");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/provider", providerRoutes);

app.get("/", (req, res) => {
  res.send(" LaundryConnect Backend is Running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});