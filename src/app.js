import express from "express";
import dotenv from "dotenv";
import { connect } from "../src/database/db.js";
import bookRouter from "./routes/book.route.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3300;


//MiddleWare
app.use(express.json()); //body-parser
app.use("/api/v1/books", bookRouter)

app.get("/", (req, res) => {
  res.send("Hello World")
})

// for all routes
app.all("*", (req, res) => {
  res.status(404).jsonp({ message: `Page ${req.originalUrl} not found on the server`});
})

connect().then(() => {
  console.log("Connected to MongoDB")
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`)
})
});



