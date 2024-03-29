import db from "../../utils/db";
import User from "../../models/User";
import data from "../../utils/data";
import Product from '../../models/Product';
import Order from "../../models/Order";
import Category from "../../models/Category";

const handler = async(req,res)=>{
    await db.connect();
    await User.deleteMany();
    //await User.insertMany(data.users);
    //await Product.deleteMany();
    //await Product.insertMany(data.products)
    await Order.deleteMany();
    await Category.insertMany(data.category);
    await db.disconnect();
    res.send({message: 'seeded successfully'});
}
export default handler;