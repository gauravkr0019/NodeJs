const express = require("express");

//const USERS = require("./MOCK_DATA.json");

const {connectMongoDb}=require("./connection")

const userRouter= require("./routes/user")

const {logReqRes}=require("./middlewares/index")

const app = express();
const PORT = 8000;

//Connection
connectMongoDb("mongodb://localhost:27017/data-app")


// Middleware - Plugin
app.use(express.urlencoded({ extended: false }));

app.use(logReqRes("log.txt"))

// Routes
app.use("/api/users", userRouter)


app.listen(PORT, () => console.log("Server Started at PORT 8000"));
