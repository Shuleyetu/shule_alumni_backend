const { errorResponse, successResponse } = require("../../utils/responses")
const {GeneralNews,SchoolNews,SchoolEvent,School} = require("../../models");
const production_endpoint = require("../../utils/endpoints");

const createGeneralNews = async(req,res)=>{
try {
    const {
        title,description
    } = req.body;
    const { originalname } = req.file;
    const image = production_endpoint + originalname;
    const response = await GeneralNews.create({
        title,description,image
    })
    successResponse(res,response)
} catch (error) {
    errorResponse(res,error)
}
}
const totalResources = async (req,res)=>{
    try {
        const generalNews = await GeneralNews.count()
        const schoolNews = await SchoolNews.count()
        const schoolEvent = await SchoolEvent.count()
        let total = generalNews+schoolEvent+schoolNews;
        successResponse(res,total)
    } catch (error) {
        errorResponse(res,error)
    }
}
const updateGeneralNews = async(req,res)=>{
    try {
        let {
            title,description,image
        } = req.body;
        const uuid = req.params.uuid
        const generalNews = await GeneralNews.findOne({
            where:{
                uuid
            }
        })
        
        if(req.file){
            const { originalname } = req.file;
             image = production_endpoint + originalname;
        }
        const response = await generalNews.update({
            title,description,image
        })
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}

const getAllGeneralNews = async(req,res)=>{
    try {
        const response = await GeneralNews.findAll({})
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}

const deleteGeneralNews = async(req,res)=>{
    try {
        const uuid = req.params.uuid
        const news = await GeneralNews.findOne({
            where:{
                uuid
            }
        });
        const response = news.destroy()
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}
const getGeneralNews = async(req,res)=>{
    try {
        const uuid = req.params.uuid
        const response = await GeneralNews.findOne({
            where:{
                uuid
            }
        });
        
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}
module.exports = {
    createGeneralNews,getGeneralNews,deleteGeneralNews,getAllGeneralNews,updateGeneralNews,totalResources
}