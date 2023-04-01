import db from "../../utils/db";
import Order from "../../models/Order";

async function getOrders(req,res) {
        await db.connect();
        const orders = await Order.find().lean();
        await db.disconnect()
        res.send(orders);
}

export default getOrders