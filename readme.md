# API specs



# User Model 🙋🏻‍♂️

Below is the JSON format of the user model used in our application. This model is designed to be flexible enough to handle both customer and admin roles.

```json
{
  "id": "unique_identifier",
  "username": "user_name",
  "email": "user@example.com",
  "role": "customer",  // Can be 'customer' or 'admin'
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
    "theme": "light",  // User theme preference
    "language": "en"  // User language preference
  },
  "createdAt": "2021-01-01T00:00:00Z",
  "updatedAt": "2021-01-02T00:00:00Z"
}
