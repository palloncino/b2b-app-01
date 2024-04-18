require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
// const preventiveRoutes = require('./routes/preventiveRoutes');

const app = express();
const PORT = process.env.PORT || 4023;

app.use(cors());

app.use(express.json({ limit: '50mb' }));
connectDB();

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
// app.use('/preventives', preventiveRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
