const {Router} = require('express')
const upload = require("../../utils/upload");
const { createPledge, getPledges, deletePledge, updatePledgeStatus, updatePledge } = require('./pledge.controller');
const router = Router()

router.post("/:uuid",createPledge)
router.patch("/:uuid",updatePledgeStatus)
router.patch("/amount/:uuid",updatePledge)
router.get('/all/:uuid',getPledges)
router.delete('/:uuid',deletePledge)

module.exports = router