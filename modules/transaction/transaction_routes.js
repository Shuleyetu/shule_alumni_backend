const {Router} = require('express')
const { getHash, recordWebhookData, getAllTransactionHistory, transactionRequest, getAllProjectTransactions } = require('./transcation_controller');
const { paymentWebhook } = require('../contribution/contribution.controller');
const router = Router()

router.post("/shule-alumni-payment-webhook",recordWebhookData)
router.post("/request-link/:uuid",transactionRequest)
router.get("/",getAllTransactionHistory)
router.get("/project/:uuid",getAllProjectTransactions)

module.exports = router