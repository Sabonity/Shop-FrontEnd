import React from 'react';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import Axios from 'axios';
import '../../../styles/content/admin/Product.css';


const Product = ({ productName, category, price, id, quantity }) => {

    const { token } = useSelector(state => state.userData);

    const handleEditButton = (e) => {
        e.preventDefault();
        let URI = window.location + "";
        let currentURI = `${URI}/editProduct/${id}`
        window.location.replace(currentURI);
    }

    const handleDeleteButton = async (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure you want to delete this product?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3f51b5',
            cancelButtonColor: '#f50057',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.value) {
                try {
                    const deleteProduct = await Axios.delete(`http://localhost:5000/product/${id}`, {
                        headers: {
                            "auth-token": token
                        }
                    });
                    let { message } = deleteProduct.data;
                    await Swal.fire({
                        icon: 'success',
                        title: 'Deleted Successfully',
                        text: `${message}`
                    });
                    window.location.replace('/products');
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
        })
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
                    <Button variant="contained" color="primary" id="regBtnSubmit" type="submit" onClick={handleEditButton}>
                        Edit
                        </Button>
                    <Button variant="contained" color="secondary" id="regBtnSubmit" type="submit" onClick={handleDeleteButton}>
                        Delete
                        </Button>
                </div>
            </div>
        </div>
    )
}

export default Product;