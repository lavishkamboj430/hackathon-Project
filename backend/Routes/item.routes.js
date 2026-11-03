const express = require("express");
const {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
} = require("../Controllers/items.controller");
const { uploadImage } = require("../utils/UploadImage.js");
const { protect } = require("../Middleware/auth.js");
const router = express.Router();

router.route("/").post(protect, uploadImage.array("images", 4), createItem);
router.route("/").get(getAllItems);
router.route("/:id").get(getItemById);
router.route("/:id").patch(protect, updateItem);
router.route("/:id").delete(protect, deleteItem);

module.exports = router;
