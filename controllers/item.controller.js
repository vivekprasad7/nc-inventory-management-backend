const mongoose = require("mongoose");
const fs = require("fs");

const Item = require("../models/item.model.js");

const jsonData = fs.readFileSync("./data/items.json");
const itemsData = JSON.parse(jsonData);

// console.log(itemsData);

const seedItemToDB = async () => {
  try {
    for (const item of itemsData) {
      const newItem = new Item(item);
      await newItem.save();
      console.log(`${newItem.name} added to DB`);
    }
    console.log("Finished seeding the database");
  } catch (error) {
    console.log("Error while seeding the database", error);
  } finally {
    mongoose.disconnect();
  }
};

// seedItemToDB();

const addItem = async (itemToBeAdded) => {
  try {
    const newItem = new Item(itemToBeAdded);
    await newItem.save();
    console.log("New Item Created", newItem);
  } catch (e) {
    console.log("Error while adding the item", e);
  }
};

const getItems = async () => {
  try {
    const items = await Item.find();
    // console.log("All Items ", items);
    return items;
  } catch (e) {
    console.error("Error While Fetching Items from the DB", e);
  }
};

const updateItem = async (itemId, itemToBeUpdated) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(itemId, itemToBeUpdated, {
      new: true,
    });

    if (updatedItem) {
      console.log("Updated item", updatedItem);
      return updatedItem;
    } else {
      console.log("Item Does Not Exist In Database");
    }
  } catch (e) {
    console.log("Error While Updating the Item", e);
  }
};

const deleteItem = async (itemId) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(itemId);

    if (deletedItem) {
      console.log("Deleted Item", deletedItem);
      return deletedItem;
    } else {
      console.log("Item Does Not Exist In DB");
    }
  } catch (e) {
    console.log("Error While Deleting the Item From DB", e);
  }
};

module.exports = {
  getItems,
  addItem,
  updateItem,
  deleteItem,
};
