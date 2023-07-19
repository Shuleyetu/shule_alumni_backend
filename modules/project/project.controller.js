const { errorResponse, successResponse } = require("../../utils/responses")
const {Project,School,Pledge} = require("../../models");
const production_endpoint = require("../../utils/endpoints");

const createProject = async(req,res)=>{
try {
    const {
        name,duration,description
    } = req.body;
    const uuid = req.params.uuid
    const school = await School.findOne({
        where:{
            uuid
        }
    });
    const response = await Project.create({
        name,duration,description,schoolId:school.id
    })
    successResponse(res,response)
} catch (error) {
    errorResponse(res,error)
}
}

const updateProject = async(req,res)=>{
    try {
        const {
            name,duration,description
        } = req.body;
        const uuid = req.params.uuid
        const project = await Project.findOne({
            where:{
                uuid
            }
        });
        const response = await project.update({
            name,duration,description
        })
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
    }
    
const getProjects = async(req,res)=>{
    try {
        const uuid = req.params.uuid
        const school = await School.findOne({
            where:{
                uuid
            }
        });
        const project = await Project.findAll({
            where:{
                schoolId:school.id
            }
        })
   
        const response = project;
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}
const getProject = async(req,res)=>{
    try {
        const uuid = req.params.uuid
        const project = await Project.findOne({
            where:{
                uuid
            }
        });
        successResponse(res,project)
    } catch (error) {
        errorResponse(res,error)
    }
}
const schoolProjectCount = async(req,res)=>{
    try {
         const uuid = req.params.uuid
         const school = await School.findOne({
            uuid
         })
         const count = await Project.count({
            where:{
                schoolId:school.id
            }
         })
         successResponse(res,count)
    } catch (error) {
        errorResponse(res,error)
    }
}
const deleteProjects = async(req,res)=>{
    try {
        const uuid = req.params.uuid
        const event = await Project.findOne({
            where:{
                uuid
            }
        });
        const response = await event.destroy()
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}
module.exports = {
    createProject,getProjects,getProject,deleteProjects,updateProject,schoolProjectCount
}