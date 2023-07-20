const {Message} = require("../../models");
const { errorResponse, successResponse } = require("../../utils/responses");
const saveMessage = async(req,res)=>{
    try {
        const {name,email,message} = req.body;
        const response = await Message.create({
           name,email,message
        });
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}

const getMessages = async (req,res)=>{
    try {
        const response = await Message.findAll()
        successResponse(res,response);
    } catch (error) {
        errorResponse(res,error)
    }
}
module.exports = {
    saveMessage,getMessages
}