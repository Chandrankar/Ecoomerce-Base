import db from '../../utils/db';
import Product from '../../models/Product';

const addProduct = async(req,res) =>{
    console.log(req.body)
    var MyPro ={name: req.body.name,
                slug: req.body.slug,
                category: req.body.category,
                image: req.body.ImageUrl,
                price: req.body.price,
                batchSize: req.body.batch,
                countInStock: req.body.stock,
                description: req.body.desc,
                isPublic: req.body.isPublic
    }
    await db.connect();
    await Product.create(MyPro)
    await db.disconnect();
    res.status(200);
}
export default addProduct