const { User,School } = require("../../models");
const production_endpoint = require("../../utils/endpoints");
const { generateJwtTokens } = require("../../utils/generateJwtTokens");
const { successResponse, errorResponse } = require("../../utils/responses");
const bcrypt = require('bcrypt')
const {Op} = require("sequelize")
const registerUser = async (req, res) => {
    try {
      const {
        name,
        email,
        phone,
        role,
        graduation_year,
        school_uuid,  
        password
      } = req.body;
      let schoolId;
      if (school_uuid) {
        const school = await School.findOne({
          where: {
            uuid: school_uuid
          }
        });
        schoolId = school.id;
      }
      
      const { originalname } = req.file;
      const image = production_endpoint + originalname;
      const user = await User.findOne({ where: { email } });
  
      if (user) {
        res.status(403).json({
          status: false,
          message: "Email is already registered"
        });
      } else {
        const hashedPassword = bcrypt.hashSync(password, 10);

        const user = await User.create({
          name,
          phone,
          email,
          password: hashedPassword,
          role,
          graduation_year,
          image,
          schoolId: schoolId
        });  
        const response = await User.findOne({
          where: {
            email: email
          },
          include:[School]
        });
        // const tokens = generateJwtTokens(response);
  
        res.status(201).json({
          status: true,
          body: response,
          // tokens: tokens
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Internal server error",
        error: error
      });
      console.log(error);
    }
  };
  const alumniCount = async(req,res)=>{
    try {
    const response = await User.count({
      where:{
        role:"Alumni"
      }
    })
    successResponse(res,response)
    } catch (error) {
        
    }
}

const alumniCountPerSchool = async(req,res)=>{
  try {
    const uuid = req.params.uuid
    const school = await School.findOne({
      where:{
        uuid
      }
    })
  const response = await User.count({
    where:{
      role:"Alumni",
      schoolId:school.id
    }
  })
  successResponse(res,response)
  } catch (error) {
      
  }
}

  const updateUser = async(req,res)=>{
    try {
      let {
        name,
        image,
        email,
        phone,
        role,
        graduation_year,
        school_uuid,
        schoolId,  
        password
      } = req.body;
      
      if (school_uuid) {
        const school = await School.findOne({
          where: {
            uuid: school_uuid
          }
        });
        schoolId = school.id;
      }
      if(password.length !== 10){
        const hashedPassword = bcrypt.hashSync(password, 10);
        password = hashedPassword;
      }
      if(req.file){
        const { originalname } = req.file;
         image = production_endpoint + originalname;
    }

        const uuid = req.params.uuid
        const user = await User.findOne({
            where:{
                uuid
            }
        })
        if(req.file){
            const { originalname } = req.file;
             image = production_endpoint + originalname;
        }
        const response = await user.update({
          name,
          image,
          email,
          phone,
          role,
          graduation_year,
          schoolId,  
          password
        })
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}


const deleteUser = async(req,res)=>{
    try {     
        const uuid = req.params.uuid
        const user = await User.findOne({
            where:{
                uuid
            }
        })
        const response =  await user.destroy()
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}

  const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        res.status(404).json({
          status: false,
          message: "User does not exist"
        });
      } else {
        if (await bcrypt.compare(password, user.password)) {
          const response = await User.findOne({
            where: {
              email: email
            },
            include:[School]
          });
          if(user.role === "Moderator"){
            if(user.schoolId !== null){
              res.status(200).json({
                status: true,
                response
              });
            }
            else{
              res.status(403).json({
                status: false,
                message: "Headmaster is not assigned to any school"
              });
            }
          }
          else{
            res.status(200).json({
              status: true,
              response
            });
          }
         
        } else {
          res.status(403).json({
            status: false,
            message: "Wrong password"
          });
        }
      }
    } catch (error) {
      internalError();
    }
  };

 
  const getAllUsers = async(req,res)=>{
    try {
      const response = await User.findAll({include:[School],where:{
        role:{
          [Op.ne]:"Alumni"
        }
      }})
     successResponse(res,response)
    } catch (error) {
      errorResponse(res,error)
    }
  }
  const getSchoolAlumni = async(req,res)=>{
    try {
      const school_uuid = req.params.uuid;

      const school = await School.findOne({
        where:{
          uuid:school_uuid
        }
      })
      const response = await User.findAll({
      where:{
        [Op.and]:[
          {
            schoolId:school.id
          },
          {
            role:"Alumni"
          }
        ]
      }})
     successResponse(res,response)
    } catch (error) {
      errorResponse(res,error)
    }
  }
  const getHeadmasters = async(req,res)=>{
    try {
     
      const response = await User.findAll({
      where:
          {
            role:"Moderator",
            schoolId:{
              [Op.eq]:null
            }
      }})
     successResponse(res,response)
    } catch (error) {
      errorResponse(res,error)
    }
  }

  const getHash = async(req,res)=>{
    try {
    const password =  bcrypt.hashSync("password",10)
    successResponse(res,password)
    } catch (error) {
      errorResponse(res,error)
    }
  }
  module.exports = {
    registerUser,
    getAllUsers,
    getSchoolAlumni,
    getHeadmasters,
    alumniCountPerSchool,
    loginUser,
    getHash,
    updateUser,
    alumniCount,
    deleteUser
  }