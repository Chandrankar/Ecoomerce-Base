import Order from '../../../models/Order';
import db from '../../../utils/db';

const handler = async (req, res) => {
  await db.connect();
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
    res.status(201).send(order);
    console.log('works')
  }
  else{
    console.log(req.body.user)
    const sid = req.body.user.sid
    const newOrder = new Order({
      ...req.body,
      user_id: sid,
      isPaid: true,
      paymentId: req.body.pay_id
    });
    const order = await newOrder.save();
    res.status(201).send(order);
  }
  



};
export default handler;