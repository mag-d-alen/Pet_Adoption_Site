/** @format */

const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const petRoutes = require("./routes/petRoute");
const userRoutes = require("./routes/userRoute");
const authRoutes = require("./routes/authRoute");
const cors = require("cors");


const { PORT } =
  process.env;


//middleware
app.use(cors());
app.use(express.json());
app.use("/pet", petRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("*", (req, res) => {
  res.status(404).send("Page not found");
});


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
