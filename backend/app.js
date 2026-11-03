const express = require("express")
const Cors = require("cors")
const Cookieparser = require("cookie-parser");
const Route = require("./Routes/Routes");
const itemsRoute=require("./Routes/item.routes.js")
const app = express()

app.use(
    Cors({
        origin: "*",
        credentials: true
    })
);

app.use(express.json())

app.use(Cookieparser())

app.use("/Api", Route)
app.use("Api/items",itemsRoute);

module.exports = app