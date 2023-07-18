const {Router} = require('express')
const upload = require("../../utils/upload");
const { createSchoolEvent, getSchoolEvents, deleteSchoolEvents,getSchoolEvent, updateSchoolEvent } = require('./school_event.controller');
const router = Router()

router.post("/:uuid",upload.single('file'),createSchoolEvent)
router.patch("/:uuid",upload.single('file'),updateSchoolEvent)
router.get('/all/:uuid',getSchoolEvents)
router.get('/:uuid',getSchoolEvent)
router.delete('/:uuid',deleteSchoolEvents)

module.exports = router