const {Router} = require('express')
const upload = require("../../utils/upload");
const { createSchool, getSchools, updateSchool, deleteSchool, schoolsCount, totalSchoolResources, getSchool } = require('./school.controller');

const router = Router()

router.post("/",upload.single('file'),createSchool)
router.patch("/:uuid",upload.single('file'),updateSchool)
router.get("/resources/:uuid",totalSchoolResources)
router.delete("/:uuid",deleteSchool)
router.get('/',getSchools)
router.get('/count',schoolsCount)
router.get('/:uuid',getSchool)



module.exports = router