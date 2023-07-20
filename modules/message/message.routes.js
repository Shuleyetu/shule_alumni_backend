const {Router} = require('express')
const { getMessages, saveMessage } = require('./message.controller');
const router = Router()

router.post("/",saveMessage)
router.get('/',getMessages)


module.exports = router