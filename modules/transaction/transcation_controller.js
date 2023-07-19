const { errorResponse, successResponse } = require("../../utils/responses")
const {Transaction,Pledge,User,Project} = require("../../models");

const transactionRequest =  async (req,res)=>{
    try {
        const user_uuid = req.params.uuid;
        const {pledge_uuid} = req.body;
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
        const response = await got.post("https://api.flutterwave.com/v3/payments", {
            headers: {
                Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`
            },
            json: {
                tx_ref: "hooli-tx-1920bbtytty",
                amount: pledge.amount,
                currency: "TZS",
                redirect_url: `https://shulealumni.com/dashboard/projects/details/${project.uuid}`,
                customer: {
                    userId:user_uuid,
                    pledgeId:pledge_uuid,
                    email: user.email,
                    phone_number: user.phone,
                    name: user.name
                },
                customizations: {
                    title: "Shule Alumni",
                    logo: "http://www.piedpiper.com/app/themes/joystick-v27/images/logo.png"
                }
            }
        }).json();
    } catch (error) {
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
            pledgeId = pledge.id;
        }

        // Extract relevant payment data from the payload
        const data = {
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

const getAllTransactionHistory = async(req,res)=>{
    try {
        const data = await Transaction.findAll()
        successResponse(res,data)
    } catch (error) {
       errorResponse(res,error)
    }
}


module.exports = {
    recordWebhookData,getAllTransactionHistory
}