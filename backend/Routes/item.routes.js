const express = require("express");
const {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
} = require("../Controllers/items.controller.js");
const {protect}= require("../Middleware/auth.js")

const itemsRoute = express.Router();

itemsRoute.post("/", createItem);

itemsRoute.get("/", getAllItems);

itemsRoute.get("/:id", getItemById);

itemsRoute.put("/:id", updateItem);

itemsRoute.delete("/:id", deleteItem);

module.exports = itemsRoute;
