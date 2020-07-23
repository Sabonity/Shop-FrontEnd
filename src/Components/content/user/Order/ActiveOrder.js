import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import Swal from 'sweetalert2';
import Order from './Order';
import { act } from 'react-dom/test-utils';

const ActiveOrder = () => {

    const [activeOrderList, setActiveOrderList] = useState([]);
    const { token } = useSelector(state => state.userData);

    useEffect(() => {

        async function getActiveOrder() {
            await fetchActiveOrder();
        }
        getActiveOrder();
    }, []);

    const fetchActiveOrder = async () => {
        try {
            const requestforActiveOrder = await Axios.get('http://localhost:5000/order/activeOrder', {
                headers: {
                    "auth-token": token
                }
            });
            setActiveOrderList(requestforActiveOrder.data);
            console.log(requestforActiveOrder.data);
        } catch (error) {
            console.log(error);
            if (error.response) {
                console.log(error);
                /*
                 * The request was made and the server responded with a
                 * status code that falls out of the range of 2xx
                 */
                const { message } = error.response.data;
                await Swal.fire({
                    icon: 'error',
                    title: 'Error upon fetching of orders',
                    text: `${message}`
                });
            } else if (error.request) {
                console.log(error.request);
            } else {
                // Something happened in setting up the request and triggered an Error
                console.log('Error', error.message);
            }
        }
    }



    return (
        <div className="oActiveOrder">
            {
                (activeOrderList.length !== 0) ?
                    activeOrderList.map((order, index) => (
                        <Order
                            key={index}
                            price={order.price}
                            id={order._id}
                            status={order.status}
                            message={order.message}
                            products={order.carts}
                        />
                    )) : `You don't have any placed order`
            }
            
        </div>
    )
}

export default ActiveOrder;