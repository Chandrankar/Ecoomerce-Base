import db from "../../utils/db";
import Category from "../../models/Category";

async function getCategories(req,res) {
        console.log('called')
        await db.connect();
        const categories = await Category.find().lean();
        //console.log(categories);
        await db.disconnect()
        res.send(categories);
}

export default getCategories