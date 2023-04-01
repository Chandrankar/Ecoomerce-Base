import db from "../../utils/db";
import Category from "../../models/Category";

async function getSubCat(req,res) {
        await db.connect();
        const categories = await Category.find({name : req.body.name}).limit(1).lean();
        console.log('testing',categories[0].subCategory)
        await db.disconnect()
        res.send(categories[0].subCategory);
}

export default getSubCat