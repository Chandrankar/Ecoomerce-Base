import React,{useState, useEffect, Fragment,useRef} from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import { Button, TextInput, Tooltip } from 'flowbite-react';
import { Dialog, Transition } from '@headlessui/react'
import AddIcon from '@mui/icons-material/Add';

const ManageCatagories = ({tooltip}) => {
  const [cat,setCat]= useState([]);
  const [newCat, setNewCat] = useState(true);
  const [category, setCategory]=useState('');
  const [subCat, setSubCat]= useState([]);
  const [subcategory, setsubCategory]=useState('');
  const [newSub, setNewSub] = useState(true);
  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)

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
   <>
   <Tooltip className="bg-black "
            content={tooltip}
              arrow={false}>
                <Button className="rounded-full border-1" onClick={()=>setOpen(!open)}>
                    <AddIcon className="text-black"/>
                      </Button>
                </Tooltip>
    <Transition.Root show={open} as={Fragment}>
    <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </Transition.Child>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Add and Remove Categories
                    </Dialog.Title>
                    <div className="mt-2">
                    <form onSubmit={handleSubmit(submitHandler)} className="mt-10 pt-4 ">
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
              <input type="checkbox" className="rounded-full mt-2"  onClick={()=>setNewCat(!newCat)}/></div>
              <TextInput
                onChange={(e)=>setCategory(e.target.value)}
                disabled= {newCat}
                className="ml-2"
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
              
         </div>}
         
         {!newCat && <div className="mt-4 p-4">
            <label className="mx-2">Add Sub Category</label>
            <input className="mx-2 rounded-md" type="text" onChange={(e)=>setsubCategory(e.target.value)}/>
          </div>}
        </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              {!newSub && <button className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" onClick={()=> addnewSubcategory()}>Add new Sub Category</button>}
              {newSub && newCat && subCat!=='' && <button className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" onClick={()=>removeSubc()}>Delete Sub Category</button>}
              {!newCat && <button className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"  onClick={()=>addnewCat()}>Add new Category</button>}
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition.Root>
  </>
  )
}

export default ManageCatagories