const express = require('express')

const {
  getAllSales,
  addSale,
} = require("../controllers/sales.controller.js")

const salesRouter = express.Router()

salesRouter.get('/', async (req, res) => {
  try{

    const allSales = await getAllSales()

    res.status(201).json({message: "Sales fetched successfully", sales: allSales})
    
  } catch(e){
    res.status(500).json({ error: "Failed to fetch all sales"})
  }
})

salesRouter.post('/:itemId', async(req, res) => {
  try{
    const { quantity, price} = req.body
    const newSale = await addSale(req.params.itemId, quantity, price)

    if(newSale){
      res.status(201).json({message: "Added Sale Successfully", newSale})
    } else{
      res.status(404).json({error: "Unable to add sale"})
    }
    
  } catch(e){
    res.status(500).json({error: "Failed to add Sale"})
  }
})

module.exports = salesRouter
