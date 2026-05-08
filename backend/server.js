const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

const foodRoutes = require("./routes/foodRoutes");
app.use("/api/foods", foodRoutes);

app.get("/", (req, res) => {
    res.send("Food Menu Backend Running");
});

// 🔥 IMPORTANT: check DB first
connectDB();

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});