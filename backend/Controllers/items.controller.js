const ItemModel = require("../models/Items.models");


exports.createItem = async (req, res) => {
  try {
    const { title, category, description, location } = req.body;

    if (!title || !description || !location) {
      return res.status(400).json({
        success: false,
        message: "Title, description and location are required",
      });
    }

    const images =
      req.files?.map((file) => ({
        public_id: file.public_id,
        url: file.path || file.url,
      })) || [];

    const item = await ItemModel.create({
      title,
      category,
      description,
      location,
      images,
      lendedBy: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Item created successfully",
      item,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getAllItems = async (req, res) => {
  try {
    const items = await ItemModel.find()
      .populate("lendedBy", "name email")
      .populate("borrowedBy", "name email")
      .sort({ _id: -1 });

    return res.status(200).json({
      success: true,
      count: items.length,
      items,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await ItemModel.findById(id)
      .populate("lendedBy", "name email")
      .populate("borrowedBy", "name email");

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    return res.status(200).json({
      success: true,
      item,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await ItemModel.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    if (item.lendedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this item",
      });
    }

    const { title, category, description, location, availabe } = req.body;

    if (title !== undefined) item.title = title;
    if (category !== undefined) item.category = category;
    if (description !== undefined) item.description = description;
    if (location !== undefined) item.location = location;
    if (availabe !== undefined) item.availabe = availabe;

   
    if (req.files?.length) {
      const newImages = req.files.map((file) => ({
        public_id: file.public_id,
        url: file.path || file.url,
      }));

      item.images.push(...newImages);
    }

    await item.save();

    return res.status(200).json({
      success: true,
      message: "Item updated successfully",
      item,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await ItemModel.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

  
    if (item.lendedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this item",
      });
    }

    await ItemModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
