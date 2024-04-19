const  Message  = require('../models/Message');
const verifyToken =require('../middleware/verifyToken')

// Controller to handle sending a message
exports.sendMessage = [ verifyToken, async (req, res) => {
    try {
        const { senderId, receiverId, content } = req.body;

        // Create a new message using the Message model
        const newMessage = await Message.create({
            senderId,
            receiverId,
            content
        });

        // Respond with the created message
        res.status(201).json(newMessage);
    } 
    catch (error) {
        // Handle errors
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
]

// Controller to handle fetching all messages
exports.getAllMessages = async (req, res) => {
    try {
        // Retrieve all messages from the database
        const messages = await Message.findAll();

        // Respond with the retrieved messages
        res.json(messages);
    } catch (error) {
        // Handle errors
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
