# API Docs

<h2>🎯 Verify Token</h2>
<p><strong>Endpoint:</strong> POST /verify-token</p>
<p><strong>Description:</strong> Verifies JWT for authenticity and fetches the associated user details.</p>
<p><strong>Request Body:</strong></p>

```json
{ "token": "your_jwt_token" }
```

<p><strong>Responses:</strong></p>
<ul>
  <li><strong>200 OK:</strong> 
  
  ```json 
  {"message": "Token verified successfully", "user": {"id": "user_id", "username": "username", "role": "user_role"}}
  ```
  </li>
  <li><strong>401 Unauthorized:</strong> 
  
  ```json
  {"message": "Invalid or expired token", "error": "Error message detailing the issue"}
  ```
  </li>
</ul>

<h2>🎯 Login</h2>
<p><strong>Endpoint:</strong> POST /login</p>
<p><strong>Description:</strong> Authenticates a user and returns a token.</p>
<p><strong>Request Body:</strong>

```json
{ "username": "user_username", "password": "user_password" }
```

</p>
<p><strong>Responses:</strong></p>
<ul>
  <li><strong>200 OK:</strong> 
  
  ```json
  {"message": "Authentication successful!", "token": "jwt_token", "user": {"id": "user_id", "username": "user_username", "role": "user_role"}}
  ```
  </li>
  <li><strong>401 Unauthorized:</strong> 
  
  ```json
  {"message": "Invalid username or password"}
  ```
  </li>
</ul>

<h2>🎯 Signup</h2>
<p><strong>Endpoint:</strong> POST /signup</p>
<p><strong>Description:</strong> Registers a new user.</p>
<p><strong>Request Body:</strong>

```json
{
  "username": "new_username",
  "password": "new_password",
  "email": "email@example.com"
}
```

</p>
<p><strong>Responses:</strong></p>
<ul>
  <li><strong>201 Created:</strong> 
  
  ```json
  {"id": "new_user_id", "username": "new_username"}
  ```
  </li>
  <li><strong>400 Bad Request:</strong> 
  ```json
  {"message": "Username or email already exists"}
  ```</li>
</ul>

<h2>🎯 Get Products</h2>
<p><strong>Endpoint:</strong> GET /get-products</p>
<p><strong>Description:</strong> Retrieves a list of all products.</p>
<p><strong>Responses:</strong></p>
<ul>
  <li><strong>200 OK:</strong> 
  
  ```json
  [{"id": "product_id", "name": "product_name"}]
  ```
  </li>
</ul>

<h2>🎯 Create Product</h2>
<p><strong>Endpoint:</strong> POST /create-product</p>
<p><strong>Description:</strong> Adds a new product to the system.</p>
<p><strong>Request Body:</strong>

```json
{ "name": "new_product_name", "details": "description" }
```

</p>
<p><strong>Responses:</strong></p>
<ul>
  <li><strong>201 Created:</strong> 
  
  ```json
  {"id": "new_product_id", "name": "new_product_name"}
  ```
  </li>
</ul>

<h2>🎯 Edit Product</h2>
<p><strong>Endpoint:</strong> POST /edit-product</p>
<p><strong>Description:</strong> Updates details of an existing product.</p>
<p><strong>Request Body:</strong>

```json
{ "id": "product_id", "updates": { "name": "updated_name" } }
```

</p>
<p><strong>Responses:</strong></p>
<ul>
  <li><strong>200 OK:</strong> 
  
  ```json
  {"message": "Product updated successfully"}
  ```
  </li>
  <li><strong>404 Not Found:</strong> 
  
  ```json
  {"message": "Product not found"}
  ```
  </li>
</ul>

<h2>🎯 Delete Products</h2>
<p><strong>Endpoint:</strong> POST /delete-products</p>
<p><strong>Description:</strong> Deletes multiple products based on their IDs.</p>
<p><strong>Request Body:</strong>

```json
{ "ids": ["product_id1", "product_id2"] }
```

</p>
<p><strong>Responses:</strong></p>
<ul>
  <li><strong>200 OK:</strong> 
  
  ```json
  {"message": "Products with IDs: [product_id1, product_id2] were successfully deleted."}
  ```
  </li>
  <li><strong>404 Not Found:</strong> 
  
  ```json
  {"message": "No products found with the given IDs."}
  ```
  </li>
</ul>

<br />

# User Model 🙋🏻‍♂️

Example of a user model

```json
{
  "id": "unique_identifier",
  "username": "user_name",
  "email": "user@example.com",
  "role": "customer", // Can be 'customer' or 'admin'
  "profile": {
    "firstName": "John",
    "lastName": "Doe",
    "companyName": "Example Corp",
    "position": "CEO"
  },
  "contact": {
    "phone": "+1234567890",
    "address": {
      "street": "1234 Business Rd",
      "city": "Commerce City",
      "state": "Business State",
      "zipCode": "12345",
      "country": "Business Country"
    }
  },
  "settings": {
    "theme": "light", // User theme preference
    "language": "en" // User language preference
  },
  "createdAt": "2021-01-01T00:00:00Z",
  "updatedAt": "2021-01-02T00:00:00Z"
}
```

# Product Model

Example of a product model

```json
{
  "id": "unique_product_identifier",
  "name": "Pelle di vitello",
  "description": "High-quality calf leather",
  "categories": ["leather", "luxury"],
  "variants": [
    {
      "color": "nero",
      "stock": 20
    },
    {
      "color": "rosso",
      "stock": 15
    }
  ],
  "price": {
    "basePrice": 100.0,
    "currency": "EUR",
    "taxRate": 0.22
  },
  "paymentMethods": ["credit card", "bank transfer"],
  "shipping": {
    "fromWarehouses": ["Warehouse1", "Warehouse2"],
    "shippingCost": {
      "local": 5.0,
      "international": 15.0
    }
  },
  "userProfileFeatures": {
    "returnPolicy": "Details about return policy",
    "wishlistEnabled": true
  },
  "subscriptionDetails": {
    "licenseUsage": "usage terms",
    "supportAndMaintenance": "regular maintenance and support",
    "extraWorkHoursPerMonth": 5
  }
}
```
