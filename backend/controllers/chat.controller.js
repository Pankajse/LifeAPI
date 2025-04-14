const Chat = require("../models/chat.model");
const { UserModel } = require("../models/user.model");
const OrgModel = require("../models/org.model");

const connect = async (req, res) => {
    try {
        let userId;
        const {  otherUserId, type } = req.body;
        if(type === 'org'){
            userId = req.org._id;
        }else{
            userId = req.user._id;
        }
        const text = "blood requested"
        if (!userId || !otherUserId || !text) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Check if a chat already exists between the two users
        let chat = await Chat.findOne({
            members: { $all: [userId, otherUserId] },
        });

        if (!chat) {
            // Create a new chat if it doesn't exist
            chat = new Chat({
                members: [userId, otherUserId],
                messages: [
                    {
                        sender: userId,
                        text,
                    },
                ],
            });
        } else {
            // Add the new message to the existing chat
            chat.messages.push({
                sender: userId,
                text,
            });
        }

        await chat.save();
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getChatUsers = async (req, res) => {
    const { type } = req.body;
    let userId;
    if (type === 'user') {
        userId = req.user._id;
    } else {
        userId = req.org._id;
    }

    try {
        // Find all chats where the requesting user is a member
        const chats = await Chat.find({ members: userId }).lean();

        // Fetch details of the other member in each chat
        const chatDetails = await Promise.all(
            chats.map(async (chat) => {
                const otherMemberId = chat.members.find(member => member.toString() !== userId.toString());
                let otherMember;

                // Check if the other member is a user or an organization
                otherMember = await UserModel.findById(otherMemberId).select("-password");
                if (!otherMember) {
                    otherMember = await OrgModel.findById(otherMemberId).select("-password");
                }

                return {
                    ...chat,
                    members: [otherMember], // Replace member ID with member details
                };
            })
        );

        res.status(200).json(chatDetails);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { connect, getChatUsers };
