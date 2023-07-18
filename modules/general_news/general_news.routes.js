const {Router} = require('express')
const upload = require("../../utils/upload");
const { createGeneralNews, getGeneralNews, deleteGeneralNews, getAllGeneralNews, updateGeneralNews } = require('./general_news.controller');
const router = Router()

router.post("/",upload.single('file'),createGeneralNews)
router.patch("/:uuid",upload.single('file'),updateGeneralNews)
router.get('/',getAllGeneralNews)
router.get('/:uuid',getGeneralNews)
router.delete('/:uuid',deleteGeneralNews)

module.exports = router