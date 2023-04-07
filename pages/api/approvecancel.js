import Order from '../../models/Order';
import db from '../../utils/db'
import axios from 'axios'
const approvecancel = async (req,res) => {
    console.log(req.body)
    await db.connect()
    var query ={_id: req.body.orderId}
    const options = {upsert: true};
    var newValues;
    if(req.body.status=='Cancel') {newValues ={$set:{status:"Cancelled"}}}
    if(req.body.status=='Return') {newValues ={$set:{status: "Return"}}}
    
    console.log(newValues)
  
    const result = await Order.updateOne(query, newValues, options)
    const ref = await Order.findOne({_id: req.body.orderId})
    const refund = axios.post('http://localhost:3000/api/refundinsta',{
        id:ref.paymentId,
        amount: ref.totalPrice
     })
    res.status(201)
}

export default approvecancel