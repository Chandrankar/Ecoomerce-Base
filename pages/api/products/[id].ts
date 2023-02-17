import db from '../../../utils/db';
import Product from '../../../models/Product';

const handler = async(req:any,res:any) => {
    await db.connect();
    const product = await Product.findById(req.query.id);
    await db.disconnect();
    res.send(product);
    console.log(product);
}

export default handler