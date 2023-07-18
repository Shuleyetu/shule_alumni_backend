const {Router} = require('express')
const upload = require("../../utils/upload");
const { createSchoolJob, updateSchoolJob, getSchoolJobs, deleteSchoolJob, getSchoolJob } = require('./job.controller');
const router = Router()

router.post("/:uuid",upload.single('file'),createSchoolJob)
router.patch("/:uuid",upload.single('file'),updateSchoolJob)
router.get('/all/:uuid',getSchoolJobs)
router.get('/:uuid',getSchoolJob)
router.delete('/:uuid',deleteSchoolJob)

module.exports = router