import{useUser} from '@auth0/nextjs-auth0/client'
import Order from '../../../models/Order';
import db from '../../../utils/db';

const handler = async (req, res) => {
  const {user}=useUser()
  if (!user) {
    return res.status(401).send('signin required');
  }

  await db.connect();
  const newOrder = new Order({
    ...req.body,
    user.name: user.name,
  });

  const order = await newOrder.save();
  res.status(201).send(order);
};
export default handler;