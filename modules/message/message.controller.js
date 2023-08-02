const {Message} = require("../../models");
const { sendMail } = require("../../utils/mail_controller");
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
const replyMessage = async (req,res)=>{
    try {
        const {subject,message}= req.body
        const uuid = req.params.uuid
        const user = await Message.findOne({
            where:{
                uuid
            }
        })
       const response = await sendMail(user,subject,message)
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
    saveMessage,getMessages,replyMessage
}