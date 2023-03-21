import React,{useEffect, useState} from 'react';
import Layout from '../components/Layout/Layout'
import SidebarDashboard from '../components/Sidebar/sidebarDashboard';
import axios from 'axios';
import {useForm} from 'react-hook-form';
import {toast} from 'react-toastify';


const addproduct = () => {

    const{handleSubmit, setValue} = useForm();

    const[name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [subcategory, setSubCategory] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [stock,setStock] = useState(0);
    const [batch, setBatch] = useState(1);
    const [desc , setDesc] = useState('');
    const[price, setPrice] = useState(0);
    const [error, setError] = useState('');
    const[ categories, setCategories]=useState([])
    const [subCategories, setSubCategories]= useState([])
    
    let file;
    useEffect(() => {
        async function getcategories(){
            try{
            const cat = await axios.get('/api/getCategories')
            setCategories(cat.data)
            //categories = cat.data
        }catch(error){
            toast.error('something went wrong')
        }
    } getcategories()
    }, [name])
    

    const createslug =(name)=>{
        let slug = "p"+"-"+ name.split(" ")[0]+"-"+name.split(" ")[1];
        return slug
    }
    async function submitHandler(){
        if(!file){
            alert('no image')
            return;
        }
        console.log('called')
        const {url} = await fetch("/api/imageUpload").then(res => res.json())
        
        await fetch(url,{
        method:"PUT",
        headers:{
            "Content-Type":"multipart/form-data"
        },
        body: file
      })

      const  ImageUrl = await url.split('?')[0]
      const slug = createslug(name)
      try{
      axios.post("/api/addproducttomongo",{
        name,
        category,
        slug,
        price,
        batch,
        stock,
        desc,
        ImageUrl,
        isPublic,
      })
    toast.success('Product Added')
    }catch(error){
        toast.error('unable to add product')
      }
    }

    const validFileTypes = ['image/jpg','image/jpeg', 'image/png']
    const handleImage = (e)=>{
        file = e.target.files[0];
        if(!validFileTypes.find(type=> type===file.type )){
            setError('File must be Image file');
            return;
        }
        console.log(file)
    }
  return (
    <Layout>
    <div className="flex">
        <SidebarDashboard/>
        <form onSubmit={handleSubmit(submitHandler)}
            className="mt-10 md:w-full"
        >
            <div className="p-2">
                <div className="flex justify-between">
                    <label className="text-red-primary ml-4">Name</label>
                    <input value={name} type="text" onChange={(e)=>setName(e.target.value)} className="rounded-md"/>
                </div>
            </div>
            <div className="p-2">
                <div className="flex justify-between">
                    <label className="text-red-primary ml-4">Category</label>
                    <select value={category} onChange={(e)=>setCategory(e.target.value)} className="rounded-md">
                        <option value={''}>-----</option>
                       {categories.map((cat)=>(
                        <option value={cat.name}>
                            {cat.name}
                        </option>
                       ))}
                    </select>
                </div>
            </div>
            <div className="p-2">
                <div className="flex justify-between">
                    <label className="text-red-primary ml-4">Sub Category</label>
                    <select id="SubCategory" value={subcategory} onChange={(e)=>setSubCategory(e.target.value)} className="rounded-md">
                        <option value={''}>-----</option>
                        {   
                         categories.map((cat)=>(
                            cat.subCategory.map(((sub)=>(
                                <option value={sub.subName}>{sub.subName}</option>
                            )))
                         ))
                        }
                    </select>
                </div>
            </div>
            <div>{category}</div>
            <div className="p-2">
                <div className="flex justify-between">
                    <label className="text-red-primary ml-4">Stock</label>
                    <input id="Stock" type="text" onChange={(e)=>setStock(e.target.value)} className="rounded-md"/>
                </div>
            </div>
            <div className="p-2">
                <div className="flex justify-between">
                    <label className="text-red-primary ml-4">Batch Size</label>
                    <input id="Batch_Size" onChange={(e)=>setBatch(e.target.value)} type="text" className="rounded-md"/>
                </div>
            </div>
            <div className="p-2">
                <div className="flex justify-between">
                    <label className="text-red-primary ml-4">Price</label>
                    <input id="Price" onChange={(e)=>setPrice(e.target.value)} type="text" className="rounded-md"/>
                </div>
            </div>
            <div className='p-2'>
                <div className="flex justify-between">
                    <label className="text-red-primary ml-4">Description</label>
                    <input id="Description" onChange={(e)=>setDesc(e.target.value)} type="text" className="rounded-md"/>
                </div>
            </div>
            <div className="p-2">
                <div>
                    <label className="text-red-primary ml-4">Public Listing</label>
                    <input id="isPublic" type="checkbox"  onChange={(e)=>setIsPublic(!isPublic)} className="ml-4 rounded-full"/>
                </div>
            </div>
            <div className="p-2">
                <div>
                    <label className="text-red-primary ml-4">Image</label>
                    <input id='Image' type="file" onChange={handleImage} className="ml-8"/>
                    {error &&<h1>{error}</h1>}
                </div>
            </div>
            <div className="p-2 ml-4">
                <button  className='primary-button'>Add Product</button>
            </div>
        </form>
    </div>
    </Layout>
  )
}



export default addproduct