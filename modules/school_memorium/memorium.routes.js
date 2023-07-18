const {Router} = require('express')
const upload = require("../../utils/upload");
const { createSchoolMemorium, updateSchoolMemorium, getSchoolMemoriums, deleteSchoolMemorium, getSchoolMemorium } = require('./memorium.controller');
const router = Router()

router.post("/:uuid",upload.single('file'),createSchoolMemorium)
router.patch("/:uuid",upload.single('file'),updateSchoolMemorium)
router.get('/all/:uuid',getSchoolMemoriums)
router.get('/:uuid',getSchoolMemorium)
router.delete('/:uuid',deleteSchoolMemorium)

module.exports = router