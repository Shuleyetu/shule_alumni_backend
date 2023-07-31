const express = require('express')
const bodyParser = require("body-parser");
const UserRoutes = require("./modules/user/user.routes")
const SchoolRoutes = require("./modules/school/school.routes")
const SchoolEventRoutes = require("./modules/school_event/school_event.routes")
const SchoolNewsRoutes = require("./modules/school_news/school_news.routes")
const GeneralNewsRoutes = require("./modules/general_news/general_news.routes")
const ProjectRoutes = require("./modules/project/project.routes")
const PledgeRoutes = require("./modules/pledge/pledge.routes")
const ContributionRoutes = require("./modules/contribution/contribution.routes")
const JobRoutes = require("./modules/school_job/job.routes")
const MemoriumRoutes = require("./modules/school_memorium/memorium.routes")
const TransactionRoutes = require("./modules/transaction/transaction_routes")
const MessageRoutes = require("./modules/message/message.routes")

const cors = require('cors')
const app = express()
app.use(cors());
app.use(express.json());
app.use(express.static("files"));
app.use(bodyParser.text({ type: "/" }));


app.use("/user",UserRoutes)
app.use("/pledge",UserRoutes)
app.use("/school",SchoolRoutes)
app.use("/schoolEvent",SchoolEventRoutes)
app.use("/schoolNews",SchoolNewsRoutes)
app.use("/generalNews",GeneralNewsRoutes)
app.use("/project",ProjectRoutes)
app.use("/pledge",PledgeRoutes)
app.use("/contribution",ContributionRoutes)
app.use("/job",JobRoutes)
app.use("/memorium",MemoriumRoutes)
app.use("/transaction",TransactionRoutes)
app.use("/message",MessageRoutes)



app.get('/',(req,res)=>{
    res.send("It is running well")
})

app.listen(5000,()=>{
  console.log("Server started at port 5000")
})