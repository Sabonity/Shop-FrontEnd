import React from 'react';
import Swal from 'sweetalert2';
import Axios from 'axios';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import '../../../../styles/content/admin/Products.css';

const Product = ({ productName, category, price, id, quantity }) => {

    const { token } = useSelector(state => state.userData);


    const handleAddToCartButton = async (event) => {
        event.preventDefault();

        const { value: quantity } = await Swal.fire({
            title: 'Quantity',
            input: 'number',
            showCancelButton: true,
            confirmButtonColor: '#3f51b5',
            cancelButtonColor: '#f50057',
            inputPlaceholder: 'Input the quantity',
            inputValidator: (value) => {
                if (!value) return 'You need to write the quantity';
                if (value < 1) return 'The quantity should be atleast 1'

            }
        });
        //Configuration of request boday
        let requestBody = {
            "productId": id,
            "quantity": parseInt(quantity)
        };
        await sendAddToCartRequest(requestBody);
    }

    const sendAddToCartRequest = async (requestData) => {
        try {
            const addToCartRequest = await Axios.post(`http://localhost:5000/cart`, requestData, {
                headers: {
                    "auth-token": token
                }
            });
            let { message } = addToCartRequest.data;
            await Swal.fire({
                icon: 'success',
                title: 'Successfully added to cart',
                text: `${message}`
            });
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
                    title: 'Product creation was failed',
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
        <div className="productForm">
            <div id="pImage"></div>
            <div id="pContent">
                <div id="pName" className="wordBreaker">{productName}</div>
                <div id="pCategory">Category: {category}</div>
                <div id="pStock">Stock On Hand: {quantity}</div>
                <div id="pPrice">Price: ₱ {price}</div>
            </div>
            <div id="pButtons">
                <div id="pContentButton">
                    <Button variant="contained" color="primary" id="regBtnSubmit" type="submit"
                        onClick={handleAddToCartButton}>
                        Add to Cart
                        </Button>
                </div>
            </div>
        </div>
    )
}

export default Product;