const {Router} = require("express")

const router = Router()
const upload = require("../../utils/upload");
const { registerUser, getAllUsers, loginUser, getSchoolAlumni, getHeadmasters, deleteUser, updateUser, alumniCount, getHash, alumniCountPerSchool } = require("./user.controller");
const { totalResources } = require("../general_news/general_news.controller");

router.post("/register",upload.single('file'), registerUser)
router.patch("/:uuid",upload.single('file'),updateUser)

router.delete("/:uuid",deleteUser)

router.post("/login",loginUser)
router.get("/",getAllUsers)
router.get("/hash",getHash)

router.get("/count",alumniCount)
router.get("/count/:uuid",alumniCountPerSchool)
router.get("/resources",totalResources)
router.get("/headmasters",getHeadmasters)
router.get("/alumni/:uuid",getSchoolAlumni)

module.exports = router


