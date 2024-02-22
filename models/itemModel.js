const mongoose = require('mongoose');

// Define the schema for the item
const itemSchema = new mongoose.Schema({
    codigo: String,
    nombre: String,
    "alto riesgo": Boolean,
    estupefacientes: Boolean,
    mezclas: Boolean,
    termolabil: Boolean,
});

// Create a Mongoose model for the item collection
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
