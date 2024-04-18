const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Get all products
router.get("/get-products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new product
router.post("/create-product", async (req, res) => {
  const product = new Product({
    ...req.body,
    dateCreated: new Date(),
    dateLastUpdate: new Date()
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Edit an existing product
router.post("/edit-product", async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).send("Product ID is required");
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send("Product not found");
    }

    // Updates the product with new values from req.body
    Object.assign(product, req.body, { dateLastUpdate: new Date() });
    await product.save();

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete one or more products
router.post("/delete-products", async (req, res) => {
  const idsToDelete = req.body.ids;
  if (!idsToDelete || !Array.isArray(idsToDelete)) {
    return res.status(400).send("Invalid request, 'ids' must be an array of product IDs.");
  }

  try {
    const result = await Product.deleteMany({ id: { $in: idsToDelete } });
    if (result.deletedCount === 0) {
      return res.status(404).send("No products found with the given IDs.");
    }

    res.status(200).send({ ids: idsToDelete, message: `Products with IDs: ${idsToDelete.join(", ")} were successfully deleted.` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
