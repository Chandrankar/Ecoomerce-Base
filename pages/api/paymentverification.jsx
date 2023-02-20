import crypto from 'crypto';

export const paymentverification = (req,res)=>{
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;

    const body= razorpay_order_id + "|" + razorpay_payment_id;

   
    var expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
                                    .update(body.toString())
                                    .digest('hex');
    
    const isAuthentic = expectedSignature === razorpay_signature;

    if(isAuthentic){
        //Save in database

        res.redirect("http://localhost:3000/")
    }
    else{
        res.status(400).json({
            success:false})
    }

    
}
export default paymentverification