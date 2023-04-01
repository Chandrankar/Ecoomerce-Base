import db from "../../utils/db";
import Category from '../../models/Category';

const createNewCategory = async(req,res) => {
    console.log(req.body)
  await db.connect();
  const newCategory = new Category({
    name: req.body.category,
    subCategory:[{
        subName: req.body.subcategory
    }]
}
  )
  const cat= newCategory.save()
  res.status(201).send(cat);
}

export default createNewCategory