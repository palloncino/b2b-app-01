# Incomplete API list:

### Authentication
- POST {base_url}/auth/login
- POST {base_url}/auth/verify-token
- POST {base_url}/auth/signup
### Products
- GET  {base_url}/products/get-products
- POST {base_url}/products/create-product
- POST {base_url}/products/edit-product
- POST {base_url}/products/delete-products

# User Model

Example of a user model

```javascript
{
  id: String,  // If you need a custom ID in addition to MongoDB's _id
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, default: 'customer' },
  profile: {
    firstName: String,
    lastName: String,
    companyName: String,
    position: String
  },
  contact: {
    phone: String,
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    }
  },
  settings: {
    theme: { type: String, default: 'light' },
    language: { type: String, default: 'en' }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

# Product Model

Example of a product model 

```javascript
{
  name: String,
  description: String,
  price: String,
  category: String,
  imgUrl: String,
  id: { type: String, unique: true, required: true },
  dateCreated: { type: Date, default: Date.now },
  dateLastUpdate: { type: Date, default: Date.now }
}
```
