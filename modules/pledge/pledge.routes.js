const {Router} = require('express')
const upload = require("../../utils/upload");
const { createPledge, getPledges, deletePledge, updatePledgeStatus } = require('./pledge.controller');
const router = Router()

router.post("/:uuid",createPledge)
router.patch("/:uuid",updatePledgeStatus)
router.get('/all/:uuid',getPledges)
router.delete('/:uuid',deletePledge)

module.exports = router