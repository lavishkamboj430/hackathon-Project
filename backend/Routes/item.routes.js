const express = require("express");
const { addItem } = require("../Controllers/items.controller");
const {uploadImage} = require("../utils/UploadImage.js");
const router = express.Router();

router.route('/').post(uploadImage.array("images", 4),addItem);
router

module.exports=router;