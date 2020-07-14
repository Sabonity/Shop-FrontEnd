import React, { useEffect, useState } from 'react'
import { Button } from '@material-ui/core';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { POST_PRODUCTS } from '../../../actions/productsAction';
import Product from './Product';
import axios from 'axios';
import Swal from 'sweetalert2';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import '../../../styles/content/admin/Products.css';


const AdminProducts = () => {

    const { productToDo } = useParams();
    const [displaySelector, setDisplaySelector] = useState(0);
    const listOfProduct = useSelector(state => state.products);
    const { token } = useSelector(state => state.userData);

    const dispatch = useDispatch();

    useEffect(() => {
        if (productToDo === 'newProduct') {
            setDisplaySelector(2);
        } else if (productToDo === 'editProduct') {
            setDisplaySelector(3);
        } else if (productToDo === undefined) {
            setDisplaySelector(1);
            getProducts();
        }
        async function getProducts() {
            await fetchProducts();
        }


    }, [productToDo]);

    /*
        Function and component for product display
    */
    const fetchProducts = async () => {
        try {
            const productList = await axios.get('http://localhost:5000/product', {
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

    const viewProducts = (
        <div className="viewProducts">
            {
                listOfProduct.map(product => (
                    <Product productName={product.productName}
                        category={product.category} quantity={product.quantity}
                        price={product.price} id={product._id} key={product._id} />
                ))
            }
        </div>
    );

    return (
        <div className="Products">
            <div className="pNavigation">
                <Button variant="contained" color="primary" id="divViewProducts" href="/products">
                    View Products
                </Button>
                <Button variant="contained" color="primary" id="divAddProduct" href="/products/newProduct">
                    Create New Product
                </Button>
            </div >
            <div className="pProducts">
                {(displaySelector === 1) ? viewProducts :
                    (displaySelector === 2) ? <AddProduct /> : <EditProduct />}
            </div>
        </div >
    )
}

export default AdminProducts;