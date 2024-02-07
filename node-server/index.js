// * importing express
const express = require("express");

// * importing mongodb to connect
const connectToMongoDB = require("./db");

// * importing cors to run at the client side
const cors = require("cors");

// * to use express
const app = express();

// * the port
const port = 8080;

// * to use json
app.use(express.json());

// * to use cors
app.use(cors());

// * starting server
app.listen(port, () => {
  console.log(`Server running on: http://localhost:${port}`);
});

// * routes
app.use("/admin/", require("./routes/admin"));
app.use("/resto/", require("./routes/resto"));

// * connecting the database
connectToMongoDB();
