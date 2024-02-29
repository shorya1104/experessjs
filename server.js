const express = require("express");
const app = express();

require("dotenv").config();
require('./database.Config.js')

const userRouter = require("./server/routes/userRouter.js")

app.use(express.json());

//Router
app.use("/api", userRouter);

const port = process.env.PORT

app.listen(port, () => console.log(`Listening as ${port}`));
