const { errorResponse, successResponse } = require("../../utils/responses")
const {SchoolMemoria,School} = require("../../models");
const getUrl = require("../../utils/cloudinary_upload");

const createSchoolMemorium = async(req,res)=>{
try {
    const {
        name,description
    } = req.body;
    const image = await getUrl(req);
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
        const schoolMemorium = await SchoolMemoria.findOne({
            where:{
                uuid
            }
        })
        if(req.file){
             image = await getUrl(req);
        }
        const response = await schoolMemorium.update({
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