import React, { useEffect } from 'react'
import Axios from 'axios';
import Swal from 'sweetalert2';
import Product from './Product';
import { useSelector, useDispatch } from 'react-redux';
import { POST_PRODUCTS } from '../../../../actions/productsAction';
import '../../../../styles/content/admin/Products.css';

const UserProducts = () => {

    const { token } = useSelector(state => state.userData);
    const listOfProduct = useSelector(state => state.products);
    const dispatch = useDispatch();

    useEffect(() => {
        getProducts();
        async function getProducts() {
            await fetchProducts();
        }
    }, []);

    const fetchProducts = async () => {
        try {
            const productList = await Axios.get('http://localhost:5000/product', {
                headers: {
                    "auth-token": token
                }
            });
            dispatch(POST_PRODUCTS(productList.data));
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
        <div className="UserProducts">
            <div className="UserViewProducts">
                {
                    listOfProduct.map(product => (
                        <Product productName={product.productName}
                            category={product.category} quantity={product.quantity}
                            price={product.price} id={product._id} key={product._id} />
                    ))
                }
            </div>
        </div>
    )
}

export default UserProducts;