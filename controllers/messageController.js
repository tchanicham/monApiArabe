const Message = require('../models/Message');

// Envoyer un message
exports.sendMessage = async (req, res) => {
    try {
        const { recipient, content } = req.body;
        const message = new Message({ sender: req.user.id, recipient, content });
        await message.save();
        res.status(201).json(message);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Lire les messages
exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [{ sender: req.user.id, recipient: req.params.recipientId }, { sender: req.params.recipientId, recipient: req.user.id }],
        }).populate('sender recipient');
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
};