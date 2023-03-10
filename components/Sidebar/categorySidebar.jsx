import React,{useState,Fragment} from 'react';
import ReorderIcon from '@mui/icons-material/Reorder';
import {Dialog, Transition} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const CategorySidebar = () => {
    const[currentTab, setCurrentTab] = useState('');
    const[open, setOpen] = useState(false);
    const[tabopen, setTabopen] = useState(false);

    const Categories = [
        {title: "Saree" , subTab:true, 
            subItems:[
                {title:"category 1"},
                {title:"category 2"},
                {title:"category 3"},
                {title:"View All"}
            ]
        },
        {title: "Kurti" , subTab:true, 
        subItems:[
            {title:"category 1"},
            {title:"category 2"},
            {title:"category 3"},
            {title:"View All"}
        ]
    },
    {title: "Kurta Set" , subTab:true, 
    subItems:[
        {title:"category 1"},
        {title:"category 2"},
        {title:"category 3"},
        {title:"View All"}
    ]
},
{title: "Gown" , subTab:true, 
subItems:[
    {title:"category 1"},
    {title:"category 2"},
    {title:"category 3"},
    {title:"View All"}
]
},
{title: "Shirt" , subTab:true, 
subItems:[
    {title:"category 1"},
    {title:"category 2"},
    {title:"category 3"},
    {title:"View All"}
]
},
{title: "Fabrics" , subTab:true, 
subItems:[
    {title:"category 1"},
    {title:"category 2"},
    {title:"category 3"},
    {title:"View All"}
]
},
{title: "Trending Collections" , subTab:true, 
subItems:[
    {title:"category 1"},
    {title:"category 2"},
    {title:"category 3"},
    {title:"View All"}
]
},
    ]

    const TabManager =(NewTab)=>{
        if(NewTab === currentTab){
            setTabopen(!tabopen)
        }
        else if(tabopen == true){
            setCurrentTab(NewTab)
        }
        else{
            setCurrentTab(NewTab);
            setTabopen(!tabopen);
        }
    }

  return (
    <>
    <button onClick={()=>setOpen(!open)}><ReorderIcon/></button>
   <Transition.Root show={open} as={Fragment}>
    <Dialog as="div" className="relative z-40" onClose={setOpen}>
        <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className="fixed inset-0 bg-white transition-opacity"/>
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                    <Transition.Child
                        as={Fragment}
                        enter="transform transition ease-in-out duration-500 sm:duration-700"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transform transition ease-in-out duration-500 sm:duration-700"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                    >
                        <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                            <div className="flex h-full flex-col overflow-y-scroll bg-red-primary shadow-xl">
                                <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <Dialog.Title className="font-medium text-gold-primary text-xl">Categories</Dialog.Title>
                                            <div className="ml-3 flex h-7 items-center">
                                                <button type="button" className="-m-2 p-2 text-gray-400 hover:text-gray-500"    onClick={() => setOpen(false)}>
                                                    <span className="sr-only">Close panel</span>
                                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mt-8">
                                            <div className="flow-root">
                                                <ul className="w-full">
                                                    {Categories.map((category,index)=>(
                                                        <>
                                                            <li key={index} className="text-white text-sm flex justify-between gap-x-4 cursor-pointer p-2 hover:bg-red-500 rounded-md mt-2 w-full">
                                                                <span>{category.title}</span>
                                                                <KeyboardArrowDownIcon onClick={()=>TabManager(category.title)}/>
                                                            </li>
                                                            {open && tabopen &&(currentTab === category.title) && (
                                                                <ul className>
                                                                {category.subItems.map((subItem, index)=>(
                                                                    <>
                                                                        <li key={index} className="text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-red-500 rounded-md mt-2 duration-300">
                                                                            {subItem.title}
                                                                        </li>
                                                                    </>
                                                                ))}
                                                                </ul>
                                                            )}
                                                        </>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                            </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </div>
    </Dialog>
   </Transition.Root>
   </>
  )
}

export default CategorySidebar