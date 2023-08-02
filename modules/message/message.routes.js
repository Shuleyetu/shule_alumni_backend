const {Router} = require('express')
const { getMessages, saveMessage, replyMessage } = require('./message.controller');
const router = Router()

router.post("/",saveMessage)
router.post("/reply/:uuid",replyMessage)
router.get('/',getMessages)


module.exports = router