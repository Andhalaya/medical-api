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

exports.searchItems = async (req, res) => {
    try {
        const searchQuery = req.query.search || "";
        const items = await Item.find({ nombre: { $regex: searchQuery, $options: 'i' } });
        res.json(items);
    } catch (error) {
        console.error('Error searching items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.filterBy = async (req, res) => {
    try{
        const filterBy = req.query.filter || "";
        let query = {};
        if (filterBy) {
            query[filterBy] = true;
        }
        const items = await Item.find(query);
        res.status(200).json(items);
    } catch(error){
        console.error('Error filtering items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

