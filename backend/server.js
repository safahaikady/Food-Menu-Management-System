require("dotenv").config();

const express = require("express");
const cors = require("cors");

const foodRoutes = require("./routes/foodRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

/* MIDDLEWARE */

app.use(cors({
    origin: "*"
}));

app.use(express.json());

/* ROUTES */

app.use("/api/foods", foodRoutes);

app.use("/api/orders", orderRoutes);

/* TEST ROUTE */

app.get("/", (req, res) => {
    res.send("Food Menu Backend Running");
});

/* PORT */

const PORT = process.env.PORT || 5000;

/* SERVER */

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});