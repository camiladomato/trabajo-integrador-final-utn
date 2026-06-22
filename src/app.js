const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/error.middleware');

const app = express();


app.use(cors());
app.use(express.json());


connectDB();


app.get('/', (req, res) => {
  res.send('Servidor UTN funcionando de diez 🚀');
});


app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🔥 Servidor corriendo en http://localhost:${PORT}`);
});