import db from "../../utils/db";
import Order from "../../models/Order";

async function getRefunds(req,res) {
        await db.connect();
        const cancel = await Order.find({status:"Cancel Request"}).lean();
        const ret = await Order.find({status:"Return Request"}).lean();
        await db.disconnect()
        const orders = cancel.concat(ret)
        res.send(orders);
}

export default getRefunds