const mongoose = require("mongoose");

const connectDB = async () => {
    console.log("🔄 Connecting to MongoDB...");

    try {
        await mongoose.connect(
            "mongodb+srv://admin:1234@cluster0.bmfljlt.mongodb.net/admin?retryWrites=true&w=majority"
        );

        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ MongoDB Error:");
        console.error(error.message);
    }
};

module.exports = connectDB;