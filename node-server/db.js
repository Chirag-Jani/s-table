// * getting mongoose
const mongoose = require("mongoose");

// * database url
// const mongoUri = "mongodb://localhost:27017/SecureTable";
const mongoUri =
  "mongodb+srv://jani:jani@cluster0.f0f3vjs.mongodb.net/SecureTable";

// * no idea what it is
mongoose.set("strictQuery", false);

// * function to connect to mongodb
const connectToMongoDB = async () => {
  // * calling connect method
  mongoose
    .connect(mongoUri, { useNewUrlParser: true })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
};

// * exporting to use
module.exports = connectToMongoDB;
