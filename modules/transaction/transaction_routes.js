const {Router} = require('express')
const { getHash, recordWebhookData, getAllTransactionHistory, transactionRequest, getAllProjectTransactions, totalAlumniTransaction, totalSchoolTransaction } = require('./transcation_controller');
const { paymentWebhook } = require('../contribution/contribution.controller');
const router = Router()

router.post("/shule-alumni-payment-webhook",recordWebhookData)
router.post("/request-link/:uuid",transactionRequest)
router.get("/total",totalAlumniTransaction)
router.get("/total/:id",totalSchoolTransaction)
router.get("/project/:uuid",getAllProjectTransactions)
router.get("/",getAllTransactionHistory)


module.exports = router