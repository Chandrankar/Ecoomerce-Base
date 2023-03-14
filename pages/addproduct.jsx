import React,{useState} from 'react';
import Layout from '../components/Layout/Layout'
import SidebarDashboard from '../components/Sidebar/sidebarDashboard';
import axios from 'axios';
import {useForm} from 'react-hook-form';


const addproduct = () => {

    const{handleSubmit, setValue} = useForm();

    const[name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [stock,setStock] = useState(0);
    const [batch, setBatch] = useState(1);
    const [desc , setDesc] = useState('');
    const[price, setPrice] = useState(0);
    const [error, setError] = useState('');

    let file;

    const createslug =(name)=>{
        let slug = "p"+"-"+ name.split(" ")[0]+"-"+name.split(" ")[1];
        return slug
    }
    async function s3Image(){
        
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
                    <input id="Category" type="text" onChange={(e)=>setCategory(e.target.value)} className="rounded-md"/>
                </div>
            </div>
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