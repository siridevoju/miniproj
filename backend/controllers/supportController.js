const Support = require('../models/Support.js')

exports.addSupport = async (req, res) => {
    const { name, email, subject, message } = req.body;
    try {
        const newSupport = new Support({
            name,
            email,
            subject,
            message,
        })
        await newSupport.save();

        res.status(200).json({ message: 'Message added successfully' })
    }
    catch (error) {
        res.status(400).json({ message: 'Error in adding message ', error });
    }
}

exports.getAllSupportMessages = async (req, res) => {
    try {
        const messages = await Support.find({}, 'name subject'); // Fetch only name and subject
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages', error });
    }
};

exports.getSupportMessageDetails = async (req, res) => {
    try {
        const message = await Support.findById(req.params.id);
        if (!message) {
            return res.status(404).send({ message: 'Message not found' });
        }
        res.send(message);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching message' });
    }
};
