const { errorResponse, successResponse } = require("../../utils/responses")
const {SchoolEvent,School} = require("../../models");
const production_endpoint = require("../../utils/endpoints");

const createSchoolEvent = async(req,res)=>{
try {
    const {
        title,description
    } = req.body;
    const { originalname } = req.file;
    const image = production_endpoint + originalname;
    const uuid = req.params.uuid
    const school = await School.findOne({
        where:{
            uuid
        }
    });
   
    const response = await SchoolEvent.create({
        title,description,image,schoolId:school.id
    })
    successResponse(res,response)
} catch (error) {
    errorResponse(res,error)
}
}

const updateSchoolEvent = async(req,res)=>{
    try {
        let {
            title,description,image
        } = req.body;
        const uuid = req.params.uuid
        const schoolEvent = await SchoolEvent.findOne({
            where:{
                uuid
            }
        })
        if(req.file){
            const { originalname } = req.file;
             image = production_endpoint + originalname;
        }
        const response = await schoolEvent.update({
            title,description,image
        })
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}
const getSchoolEvents = async(req,res)=>{
    try {
        const uuid = req.params.uuid
        const school = await School.findOne({
            where:{
                uuid
            }
        });
        const response = await SchoolEvent.findAll({
            where:{
                schoolId:school.id
            }
        })
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}

const getSchoolEvent = async(req,res)=>{
    try {
        const uuid = req.params.uuid
        const response = await SchoolEvent.findOne({
            where:{
                uuid
            }
        });
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}

const deleteSchoolEvents = async(req,res)=>{
    try {
        const uuid = req.params.uuid
        const event = await SchoolEvent.findOne({
            where:{
                uuid
            }
        });
        const response = event.destroy()
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}
module.exports = {
    createSchoolEvent,getSchoolEvents,getSchoolEvent,updateSchoolEvent, deleteSchoolEvents
}