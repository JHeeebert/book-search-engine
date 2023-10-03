const mongoose = require("mongoose");
const Swal = require("sweetalert2");

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/googlebooks",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

const db = mongoose.connection;
// Event listeners for error handling
db.on("error", (err) => {
    console.error("MongoDB connection error:", err);
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "MongoDB connection error!",
    });
});

db.once("open", () => {
    console.log("Connected to MongoDB!");
    Swal.fire({
        icon: "success",
        title: "Connected!",
        text: "Successfully connected to MongoDB!",
    });
});

module.exports = db;
