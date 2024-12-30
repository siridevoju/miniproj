const Tool = require('../models/Tool.js')

exports.addTool = async (req, res) => {
    const { email, name, description, price, discountPrice, image } = req.body;

    if (email !== 'admin@gmail.com') {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    try {
        const newTool = new Tool({
            name,
            description,
            price,
            discountPrice,
            image
        });
        await newTool.save();
        res.status(201).json(newTool);
    } catch (error) {
        res.status(500).json({ message: 'Error adding tool', error });
    }
};


exports.getTools = async (req, res) => {
    try {
        const tools = await Tool.find();  // Fetch all tools from the database
        if (tools.length === 0) {
            return res.status(200).json({ message: 'No tools found' });
        }
        res.status(200).json(tools);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tools' });
    }
}

exports.deleteTool = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTool = await Tool.findByIdAndDelete(id);
        if (!deletedTool) {
            return res.status(404).json({ message: 'Tool not found' });
        }
        res.status(200).json({ message: 'Tool deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting tool' });
    }
}