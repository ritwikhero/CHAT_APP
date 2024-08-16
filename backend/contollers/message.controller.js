import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async(req, res) =>{
    try {
        const {message} = req.body;
        const {id : receiverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants : {$all : [senderId,receiverId]},
        });
        
        if(!conversation){
            conversation = await Conversation.create({
                participants : [senderId , receiverId],
            });
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        
        //SOCKET IO functionality in near future

        
        // await conversation.save();
        // await newMessage.save();

        //this will run in parallel making it efficient
        await Promise.all([conversation.save(),newMessage.save()]);
        
        res.status(201).json({newMessage});
        
        } catch (error) {
        console.log("error in message controller",error.message);
        res.status(500).json({error : "Internal sever error"});
    }
}

export const getMessage = async(req, res) =>{
    try {
        const { id: userToChatId} = req.params;
        const senderId = req.user._id;
        
        let conversation = await Conversation.findOne({
            participants : {$all : [senderId,userToChatId]}
        }).populate("messages");

        res.status(200).json(conversation.messages);
    } catch (error) {
        console.log("Error int getMessage controller ", error.message);
        res.status(500).json({error : "Internal server error"});
    }
}
