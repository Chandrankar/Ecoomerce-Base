import db from '../../utils/db';
import Product from '../../models/Product';

const updateproductmongo = async (req,res) => {
    console.log(req.body)
    await db.connect()
    
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
const options = {upsert: true};
var query ={_id: req.body.id}
var newvalues ={$set:MyPro}
const result = await Product.updateOne(query, newvalues, options)
console.log(result)
}

export default updateproductmongo