const express = require("express");
const cors = require("cors");

const foodRoutes = require("./routes/foodRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes =
require("./routes/adminRoutes");
const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/foods", foodRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.listen(5000, () => {
    console.log("Server running on port 5000");
});