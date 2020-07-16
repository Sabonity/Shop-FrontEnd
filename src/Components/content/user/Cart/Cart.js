import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import Item from './CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { POST_CART_ITEMS } from '../../../../actions/cartAction';
import '../../../../styles/content/user/Cart.css';
const UserCart = () => {

    const { token } = useSelector(state => state.userData);
    const [cartItem, setCartItem] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {

        getUserCart();
        async function getUserCart() {
            await fetchCartItems();
        }
    }, []);

    const fetchCartItems = async () => {
        try {
            const productList = await Axios.get('http://localhost:5000/cart', {
                headers: {
                    "auth-token": token
                }
            });
            let { products } = productList.data;
            setCartItem(products);
            //Dispatch action to store the items from the cart
            dispatch(POST_CART_ITEMS(products));
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
                    title: 'Error upon fetching of products',
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
        <div className="Cart">
            <div className="viewCartItems">
                {
                    cartItem.map((item, index) => (
                        <Item productName={item.productName}
                            quantity={item.quantity}
                            price={item.price} id={item.productId} key={index} />
                    ))
                }

            </div>
        </div>
    )
}

export default UserCart;