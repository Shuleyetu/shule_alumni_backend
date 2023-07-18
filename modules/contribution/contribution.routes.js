const {Router} = require('express')
const upload = require("../../utils/upload");
const { createContribution, getContributions, deleteContribution, totalContribution } = require('./contribution.controller');
const router = Router()

router.post("/:uuid",createContribution)
router.get('/all/:uuid',getContributions)
router.get('/total',totalContribution)
router.delete('/:uuid',deleteContribution)

module.exports = router