const { errorResponse, successResponse } = require("../../utils/responses")
const {Transaction,Pledge,User} = require("../../models");

const getHash = async (req,res)=>{
    try {
        const secretHash = process.env.FLW_SECRET_HASH;
        res.send(secretHash)
    } catch (error) {
        
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
            card_first_6digits: payload.card.first_6digits,
			card_last_4digits: payload.card.last_4digits,
            userId,
            pledgeId
        };

        // Send the extracted data as the response
     

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
    getHash,recordWebhookData,getAllTransactionHistory
}