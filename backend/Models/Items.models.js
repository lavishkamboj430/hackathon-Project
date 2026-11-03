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
    type: string,
    required: true,
  },
  borrowedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  lendedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  availabe:{
    type:Boolean,
  }
});
