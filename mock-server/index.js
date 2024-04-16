const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

const productsFilePath = path.join(__dirname, "/database/products.json");

// Helper function to read data from a JSON file
const readDataFromFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data.toString());
  } catch (error) {
    console.error(`Error reading data from file: ${error}`);
    return []; // Return an empty array in case of an error
  }
};

// Write products to file
const writeProductsToFile = (data, filePath) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2)); // Pretty print the JSON
};

app.get("/get-products", (req, res) => {
  const products = readDataFromFile(productsFilePath);
  res.status(200).json(products);
});

app.post("/create-product", (req, res) => {
  const newProduct = req.body;
  const products = readDataFromFile(productsFilePath);

  // Logic to assign an ID to the new product
  newProduct.id = Date.now().toString();

  products.push(newProduct); // Add the new product to the existing list
  writeProductsToFile(products, productsFilePath); // Write the updated list back to the file

  res.status(201).send(newProduct); // Respond with the created product
});

app.post("/edit-product", (req, res) => {
  const editedProduct = req.body;

  if (!editedProduct.id) {
    return res.status(400).send("Product ID is required");
  }

  const products = readDataFromFile(productsFilePath);

  // Find the index of the product to edit
  const productIndex = products.findIndex(product => product.id === editedProduct.id);

  // If product does not exist, return an error
  if (productIndex === -1) {
    return res.status(404).send("Product not found");
  }

  // Update the product in the array
  products[productIndex] = { ...products[productIndex], ...editedProduct };

  // Write the updated products back to the file
  writeProductsToFile(products, productsFilePath);

  // Respond with the updated product
  res.status(200).send(editedProduct);
});

app.post("/delete-products", (req, res) => {
  const idsToDelete = req.body.ids; // Expecting an array of IDs to delete

  if (!idsToDelete || !Array.isArray(idsToDelete)) {
    return res.status(400).send("Invalid request, 'ids' must be an array of product IDs.");
  }

  const products = readDataFromFile(productsFilePath);

  // Filter out products with IDs not in the idsToDelete array
  const updatedProducts = products.filter(product => !idsToDelete.includes(product.id));

  // Check if any products were actually deleted (optional)
  if (products.length === updatedProducts.length) {
    return res.status(404).send("No products found with the given IDs.");
  }

  // Write the updated list back to the file
  writeProductsToFile(updatedProducts, productsFilePath);

  // Respond with a success message
  res.status(200).send({ids: idsToDelete, message: `Products with IDs: ${idsToDelete.join(", ")} were successfully deleted.`});
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
