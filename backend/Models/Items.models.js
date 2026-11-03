const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Electronics", "Vechiles", "Appliances", "Other"],
    default: "Other",
  },
  description: {
    type: String,
    required: true,
  },
  images: [
    {
      public_id: String,
      url: String,
    },
  ],
  location: {
    type: String,
    required: true,
  },
  borrowedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  lendedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  availabe:{
    type:Boolean,
    default:true
  }
});
const ItemModel = mongoose.model("items",ItemSchema)

module.exports = ItemModel
