const { User,School,Gallery } = require("../../models");
const getUrl = require("../../utils/cloudinary_upload");

const { generateJwtTokens } = require("../../utils/generateJwtTokens");
const { successResponse, errorResponse } = require("../../utils/responses");
const bcrypt = require('bcrypt')
const {Op} = require("sequelize");
const sendSMS = require("../../utils/send_sms");
const addPrefixToPhoneNumber = require("../../utils/add_number_prefix");
const { resetPassword, sendMail } = require("../../utils/mail_controller");


const sendMessage = async (req, res) => {
  try {
    const { to, type, subject, message } = req.body;

    let promises = []; // Array to hold promises

    switch (to) {
      case "all":
        const users = await User.findAll();
        users.forEach(async (user) => {
          switch (type) {
            case "all":
              promises.push(sendSMS(addPrefixToPhoneNumber(user.phone), message));
              promises.push(sendMail(user, subject, message));
              break;
            case "sms":
              promises.push(sendSMS(addPrefixToPhoneNumber(user.phone), message));
              break;
            case "mail":
              promises.push(sendMail(user, subject, message));
              break;
            default:
              break;
          }
        });
        break;
      default:
        const user = await User.findOne({
          where: {
            email: to,
          },
        });
        switch (type) {
          case "all":
            promises.push(sendSMS(addPrefixToPhoneNumber(user.phone), message));
            promises.push(sendMail(user, subject, message));
            break;
          case "sms":
            promises.push(sendSMS(addPrefixToPhoneNumber(user.phone), message));
            break;
          case "mail":
            promises.push(sendMail(user, subject, message));
            break;
          default:
            break;
        }
        break;
    }

    await Promise.all(promises);

    successResponse(res, true);
  } catch (error) {
    errorResponse(res, error);
  }
};

const sendPasswordLink = async (req,res)=>{
  try {
    const {email} = req.body
    const user = await User.findOne({
      where:{
        email
      }
    })
    if (!user) {
      res.status(404).json({
        status: false,
        message: "User does not exist"
      });
    }
    else{
      await resetPassword(user)
    }
    successResponse(res,true)
  } catch (error) {
    errorResponse(res,error)
  }
}
const passwordReset = async (req,res)=>{
  try {
    let {password} = req.body;
    const uuid = req.params.uuid
    const user = await User.findOne({
      where:{
        uuid
      }
    })
    const hashedPassword = bcrypt.hashSync(password, 10);
    password = hashedPassword;
    const response = user.update({
      password
    })
    successResponse(res,response)
  } catch (error) {
    errorResponse(res,error)
  }
}
const pushSMS = async(req,res)=>{
  try {
    const {message} = req.body;
    let numbers = ["2557437479064"]
    const response = await sendSMS(numbers,message)
    successResponse(res,response)
  } catch (error) {
    errorResponse(res,error)
  }
}
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
      const user = await User.findOne({ where: { email } });
      if (user) {
        res.status(403).json({
          status: false,
          message: "Email is already registered"
        });
      } else {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const image =await getUrl(req)
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
        sendSMS(addPrefixToPhoneNumber(phone),`Hi ${name}, welcome to Shule Alumni. you can easily
         find and connect with fellow alumni from your institution.
         Reconnect with old friends, expand your professional network, or 
         simply stay up-to-date with the achievements of your fellow graduates.`)

        res.status(201).json({
          status: true,
          body: response
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

const addGallery = async(req,res)=>{
  try {
    const image = await getUrl(req)
    const uuid = req.params.uuid
    const user = await User.findOne({
      where:{
        uuid
      }
    })
    const gallery = await Gallery.create({
      image,userId:user.id
    })
    successResponse(res,gallery)
  } catch (error) {
    errorResponse(res,error)
  }
}
const deleteGallery = async(req,res)=>{
  try {
    const uuid = req.params.uuid
    const gallery = await Gallery.findOne({
      uuid
    });
    await gallery.destroy();
  } catch (error) {
    errorResponse(res,error);
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

const updateUser = async (req, res) => {
  try {
    const uuid = req.params.uuid; // Move this line to after getting user object
    let {
      image,
      school_uuid,
      password,
      ...otherFields // Use object destructuring to collect other fields
    } = req.body;
    let schoolId;
    if (school_uuid) {
      const school = await School.findOne({
        where: {
          uuid: school_uuid
        }
      });
      schoolId = school.id;
      delete otherFields.school_uuid
    }

    if (password && password.length < 15) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      password = hashedPassword;
    } else {
      delete otherFields.password;
    }

    if (req.file) {
      image = await getUrl(req);
    }

    const user = await User.findOne({
      where: {
        uuid
      }
    });

    const response = await user.update({
      image,
      password,
      schoolId,
      ...otherFields // Spread other fields here
    });

    successResponse(res, response);
  } catch (error) {
    console.log(error);
    errorResponse(res, error);
  }
};



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
  const getAllAlumni = async(req,res)=>{
    try {
      const response = await User.findAll({include:[School],
        where:{
        role:{
          [Op.eq]:"Alumni"
        }
      }})
     successResponse(res,response)
    } catch (error) {
      errorResponse(res,error)
    }
  }
  const getUserFullInformation = async (req,res)=>{
    try {
      
      const uuid = req.params.uuid;
      const user = await User.findOne({
        where:{
          uuid
        },
        attributes:{
          exclude:['schoolId']
        },
        include:[School,Gallery]
      })
      successResponse(res,user)
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
            role:"Moderator"
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
    deleteUser,
    sendMessage,
    getAllAlumni,
    sendPasswordLink,
    passwordReset,
    addGallery,
    deleteGallery,
    getUserFullInformation,
    pushSMS
  }