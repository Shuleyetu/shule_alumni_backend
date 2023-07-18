const { errorResponse, successResponse } = require("../../utils/responses")
const {SchoolJob,School} = require("../../models");
const production_endpoint = require("../../utils/endpoints");

const createSchoolJob = async(req,res)=>{
try {
    const {
        title,description,link,type
    } = req.body;
    const { originalname } = req.file;
    const image = production_endpoint + originalname;
    const uuid = req.params.uuid
    const school = await School.findOne({
        where:{
            uuid
        }
    });
   
    const response = await SchoolJob.create({
        title,description,image,type,link,schoolId:school.id
    })
    successResponse(res,response)
} catch (error) {
    errorResponse(res,error)
}
}

const updateSchoolJob = async(req,res)=>{
    try {
        let {
            title,description,image,link,type
        } = req.body;
        const uuid = req.params.uuid
        const SchoolJob = await SchoolJob.findOne({
            where:{
                uuid
            }
        })
        if(req.file){
            const { originalname } = req.file;
             image = production_endpoint + originalname;
        }
        const response = await SchoolJob.update({
            title,description,image,link,type
        })
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}
const getSchoolJobs = async(req,res)=>{
    try {
        const uuid = req.params.uuid
        
        const school = await School.findOne({
            where:{
                uuid
            }
        });
        const response = await SchoolJob.findAll({
            where:{
                schoolId:school.id
            }
        })
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}

const getSchoolJob = async(req,res)=>{
    try {
        const uuid = req.params.uuid
        const response = await SchoolJob.findOne({
            where:{
                uuid
            }
        });
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}

const deleteSchoolJob = async(req,res)=>{
    try {
        const uuid = req.params.uuid
        const event = await SchoolJob.findOne({
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
    createSchoolJob,getSchoolJob,getSchoolJobs,updateSchoolJob, deleteSchoolJob
}