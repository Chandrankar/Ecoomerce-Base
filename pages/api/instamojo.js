const Insta = require('instamojo-nodejs')

const instamojo=async(req,res)=>{
    Insta.setKeys('test_18cec8e70e1488f022189d8e659', 'test_632952a924338bcf7c1d86d801d')
    var data = new Insta.PaymentData();
    Insta.isSandboxMode(true);
    data.purpose = req.body.purpose;
    data.amount = req.body.amount;
    data.buyer_name = req.body.buyer_name;
    data.redirect_url = req.body.redirect_url;
    data.email = req.body.email;
    data.phone = req.body.phone;
    data.send_email = false;
    data.webhook = 'http://www.example.com/webhook/';
    data.allowed_repeated_payments = false ;

    Insta.createPayment(data, function(error, response){
        if(error){}
        else{
            //console.log(response)
            const responseData= JSON.parse(response);
            const redirectUrl= responseData.payment_request.longurl;
            res.status(200).json(redirectUrl)
        }
    })
}

export default instamojo