const { errorResponse, successResponse } = require("../../utils/responses")
const {Contribution,Project,User} = require("../../models");
const production_endpoint = require("../../utils/endpoints");

const createContribution = async(req,res)=>{
try {
    const {
        amount,user_uuid
    } = req.body;
    const uuid = req.params.uuid

    const project = await Project.findOne({
        where:{
            uuid
        }
    });
    const user = await User.findOne({
        where:{
            uuid:user_uuid
        }
    });
    const response = await Contribution.create({
        amount,projectId:project.id,userId:user.id
    })
    successResponse(res,response)
} catch (error) {
    errorResponse(res,error)
}
}
const totalContribution = async(req,res)=>{
    try {
        const sum = await Contribution.sum('amount')
        successResponse(res,sum)
    } catch (error) {
        errorResponse(res,error)
    }
}
const getContributions = async(req,res)=>{
    try {
        const uuid = req.params.uuid
        const project = await Project.findOne({
            where:{
                uuid
            }
        });
        const response = await Contribution.findAll({
            where:{
                projectId:project.id
            }
        })
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}

const deleteContribution = async(req,res)=>{
    try {
        const uuid = req.params.uuid
        const contribution = await Contribution.findOne({
            where:{
                uuid
            }
        });
        const response = await contribution.destroy()
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}
module.exports = {
    createContribution,getContributions,deleteContribution,totalContribution
}