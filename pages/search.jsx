import { useRouter } from 'next/router';
import React,{useState, useEffect} from 'react';
import db from '../utils/db';
import Layout from '../components/Layout/Layout';
import { XCircleIcon } from '@heroicons/react/24/outline';
import Productitem from '../components/Productitem';
import Product from '../models/Product';
import { toast } from 'react-toastify';
import axios from 'axios';

const PAGE_SIZE = 8;

const prices=[
  {name:'₹1 - ₹500',
value: '1-500'},
{name:'₹501 - ₹2000',
value: '501-2000'},
{name:'₹2001 - ₹5000',
value: '2001-5000'},
]

const search = (props) => {

  useEffect(() => {
    async function getcategories(){
        try{
        const ord = await axios.get('/api/getCategories')
        //console.log(ord.data)
        setCategories(ord.data)
        //categories = cat.data
    }catch(error){
        toast.error('something went wrong')
    }
} getcategories()
}, [])

  const router = useRouter();
  const{
    query='all',
    category='all',
    subCategory='all',
    price='all',
    sort='featured',
    page=1
  } = router.query;

  const{products, countProducts, pages} = props;
  const [categories, setCategories] = useState([]);
  const[ categor, setCategor] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const filterSearch =({
    page,
    category,
    subCategory,
    sort,
    min,
    max,
    searchQuery,
    price
  }) =>{
    const {query}= router;
    if(page) query.page= page;
    if(searchQuery) query.searchQuery= searchQuery;
    if(sort) query.sort= sort;
    if(category) query.category= category;
    if(subCategory) query.subCategory= subCategory;
    if(price) query.price= price;
    if(min) query.min ? query.min: query.min === 0 ? 0: min;
    if(max) query.max ? query.max: query.max === 0 ? 0: max;

    router.push({
      pathname: router.pathname,
      query: query,
    });
  };
  async function getSubCat(name){
    setCategor(name)
    if(name==='' || name=='all') return;
    const sub = await axios.post('/api/getSubCat',{name})
    console.log(sub.data)
    setSubCategories(sub.data)
  }
  
  const categoryHandler=(e)=>{
    getSubCat(e.target.value)

    filterSearch({category: e.target.value});
  };
  const pageHandler=(page)=>{
    filterSearch({page});
  };
  const subCategoryHandler=(e)=>{
    filterSearch({subCategory: e.target.value});
  };
  const sortHandler=(e)=>{
    filterSearch({sort: e.target.value});
  };
  const priceHandler=(e)=>{
    filterSearch({price: e.target.value});
  };
  

  return (
    <Layout title="search">
      <div className=" mt-4 mx-8 md:flex">
        <div className="p-2">
          <div className="my-3">
            <h2>Category</h2>
            <select value={category} onChange={categoryHandler}>
              <option value="all">All</option>
              {categories && categories.map((cat)=>(
                <option value={cat.name} key={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="my-3">
            <h2>Sub Category</h2>
            <select value={subCategory} onChange={subCategoryHandler}>
              <option value="all">All</option>
              {subCategories && subCategories.map((scat)=>(
                <option value={scat.subName} key={scat.subName}>{scat.subName}</option>
              ))}
            </select>
          </div>

          <div className="my-3">
            <h2>Prices</h2>
            <select value={price} onChange={priceHandler}>
              <option value="all">All</option>
              {prices && prices.map((price)=>(
                <option value={price.value} key={price.name}>{price.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="md:w-full">
          <div className="mb-2 flex items-center justify-between border-b-2 pb-2">
            <div className="flex items-center">
              {products.length === 0? 'No': countProducts} Results
                {query!=='all' && query!=='' && ':'+query}
                {category!=='all'  && ':'+category}
                {subCategory!=='all'  && ':'+subCategory}
                {price!=='all' && query!=='' && ':'+price}
                &nbsp;

                {(query!=='all' && query!=='')||
                  category!=='all' ||
                  subCategory!=='all' ||
                  price!=='all' ?(<button onClick={()=>router.push('/search')}>
                    <XCircleIcon className="h-5 w-5"/>
                  </button>): null
                }
            </div>
            <div>
            Sort by{' '}
            <select value={sort} onChange={sortHandler}>
              <option value="featured">Featured</option>
              <option value="lowest">Price: Low to High</option>
              <option value="highest">Price: High to Low</option>
              <option value="newest">Newest Arrival</option>
            </select>
            </div>
          </div>
          <div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {products.map((pro)=>(
            <Productitem
              key={pro._id}
              product={pro}
              className="cols-span-3"            />
          ))}
          </div>
        <ul className="flex">
          {products.length>0 &&
          [...Array(pages).keys()].map((pageNumber)=>(
            <li key={pageNumber}>
              <button className={`default-button m-2 ${page === pageNumber+1 ? 'font-bold':''}`}
                onClick={()=>pageHandler(pageNumber+1)}>
                  {pageNumber + 1}
              </button>
            </li>
          ))
          }
        </ul>
        </div>
        </div>
        
      </div>
    </Layout>
  )
}
export async function getServerSideProps({query}){
  const pageSize= query.pageSize || PAGE_SIZE;
  const page= query.page || 1;
  const category= query.category || '';
  const subCategory= query.subCategory || '';
  const price= query.price || '';
  const sort= query.sort || '';
  const searchQuery= query.searchQuery || '';
  
  const queryFilter =
    searchQuery && searchQuery!=='all' ?{
      name:{
        $regex: searchQuery,
        $options: 'i',
      },
    }:{};
    const categoryFilter = category && category!=='all'? {category}: {};
    const subCategoryFilter = subCategory && subCategory!=='all' ?{subCategory}:{};
    const priceFilter =
      price && price!=='all' ? {
        price:{
          $gte: Number(price.split('-')[0]),
          $lte: Number(price.split('-')[1]),
        },
      }:{};

      const order=
      sort ==='featured'?
      {featured: -1}
      :sort==='lowest'?
      {price: 1}
      :sort ==='highest'?
      {price: -1}
      :sort === 'newest'?
      {createdAt: -1}: {_id: -1};

      await db.connect();
      const productDocs = await Product.find(
        {
          ...queryFilter,
          ...categoryFilter,
          ...priceFilter,
          ...subCategoryFilter,
        },
      ).sort(order)
      .skip(pageSize * (page-1))
      .limit(pageSize)
      .lean();

      const countProducts = await Product.countDocuments(
        {
          ...queryFilter,
          ...categoryFilter,
          ...priceFilter,
          ...subCategoryFilter,
        },
      );

      await db.disconnect();
      const products = productDocs.map(db.convertDocToObj);

      return{
        props:{
          products,
          countProducts,
          page,
          pages: Math.ceil(countProducts/ pageSize),
        },
      };
}

export default search