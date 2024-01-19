const express = require("express");

const {
  getItems,
  addItem,
  updateItem,
  deleteItem,
} = require("../controllers/item.controller.js");

const itemRouter = express.Router();

itemRouter.get("/", async (req, res) => {
  try {
    const items = await getItems();

    res
      .status(201)
      .json({ message: "Items fetched Successfully", items: items });

    // if (items.length > 0) {
    //   res
    //     .status(201)
    //     .json({ message: "Items fetched Successfully", items: items });
    // } else {
    //   res.status(404).json({ message: "Items Not Found" });
    // }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch all items" });
  }
});

itemRouter.post("/", async (req, res) => {
  try {
    const addedItem = await addItem();

    if (addedItem) {
      res
        .status(200)
        .json({ message: "Item Added Successfully", item: addedItem });
    } else {
      res.status(404).json({ message: "Error while adding the item" });
    }
  } catch (e) {
    res.status(500).json({ error: "Failed to add Item" });
  }
});

itemRouter.post("/:itemId", async (req, res) => {
  try {
    const updatedItem = await updateItem(req.params.itemId, req.body);

    if (updatedItem) {
      res
        .status(200)
        .json({ message: "Item Updated Successfully", item: updatedItem });
    } else {
      res.status(404).json({ message: "Error while Updating the item" });
    }
  } catch (e) {
    res.status(500).json({ error: "Failed to Update Item" });
  }
});

itemRouter.delete("/:itemId", async (req, res) => {
  try {
    const deletedItem = await deleteItem(req.params.itemId);

    if (deletedItem) {
      res
        .status(201)
        .json({ message: "Item Deleted Successfully", item: deletedItem });
    } else {
      res.status(404).json({ message: "Error while deleting the item" });
    }
  } catch (e) {
    res.status(500).json({ error: "Failed to Delete Item" });
  }
});

module.exports = itemRouter;
