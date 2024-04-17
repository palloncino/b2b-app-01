const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3001;
const SECRET_KEY = 'your_secret_key';

app.use(cors());
app.use(express.json({ limit: '50mb' }));

const usersFilePath = path.join(__dirname, "/database/users.json");
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

app.post("/verify-token", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  try {
    // Verify the token using the same secret key and options used to sign it
    const decoded = jwt.verify(token, SECRET_KEY);
    // Optionally, fetch user details from the database or storage
    const users = readDataFromFile(usersFilePath);
    const user = users.find(u => u.id === decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the verified user data or a simple success message
    res.json({
      message: "Token verified successfully",
      user: { id: user.id, username: user.username, role: user.role }
    });
  } catch (err) {
    // Catch and return errors such as token expiration or invalid token
    res.status(401).json({ message: "Invalid or expired token", error: err.message });
  }
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const users = readDataFromFile(usersFilePath);
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      SECRET_KEY,
      { expiresIn: '1h' }  // Token expires in 1 hour
    );
    res.status(200).json({ message: "Authentication successful!", token });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

app.post("/signup", (req, res) => {
  const newUser = req.body; // Assuming the body contains all necessary user fields
  const users = readDataFromFile(usersFilePath);

  // Check if the username or email already exists
  if (users.some(user => user.username === newUser.username || user.email === newUser.email)) {
    return res.status(400).json({ message: "Username or email already exists" });
  }

  // Assign a new unique identifier
  newUser.id = Date.now().toString();

  // Adding creation and update timestamps
  const timestamp = new Date().toISOString();
  newUser.createdAt = timestamp;
  newUser.updatedAt = timestamp;

  // Append the new user to the users array
  users.push(newUser);
  writeDataToFile(users, usersFilePath);

  res.status(201).json(newUser); // Return the new user object
});

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
