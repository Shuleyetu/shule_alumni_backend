const {Router} = require('express')
const upload = require("../../utils/upload");
const { createProject, getProjects, getProject, deleteProjects, updateProject, schoolProjectCount } = require('./project.controller');
const router = Router()

router.post("/:uuid",createProject)
router.get('/all/:uuid',getProjects)
router.patch('/:uuid',updateProject)
router.get('/:uuid',getProject)
router.get('/count/:uuid',schoolProjectCount)
router.delete('/:uuid',deleteProjects)


module.exports = router