import React,{useState, useEffect} from 'react';
import Layout from '../components/Layout/Layout';
import SidebarDashboard from '../components/Sidebar/sidebarDashboard';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import { TextInput } from 'flowbite-react';

const manageCatagories = () => {
  const [cat,setCat]= useState([]);
  const [newCat, setNewCat] = useState(true);
  const [category, setCategory]=useState('');
  const [subCat, setSubCat]= useState([]);
  const [subcategory, setsubCategory]=useState('');
  const [newSub, setNewSub] = useState(true);

  const addnewCat =async()=>{
      const newc = await axios.post('/api/createNewCategory',{
      category,
      subcategory
    })
  }
  const addnewSubcategory =async()=>{
    const news = await axios.post('/api/addnewSubcategory',{
    category,
    subcategory
  })
}

const removeSubc = async()=>{
  const rmvs = await axios.post('/api/removeSubcat',{
    category,
    subcategory
  })
}

  async function getSubCat(name){
    setCategory(name)
    if(name==='') return;
    const sub = await axios.post('/api/getSubCat',{name})
    console.log(sub.data)
    setSubCat(sub.data)
  }
  useEffect(() => {
    async function getcategories(){
        try{
        const ord = await axios.get('/api/getCategories')
        console.log(ord.data)
        setCat(ord.data)
        //categories = cat.data
    }catch(error){
        toast.error('something went wrong')
    }
} getcategories()
}, [])
  

  const{handleSubmit} = useForm();
  const submitHandler =()=>{
    
  }
  return (
    <Layout>
      <div className="flex">
      <SidebarDashboard/>
      <form onSubmit={handleSubmit(submitHandler)}
            className="mt-10 sm:md-1/2 md:w-3/4 mx-4 pt-4"
        >
         <div className="flex justify-between">
          <label htmlFor="categories">Categories</label>
          <select value={category} onChange={(e)=>getSubCat(e.target.value)}  className="rounded-md mx-2">
                        <option value={''}>-----</option>
                       {cat.map((cate)=>(
                        <option value={cate.name}>
                            {cate.name}
                        </option>
                       ))}
                    </select>
              <div className="flex"><label className="mx-2"> Add new</label>
              <input type="checkbox" className="rounded-full mt-1"  onClick={()=>setNewCat(!newCat)}/></div>
              <TextInput
                onChange={(e)=>setCategory(e.target.value)}
                disabled= {newCat}
              />
         </div>
         {category!=='' && newCat && <div className="pt-4 flex justify-between">
          <label>Sub Categories</label>
          <select value={subcategory} onChange={(e)=>setsubCategory(e.target.value)}  className="rounded-md mx-2">
                        <option value={''}>-----</option>
                       {subCat.map((sub)=>(
                        <option value={sub.subName}>
                            {sub.subName}
                        </option>
                       ))}
                    </select>
              <div className="flex ">
                <label className="mx-2">Add new</label>
                <input type="checkbox" className="rounded-full mt-1 mx-2"  onClick={()=>setNewSub(!newSub)}/>
                <TextInput
                onChange={(e)=>setsubCategory(e.target.value)}
                disabled= {newSub}
              />
              
              </div>
              {newSub && newCat && subCat!=='' && <button className="primary-button" onClick={()=>removeSubc()}>Delete Sub Category</button>}
         </div>}
         {!newSub && <button className="primary-button" onClick={()=> addnewSubcategory()}>Add new Sub Category</button>}
         {!newCat && <div className="mt-4 p-4">
            <label className="mx-2">Add new Category</label>
            <input className="mx-2 rounded-md" type="text" onChange={(e)=>setsubCategory(e.target.value)}/>
            <button className="primary-button mx-2"  onClick={()=>addnewCat()}>Add new Category</button>
          </div>}
        </form>
        </div>
    </Layout>
  )
}

export default manageCatagories