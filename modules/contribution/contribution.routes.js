const {Router} = require('express')
const upload = require("../../utils/upload");
const { createContribution, getContributions, deleteContribution, totalContribution, paymentWebhook } = require('./contribution.controller');
const router = Router()

router.post("/:uuid",createContribution)
router.get('/all/:uuid',getContributions)
router.get('/total',totalContribution)
router.delete('/:uuid',deleteContribution)
router.post("/payment-webhook",paymentWebhook)

module.exports = router