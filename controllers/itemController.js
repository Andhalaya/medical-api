const Item = require('../models/itemModel');

exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
};



