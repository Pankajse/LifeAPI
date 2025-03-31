const {askChatbot} = require("../services/chatbot.service")

module.exports.askChatbot= async (req,res)=>{
    try {
        const question = req.body.question;
        const answer = await askChatbot(question);
        return res.status(200).json({answer });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}