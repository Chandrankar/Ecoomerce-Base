import Order from '../../../models/Order';
import db from '../../../utils/db';
import axios from 'axios'

const handler = async (req, res) => {
  await db.connect();
  const ph= req.body.shippingAddress.phone;
  console.log(req.body.user)
  if(req.body.user == undefined)
  {
    console.log(req.body)
    const newOrder = new Order({
      ...req.body,
      isPaid: true,
      paymentId: req.body.pay_id
    });
    const order = await newOrder.save();
    const amount = order.totalPrice;
    const id= order._id
    const msg= `Your order from Gouri Puja is Confirmed. Of order amount  ${amount}  Please note Order Id for future reference ${id}`
    const sms= await axios.post('http://localhost:3000/api/smssender',{
      phone: ph,
      message: msg
    })
    res.status(201).send(order);
  }
  else{
    console.log(req.body.pay_id)
    const sid = req.body.user.sid
    const newOrder = new Order({
      ...req.body,
      user_id: sid,
      isPaid: true,
      paymentId: req.body.pay_id
    });
    const order = await newOrder.save();
    const amount = order.totalPrice;
    const id= order._id
    const msg= `Your order from Gouri Puja is Confirmed. Of order amount  ${amount}  Please note Order Id for future reference ${id}`
    const sms= await axios.post('http://localhost:3000/api/smssender',{
      phone: ph,
      message: msg
    })
    res.status(201).send(order);
  }
  



};
export default handler;