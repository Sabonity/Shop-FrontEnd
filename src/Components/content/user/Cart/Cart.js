import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import Axios from 'axios';
import Swal from 'sweetalert2';
import Item from './CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { POST_CART_ITEMS } from '../../../../actions/cartAction';
import '../../../../styles/content/user/Cart.css';
const UserCart = () => {

    const { token } = useSelector(state => state.userData);
    const [cartItem, setCartItem] = useState([]);
    const [cartId, setCartId] = useState('');
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
            let { _id } = productList.data;
            let { products } = productList.data;
            setCartItem(products);
            setCartId(_id);
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

    const handlePlaceOrder = async (event) => {
        event.preventDefault();
        Swal.fire({
            title: 'Cart to be place as your order',
            text: "Are you sure you want to place this as order ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3f51b5',
            cancelButtonColor: '#f50057',
            confirmButtonText: 'Yes, placed Order'
        }).then(async (result) => {
            if (result.value) {
                console.log(`${cartId}`)
                try {
                    const placedOrder = await Axios.post(`http://localhost:5000/order/${cartId}`, {}, {
                        headers: {
                            "auth-token": token
                        }
                    });
                    let { message } = placedOrder.data;
                    await Swal.fire({
                        icon: 'success',
                        title: 'Placed Order',
                        text: `${message}`
                    });
                    window.location.replace('/cart');
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
                            title: 'Error upon placing of order',
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
        })
    }


    return (
        <div className="Cart">
            <div className="cCheckOut">
                <Button variant="contained" color="primary" id="divCheckOutBtn" onClick={handlePlaceOrder}>
                    Check out the cart
                </Button>
            </div>
            <div className="cItems">
                <div className="viewCartItems">
                    {
                        (cartItem.length !== 0) ?
                        cartItem.map((item, index) => (
                            <Item productName={item.productName}
                                quantity={item.quantity}
                                price={item.price} id={item.productId} key={index} />
                        )) : `Your cart is empty`
                    }
                </div>
            </div>
        </div>
    )
}

export default UserCart;