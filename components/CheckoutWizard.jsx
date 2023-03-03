import React from 'react'

const CheckoutWizard=({activeStep = 0})=> {
  console.log('Wizard')
  return (
    <div className="mb-5 flex flex-wrap mt-4 mx-4">
        {
            ['User Login', 'Shipping SocketAddress', 'Payment Method', 'Place Order'].map((step,index)=>(
                <div key={step} className={`flex-1 border-b-2 text-center ${index<=activeStep? 
                    'border-indigo-500 text-indigo-500':
                    'border-gray-400 text-gray-400'}`}>
                    {step}
                </div>
            ))
        }
    </div>
  )
}

export default CheckoutWizard