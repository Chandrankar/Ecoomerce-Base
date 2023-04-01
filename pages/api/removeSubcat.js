import db from "../../utils/db";
import Category from '../../models/Category';

const removeSubcat = async(req,res) => {
    console.log(req.body)
  await db.connect();
  const cat = await Category.find({name: req.body.category}).lean();
  let subc = cat[0].subCategory
 
  for(let i=0; i<subc.length;i++){
    if(subc[i].subName == req.body.subcategory){
        subc.splice(i,1) 
  }}
  
  var query ={name: req.body.category}
  const options = {upsert: true};
  var newValues ={$set:{subCategory:[...subc]}}
  
  const result = await Category.updateOne(query, newValues, options)
  res.status(201).send(result);
}

export default removeSubcat