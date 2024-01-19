const Item = require("../models/item.model.js");
const Sales = require("../models/sales.model.js");

const getAllSales = async () => {
  try {
    const allSales = await Sales.find().populate({
      path: "description",
      select: "name",
    });

    console.log("All Sales", allSales);
    return allSales;
  } catch (e) {
    console.log("Error While Fetching Sales from the DB", e);
  }
};

const addSale = async (itemId, saleQuantity, salePrice) => {
  try {
    const itemSold = await Item.findById(itemId);

    const newSale = new Sales({
      description: itemId,
      quantity: saleQuantity,
      price: salePrice,
      item: itemSold.name,
    });

    await newSale.save();
    console.log("New Sale Created", newSale);
    return newSale;
  } catch (e) {
    console.log("Error While Adding Sales", e);
  }
};

module.exports = {
  getAllSales,
  addSale,
};
