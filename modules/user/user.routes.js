const {Router} = require("express")

const router = Router()
const upload = require("../../utils/upload");
const { registerUser, getAllUsers, loginUser, getSchoolAlumni, getHeadmasters, deleteUser, updateUser, alumniCount, getHash, alumniCountPerSchool, sendMail, sendEmail, pushSMS, getAllAlumni, sendPasswordLink, passwordReset, sendMessage, addGallery, deleteGallery, getUserFullInformation } = require("./user.controller");
const { totalResources } = require("../general_news/general_news.controller");
router.post("/register",upload.single('file'), registerUser)
router.post("/message",sendMessage)
router.post("/sms",pushSMS)
router.post("/reset-password",sendPasswordLink)
router.patch("/password/:uuid",passwordReset)
router.patch("/:uuid",upload.single('file'),updateUser)
router.post("/gallery/:uuid",upload.single('file'),addGallery)
router.delete("/gallery/:uuid",deleteGallery)
router.delete("/gallery/:uuid",deleteGallery)
router.delete("/:uuid",deleteUser)
router.post("/login",loginUser)
router.get("/",getAllUsers)
router.get("/alumni",getAllAlumni)
router.get("/hash",getHash)
router.get("/count",alumniCount)
router.get("/count/:uuid",alumniCountPerSchool)
router.get("/resources",totalResources)
router.get("/headmasters",getHeadmasters)
router.get("/alumni/:uuid",getSchoolAlumni)
router.get("/:uuid",getUserFullInformation)


module.exports = router


