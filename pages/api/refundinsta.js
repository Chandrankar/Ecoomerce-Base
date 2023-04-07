import { RedoRounded } from '@mui/icons-material';
import axios from 'axios'
const Insta = require('instamojo-nodejs')

const refundinsta =async(req,res)=>{
    Insta.setKeys('test_18cec8e70e1488f022189d8e659', 'test_632952a924338bcf7c1d86d801d')
    Insta.isSandboxMode(true);
    
    var refund = new Insta.RefundRequest();
    refund.payment_id = req.body.id;
    refund.type= 'RFD';
    refund.body= 'Test refund';
    refund.setRefundAmount(req.body.amount);
    Insta.createRefund(refund, function(error, response) {
        console.log(response);
      });
}

export default refundinsta