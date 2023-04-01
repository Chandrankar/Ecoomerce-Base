import db from "../../utils/db";
import Category from '../../models/Category';

const addnewSubcategory = async(req,res) => {
    console.log(req.body)
  await db.connect();
  const cat = await Category.find({name: req.body.category}).lean();
  var query ={name: req.body.category}
  const options = {upsert: true};
  var newValues ={$set:{subCategory:[...cat[0].subCategory, {subName:req.body.subcategory}]}}
  console.log(newValues)
  
  const result = await Category.updateOne(query, newValues, options)
  res.status(201).send(result);
}

export default addnewSubcategory