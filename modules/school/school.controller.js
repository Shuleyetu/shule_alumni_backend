const { errorResponse, successResponse } = require("../../utils/responses");
const { School, User, SchoolJob, SchoolEvent,SchoolMemoria,Project, SchoolNews, Sequelize } = require("../../models");

const getUrl = require("../../utils/cloudinary_upload");

const createSchool = async (req, res) => {
  try {
    const {
      name, email, phone, address, city, municipal, type, registration_no, registered_date, headmaster_uuid
    } = req.body;
    const image = await getUrl(req);
   
    const school = await School.create({
      name, email, phone, image, address, city, municipal, type, registration_no, registered_date
    });

    if (headmaster_uuid) {
      const user = await User.findOne({
        where: {
          uuid: headmaster_uuid
        }
      });

      if (user) {
        user.update({
          schoolId: school.id
        });
      }
    }

    successResponse(res, school);
  } catch (error) {
    errorResponse(res, error);
  }
};

const schoolsCount = async (req, res) => {
  try {
    const count = await School.count();
    successResponse(res, count);
  } catch (error) {
    errorResponse(res, error);
  }
};

const totalSchoolResources = async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const school = await School.findOne({
      where: {
        uuid
      }
    });

    const newsCount = await SchoolNews.count({
      where: {
        schoolId: school.id
      }
    });

    const eventCount = await SchoolEvent.count({
      where: {
        schoolId: school.id
      }
    });

    const jobCount = await SchoolJob.count({
      where: {
        schoolId: school.id
      }
    });

    const total = newsCount + eventCount + jobCount;
    successResponse(res, total);
  } catch (error) {
    errorResponse(res, error);
  }
};

const updateSchool = async (req, res) => {
  try {
    let {
      name, email, phone, address, city, municipal, type, registration_no, registered_date, headmaster_uuid, image
    } = req.body;

    const uuid = req.params.uuid;
    const school = await School.findOne({
      where: {
        uuid
      }
    });
    if (req.file) {
     image = await getUrl(req);  
    }

    const response = await school.update({
      name, email, phone, image, address, city, municipal, type, registration_no, registered_date, image
    });

    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

const deleteSchool = async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const school = await School.findOne({
      where: {
        uuid
      }
    });
    const response = await school.destroy();
    successResponse(res, response);
  } catch (error) {
    errorResponse(res, error);
  }
};

const getSchools = async (req, res) => {
  try {
    const schools = await School.findAll();
    successResponse(res, schools);
  } catch (error) {
    errorResponse(res, error);
  }
};

const getSchool = async (req, res) => {
    try {
      const uuid = req.params.uuid;
      const school = await School.findOne({
        where: {
          uuid,
        }
      });
     const alumniCount= await User.count({where:{schoolId:school.id,role:"Alumni"}})
    const projectCount = await Project.count({where:{schoolId:school.id}})
    const newsCount = await SchoolNews.count({where:{schoolId:school.id}})
    const eventCount = await SchoolEvent.count({where:{schoolId:school.id}})
    const jobCount = await SchoolJob.count({where:{schoolId:school.id}})
    const memoriumCount = await SchoolMemoria.count({where:{schoolId:school.id}})
    const response = {alumniCount,projectCount,newsCount,eventCount,jobCount,memoriumCount,schoolInfo:school}

      successResponse(res, response);
    } catch (error) {
      errorResponse(res, error);
    }
  };
  

module.exports = {
  createSchool,
  getSchools,
  updateSchool,
  deleteSchool,
  schoolsCount,
  totalSchoolResources,
  getSchool
};

