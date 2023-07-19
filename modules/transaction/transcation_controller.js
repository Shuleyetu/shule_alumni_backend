const { errorResponse, successResponse } = require("../../utils/responses")
const {Transaction,Pledge,User,Project} = require("../../models");
const { v4: uuidv4 } = require('uuid');
const { default: axios } = require("axios");
const CircularJSON = require('circular-json');

const transactionRequest =  async (req,res)=>{
    
    try {
        const uniqueKey = uuidv4();
        const pledge_uuid = req.params.uuid;
        const {user_uuid} = req.body;
        const user = await User.findOne({
            where:{
                uuid:user_uuid
            }
        })
        const pledge = await Pledge.findOne({
            where:{
                uuid:pledge_uuid
            }
        })
        const project = await Project.findOne({
            where:{
                id:pledge.projectId
            }
        })
        const response = await axios.post("https://api.flutterwave.com/v3/payments", {
            tx_ref: uniqueKey,
            amount: pledge.amount,
            currency: "TZS",
            redirect_url: `https://shulealumni.com/dashboard/projects/details/${project.uuid}`,
            customer: {
                email: user.email,
                phoneNumber: user.phone,
                user_uuid:user.uuid,
                pledge_uuid:pledge.uuid,
                name: user.name
            },
            customizations: {
                title: "Shule Alumni",
                logo: "https://shulealumni.com/logo.svg"
            }
        }, {
            headers: {
                Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`
            }
        }).catch((error) => {
            errorResponse(res, error);
          });

          // ...
    const circularSafeData = CircularJSON.stringify(response);
    const jsonResponse = JSON.parse(circularSafeData);
    const data = jsonResponse.data;
    successResponse(res,data)
    } catch (error) {
        console.error(error)
        errorResponse(res,error)
        
    }
}
const recordWebhookData = async (req, res) => {
    try {
        const secretHash = process.env.FLW_SECRET_HASH;
        const signature = req.headers["verif-hash"];
       
        // Verify the request's signature with the secret hash
        if (!signature || (signature !== secretHash)) {
            res.status(401).end();
            return;
        }

        let userId = null;
        let pledgeId = null;
        const payload = req.body.data;

        // If the payload contains user UUID, find the user based on the UUID
        if (payload.customer.user_uuid) {
            const user = await User.findOne({
                where: {
                    uuid: payload.customer.user_uuid
                }
            });
            userId = user.id;
        }

        // If the payload contains pledge UUID, find the pledge based on the UUID
        if (payload.customer.pledge_uuid) {
            const pledge = await Pledge.findOne({
                where: {
                    uuid: payload.customer.pledge_uuid
                }
            });
           await pledge.update({
                paid:true
            })
            pledgeId = pledge.id;
        }

        // Extract relevant payment data from the payload
        const data = {
            uuid:payload.tx_ref,
            amount: payload.amount,
            currency: payload.currency,
            status: payload.status,
            payment_type: payload.payment_type,
            customer_name: payload.customer.name,
            customer_phone: payload.customer.phone_number,
            customer_email: payload.customer.email,
            userId,
            pledgeId
        };

        // Create a transaction record in the database with the extracted data
        await Transaction.create({
            ...data
        });


        successResponse(res, data);
    } catch (error) {
        errorResponse(res, error);
    }
};
const getAllProjectTransactions = async(req,res)=>{
    try {
        const uuid = req.params.uuid
        const project = await Project.findOne({
            where:{
                uuid
            }
        })
        const transactions = await Transaction.findAll({
            include: [
              {
                model: Pledge,
                where: {
                  projectId: project.id, // Filter pledges based on the project ID
                },
                include: [
                  {
                    model: Project, // Include the Project model to access its properties
                  },
                ],
              },
            ],
          });
          successResponse(res,transactions)
          
    } catch (error) {
        errorResponse(res,error)
    }
}
const getAllTransactionHistory = async(req,res)=>{
    try {
        const data = await Transaction.findAll()
        successResponse(res,data)
    } catch (error) {
       errorResponse(res,error)
    }
}


module.exports = {
    recordWebhookData,getAllTransactionHistory,transactionRequest,getAllProjectTransactions
}