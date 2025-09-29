const express = require("express");
const connectToDb = require("./config/conectToDb");
const { notFound, errorHandler } = require("./middlewares/error");
const cors = require("cors");
require("dotenv").config();

// Connection To Db
connectToDb();

// Init App
const app = express();

// Middlewares
app.use(express.json());

// Cors Policy
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/admin", require("./routes/adminRoute"));
app.use("/api/user", require("./routes/userRoute"));
app.use("/api", require("./routes/folderRoute"));
app.use("/api", require("./routes/noteRoute"));

// Error Handler Middleware
app.use(notFound);
app.use(errorHandler);

// Running The Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
