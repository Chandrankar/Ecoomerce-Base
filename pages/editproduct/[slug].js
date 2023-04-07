import React,{useContext, useState} from 'react';
import Layout from "../../components/Layout/Layout";
import {useRouter} from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import {Store} from '../../utils/Store';
import db from '../../utils/db';
import Product from '../../models/Product';
import SidebarDashboard from '../../components/Sidebar/sidebarDashboard';
import axios from 'axios';
import {useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import ManageCatagories from '../../components/manageCategories';
import { useEffect } from 'react';

export default function ProductScreen(props) {
  const {push} = useRouter();
    const{handleSubmit, setValue} = useForm();
    const {product} = props
    const[name, setName] = useState(product.name);
    const [category, setCategory] = useState(product.category);
    const [subcategory, setSubCategory] = useState(product.subCategory);
    const [isPublic, setIsPublic] = useState(product.isPublic);
    const [stock,setStock] = useState(product.countInStock);
    const [batch, setBatch] = useState(product.batchSize);
    const [desc , setDesc] = useState(product.description);
    const[price, setPrice] = useState(product.price);
    const [error, setError] = useState('');
    const[ categories, setCategories]=useState([])
    const [subCat, setSubCat]= useState([]);
    const [file, setFile] = useState();
    const id=product._id
    const[imageUrl, setImageUrl] = useState(product.image);
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
            const cat = await axios.get('/api/getCategories')
            setCategories(cat.data)
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
        if(file) {
        const {url} = await fetch("/api/imageUpload").then(res => res.json())
        await fetch(url,{
        method:"PUT",
        headers:{
            "Content-Type":"multipart/form-data"
        },
        body: file
      })
      const  ImageUrl = await url.split('?')[0]
      setImageUrl(ImageUrl)
      }
      const slug= product.slug

      try{
      axios.post("/api/updateproductmongo",{
        id,
        name,
        category,
        subcategory,
        slug,
        price,
        batch,
        stock,
        desc,
        imageUrl,
        isPublic,
      })
    toast.success('Product Added')
    }catch(error){
        console.log(error)
        toast.error('unable to add product')
      }
    }

    const validFileTypes = ['image/jpg','image/jpeg', 'image/png']
    const handleImage = (e)=>{
        setFile(e.target.files[0]);
        // if(!validFileTypes.find(type=> type===file.type )){
        //     setError('File must be Image file');
        //     return;
        // }
        console.log(file)
    }

  return (
    <Layout>
    <div className="flex">
        <SidebarDashboard/>
        <section className="text-gray-600 body-font overflow-hidden w-full">
    <form onSubmit={handleSubmit(submitHandler)}>
  <div className="container px-5 py-24 mx-auto">
    <div className="flex">
        <div className="w-full">
            {!file? (<img alt="default" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={product.image}/>):
            <Image
            src={URL.createObjectURL(file)}
            alt="Picture"
            width={300}
            height={300}
            />
            }
            
            <input id='Image' type="file" onChange={handleImage} className="md:ml-8 p-4"/>
            <div className="flex  p-4">
        <h1 className="text-gray-900 text-xl title-font font-medium mb-1 mx-4">Make Product Public</h1>
        <input id="isPublic" checked={isPublic} type="checkbox"  onChange={(e)=>setIsPublic(!isPublic)} className="ml-4 mt-2 rounded-full"/>
        </div>
        </div>
      <div className="w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <div className="flex justify-between p-4">
        <h1 className="text-gray-900 text-xl title-font font-medium mb-1 mx-4">Enter Product Name</h1>
        <input value={name} type="text" onChange={(e)=>setName(e.target.value)} className="rounded-md"/>
        </div>
        <div className="flex justify-between p-4">
        <h1 className="text-gray-900 text-xl title-font font-medium mb-1 mx-4">Select Product Category</h1>
        <select value={category} onChange={(e)=>getSubCat(e.target.value)}  className="rounded-md mx-2">
                        <option value={''}>-----</option>
                       {categories.map((cate)=>(
                        <option value={cate.name}>
                            {cate.name}
                        </option>
                       ))}
                    </select>
        </div>
        <div className="flex justify-between p-4">
        <h1 className="text-gray-900 text-xl title-font font-medium mb-1 mx-4">Select Sub Category</h1>
        <select id="SubCategory" value={subcategory} onChange={(e)=>setSubCategory(e.target.value)} className="rounded-md mx-2">
                        <option value={''}>-----</option>
                        {   
                         subCat.map((sub)=>(
                                <option value={sub.subName}>{sub.subName}</option>
                         ))
                        }
                    </select>
        </div>

            <div className="flex justify-between h-48 p-4">
            <h1 className="text-gray-900 text-xl title-font font-medium mb-1 mx-4">Enter Product Description</h1>
            <input value={desc} type="textarea" rows="4" cols="50" onChange={(e)=>setDesc(e.target.value)} className="rounded-md border-2"/>
            </div>
          
        <div className="flex justify-between p-4">
        <label className="font-bold text-xl">
          Enter Price ₹</label>
          <input value={price} type="text" onChange={(e)=>setPrice(e.target.value)} className="rounded-md"/>
        </div>
        <div className="flex justify-between p-4">
        
             <label className="font-bold text-xl">Set Lot Size</label>
        
        <input value={batch} type="text" onChange={(e)=>setBatch(e.target.value)} className="rounded-md"/>
        </div>
        <div className="flex justify-between p-4">
      
             <label className="font-bold text-xl">Set Total Qunatity</label>
      
        <input value={stock} type="text" onChange={(e)=>setStock(e.target.value)} className="rounded-md"/>
        </div>
        <button className="flex text-red-700 bg-[#F6DE8D] border-0 py-2 px-6 focus:outline-none hover:bg-amber-400 active:bg-amber-500 rounded">Update Product</button>
      </div>
      <div className="green-100">
        <div className="py-8"></div>
        <div className="p-4"></div>
        <div className="py-4">
            <ManageCatagories tooltip="Add New Category"/>
        </div>
        <div className="py-4">
        <ManageCatagories tooltip="Add New Subcategory"/>
        </div>
        </div>
    </div>
  </div>
  </form>
</section>
    </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
    const { params } = context;
    const { slug } = params;
    await db.connect();
    const product = await Product.findOne({ slug }).lean();
    await db.disconnect();
    console.log(product)
    return {
      props: {
        product: product ? db.convertDocToObj(product) : null,
      },
    };
  }