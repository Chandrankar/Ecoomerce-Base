import React from 'react';
import Image from 'next/image';

const Collection = () => {
  return (
    <div className="p-8 flex flex-col items-center">
      <div className="text-center">
        <p className="text-red-700 text-4xl font-semibold">Try Out Summer Collection</p>
      </div>
      <div className="text-black w-1/2"><p className='text-center'>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor non in autem cum porro quidem qui nostrum. Aperiam laboriosam expedita debitis, maiores amet facere cum magni voluptate odit nulla cupiditate.</p></div>
        <div className="md:flex justify-center p-4 m-4">
          <div className="rounded-md p-2">
          <Image
            src="/Saree1.png"
            alt="Saree1"
            width={465}
            height={200}
          />
          
          </div>
          <div className="p-2 rounded-md"><Image
            src="/Saree2.png"
            alt="Saree2"
            width={275}
            height={100}/></div>
          <div className="p-2"><div className="mb-4"><Image
            src="/Man1.png"
            alt="Man1"
            width={400}
            height={200}
          /></div>
          <div>
          <Image
            src="/Saree3.png"
            alt="Saree3"
            width={400}
            height={200}
          /></div></div>
        </div>
    </div>
  )
}

export default Collection