const { errorResponse, successResponse } = require("../../utils/responses")
const {School,User,SchoolJob,SchoolEvent,SchoolNews} = require("../../models");
const production_endpoint = require("../../utils/endpoints");

const createSchool = async(req,res)=>{
try {
    const {
        name,email,phone,address,city,municipal,type,registration_no,registered_date,headmaster_uuid
    } = req.body;
    const { originalname } = req.file;
    const image = production_endpoint + originalname;
    const response = await School.create({
        name,email,phone,image,address,city,municipal,type,registration_no,registered_date
    })
    if(headmaster_uuid){
        const user = await User.findOne({
          where:{
            uuid:headmaster_uuid
          }
        })
        user.update({
          schoolId:response.id
        })
      }
    successResponse(res,response)
} catch (error) {
    errorResponse(res,error)
}
}

const schoolsCount = async(req,res)=>{
    try {
    const response = await School.count()
    successResponse(res,response)
    } catch (error) {
        
    }
}

const totalSchoolResources = async(req,res)=>{
    try {
        const uuid = req.params.uuid;
        const school = await School.findOne({
            where:{
                uuid
            }
        })
        const news = await  SchoolNews.count({
            where:{
                schoolId:school.id
            }
        })
        const event = await  SchoolEvent.count({
            where:{
                schoolId:school.id
            }
        })
        const job = await  SchoolJob.count({
            where:{
                schoolId:school.id
            }
        })
        
        let total = news+event+job;
        successResponse(res,total)
    } catch (error) {
        errorResponse(res,error)
    }
}

const updateSchool = async(req,res)=>{
    try {
        let {
            name,email,phone,address,city,municipal,type,registration_no,registered_date,headmaster_uuid,image
        } = req.body;
        const uuid = req.params.uuid
        const school = await School.findOne({
            where:{
                uuid
            }
        })
        if(req.file){
            const { originalname } = req.file;
             image = production_endpoint + originalname;
        }
        const response = await school.update({
            name,email,phone,image,address,city,municipal,type,registration_no,registered_date,image
        })
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}


const deleteSchool = async(req,res)=>{
    try {
        
        const uuid = req.params.uuid
        const school = await School.findOne({
            where:{
                uuid
            }
        })
        const response =  await school.destroy()
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}
const getSchools = async(req,res)=>{
    try {
        const response = await School.findAll()
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}

module.exports = {
    createSchool,getSchools,updateSchool,deleteSchool,schoolsCount,totalSchoolResources
}