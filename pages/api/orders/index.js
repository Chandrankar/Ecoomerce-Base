import Order from '../../../models/Order';
import db from '../../../utils/db';

const handler = async (req, res) => {
  await db.connect();
  if(req.body.user == undefined)
  {
    console.log(req.body)
    const newOrder = new Order({
      ...req.body,
      isPaid: true,
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
      isPaid: true
    });
    const order = await newOrder.save();
    res.status(201).send(order);
  }
  



};
export default handler;