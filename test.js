const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// MongoDB connection URI
const uri = 'mongodb+srv://test:SJdjfi8zmFzUamiu@cluster0.mczrna1.mongodb.net/?retryWrites=true&w=majority';

// Define schema for your items
const itemSchema = new mongoose.Schema({
  codigo: String,
  nombre: String,
  altoriesgo: Boolean,
  estupefacientes: Boolean,
  mezclas: Boolean,
  termolabil: Boolean
});

// Create a model based on the schema
const Item = mongoose.model('Item', itemSchema);

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');

    // Define a route to handle GET requests
    app.get('/items', async (req, res) => {
      try {
        // Retrieve all items from the collection using the Mongoose model
        const items = await Item.find({});
        res.json(items); // Send the items as a JSON response
      } catch (error) {
        console.error('Error retrieving items:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
