const Insta = require('instamojo-nodejs')

const refundinsta =async(req,res)=>{
    Insta.setKeys('test_18cec8e70e1488f022189d8e659', 'test_632952a924338bcf7c1d86d801d')
    Insta.isSandboxMode(true);
    
    var refund = new Insta.RefundRequest();
    refund.payment_id = 'MOJO3405H05A81625655';
    refund.type= 'RFD';
    refund.body= 'Test refund'; 
    refund.setRefundAmount(100);
    Insta.createRefund(refund, function(error, response) {
        console.log(response);
      });
}

export default refundinsta