const { errorResponse, successResponse } = require("../../utils/responses")
const {SchoolMemoria,School} = require("../../models");
const production_endpoint = require("../../utils/endpoints");

const createSchoolMemorium = async(req,res)=>{
try {
    const {
        name,description
    } = req.body;
    const { originalname } = req.file;
    const image = production_endpoint + originalname;
    const uuid = req.params.uuid
    const school = await School.findOne({
        where:{
            uuid
        }
    });
   
    const response = await SchoolMemoria.create({
        name,description,image,schoolId:school.id
    })
    successResponse(res,response)
} catch (error) {
    errorResponse(res,error)
}
}

const updateSchoolMemorium = async(req,res)=>{
    try {
        let {
            name,description,image
        } = req.body;
        const uuid = req.params.uuid
        const SchoolMemorium = await SchoolMemoria.findOne({
            where:{
                uuid
            }
        })
        if(req.file){
            const { originalname } = req.file;
             image = production_endpoint + originalname;
        }
        const response = await SchoolMemoria.update({
            name,description,image
        })
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}
const getSchoolMemoriums = async(req,res)=>{
    try {
        const uuid = req.params.uuid
        const school = await School.findOne({
            where:{
                uuid
            }
        });
        const response = await SchoolMemoria.findAll({
            where:{
                schoolId:school.id
            }
        })
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}

const getSchoolMemorium = async(req,res)=>{
    try {
        const uuid = req.params.uuid
        const response = await SchoolMemoria.findOne({
            where:{
                uuid
            }
        });
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}

const deleteSchoolMemorium = async(req,res)=>{
    try {
        const uuid = req.params.uuid
        const event = await SchoolMemoria.findOne({
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
    createSchoolMemorium,getSchoolMemoriums,getSchoolMemorium,updateSchoolMemorium, deleteSchoolMemorium
}