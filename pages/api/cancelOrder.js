import Order from '../../models/Order';
import db from '../../utils/db'
const cancelOrder = async (req,res) => {
    console.log(req.body)
    await db.connect()
    var query ={_id: req.body.id}
    const options = {upsert: true};
    var newValues;
    if(req.body.action=='Cancel') {newValues ={$set:{status:"Cancel Request"}}}
    if(req.body.action=='Return') {newValues ={$set:{status: "Return Request"}}}
    
    console.log(newValues)
  
    const result = await Order.updateOne(query, newValues, options)
    res.status(201)
}

export default cancelOrder