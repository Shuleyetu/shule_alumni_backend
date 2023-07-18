const {Router} = require('express')
const upload = require("../../utils/upload");
const { createSchoolNews, getSchoolNews, deleteSchoolNews, getSingleSchoolNews, updateSchoolNews } = require('./school_news.controller');
const router = Router()

router.post("/:uuid",upload.single('file'),createSchoolNews)
router.patch("/:uuid",upload.single('file'),updateSchoolNews)
router.get('/all/:uuid',getSchoolNews)
router.get('/:uuid',getSingleSchoolNews)
router.delete('/:uuid',deleteSchoolNews)

module.exports = router