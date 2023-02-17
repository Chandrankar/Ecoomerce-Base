import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useReducer } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import {getError} from '../../utils/error';

function reducer(state, action){
    switch(action.type){
        case 'FETCH_REQUEST':
            return{...state, loading: true, error: ''};

        case 'FETCH_SUCCESS':
            return{...state, loading: false,order: action.payload ,error: ''};
            
        case 'FETCH_FAIL':
            return{...state, loading: false,error:action.payload};     

        default:
            return state;
    }
}



function OrderScreen(){
    const {query} = useRouter();
    const orderId = query.id;

    const [{loading, error, order},dispatch]= useReducer(
        reducer,{
            loading: true,
            order: {},
            error: '',
        }
    )

    useEffect(() => {
        const fetchOrder= async()=>{
            try{
                dispatch({type: 'FETCH_REQUEST'});
                const {data} = await axios.get(`/api/orders/${orderId}`);
                dispatch({type: 'FETCH_SUCCESS', payload: data});
            } catch(err){
                dispatch({type: 'FETCH_FAIL',paylaod: getError(err)});
            }
        }
        if(!order._id|| order._id!==orderId)
        {
            fetchOrder();
        }  
    }, [order, orderId]);

    const{
        shippingAddress,
        paymentMethod,
        orderItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        isPaid,
        paidAt,
        isDelivered,
        deliveredAt
    } = order;
    
    return(
        <Layout title={`Order${orderId}`}>
            <h1 className="mb-4 text-xl">{`Order ${orderId}`}</h1>
            {loading?(<div>Laoding...</div>):
            error?(
                <div className="alert-error">{error}</div>
            ):(
                <div className="grid md:grid-cols-4 md: gap-5">
                    <div className="overflow-x-auto md:col-span-3">
                        <div className="card p-5">
                            <h2 className="mb-2 text-lg">Shipping Address</h2>
                            <div>
                                {shippingAddress.fullName}, {shippingAddress.address},{' '},
                                {shippingAddress.city}, {shippingAddress.postalCode}
                            </div>
                            {isDelivered? (
                                <div className="alert-success">Delivered at {deliveredAt}</div>
                            ):(
                                <div className="alert-error">Not Delivered</div>
                            )}
                        </div>

                        <div className="card p-5">
                            <h2 className="mb-2 text-lg">payment Method</h2>
                            <div>{paymentMethod}</div>
                            {isPaid? (
                                <div className="alert-success">Paid at {paidAt}</div>
                            ):(
                                <div className="alert-error">Not Paid</div>
                            )}
                        </div>

                        <div className="card overflow-x-auto p-5">
                            <h2 className="mb-2 text-lg">Order Items</h2>
                            <table className="min-w-full">
                                <thead className="border-b">
                                    <tr>
                                        <th className="px-5 text-left">Item</th>
                                        <th className="px-5 text-right">Quantity</th>
                                        <th className="px-5 text-right">Price</th>
                                        <th className="px-5 text-right">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderItems.map((item)=>(
                                        <tr key={item._id} className="border-b">
                                            <td>
                                                <Link href={`/product/${item.slug}`}>
                                                    <div className="flex item-center">
                                                        <Image
                                                           src={item.image}
                                                           alt={item.name}
                                                           width={50}
                                                           height={50} 
                                                        ></Image>
                                                        &nbsp;
                                                        {item.name}
                                                    </div>
                                                </Link>
                                            </td>
                                            <td className="p-5 text-right">{item.quantity}</td>
                                            <td className="p-5 text-right">{item.price}</td>
                                            <td className="p-5 text-right">{item.quantity * item.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        <div className="card p-5">
                            <h2 className="mb-2 text-lg">Order Summary</h2>
                            <ul>
                                <li>
                                    <div className="mb-2 flex justify-between">
                                        <div>Items</div>
                                        <div>${itemsPrice}</div>
                                    </div>
                                </li>{' '}
                                <li>
                                    <div className="mb-2 flex justify-between">
                                        <div>Tax</div>
                                        <div>${taxPrice}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="mb-2 flex justify-between">
                                        <div>Shipping Price</div>
                                        <div>${shippingPrice}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="mb-2 flex justify-between">
                                        <div>Total</div>
                                        <div>${totalPrice}</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </Layout>   
    )
}

OrderScreen.auth = true;
export default OrderScreen;