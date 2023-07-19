const {Router} = require('express')
const { getHash, recordWebhookData, getAllTransactionHistory } = require('./transcation_controller');
const { paymentWebhook } = require('../contribution/contribution.controller');
const router = Router()

router.post("/shule-alumni-payment-webhook",recordWebhookData)
router.get("/",getAllTransactionHistory)



module.exports = router