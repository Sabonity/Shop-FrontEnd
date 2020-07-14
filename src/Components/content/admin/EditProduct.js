import React, { useState, useEffect } from 'react';
import { TextField, FormControl, Select, InputLabel, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import Swal from 'sweetalert2';

const EditProduct = () => {

    const { token } = useSelector(state => state.userData);
    const listOfProduct = useSelector(state => state.products);
    const [productData, setProductData] = useState({
        productName: '',
        category: '',
        quantity: 0,
        price: 0
    });
    const [newProductData, setNewProductData] = useState({
        quantity: 0,
        price: 0
    });

    useEffect(() => {
        const currentURI = (window.location + "").split("/");
        const productId = currentURI[currentURI.length - 1];
        const productIndexInArray = listOfProduct.findIndex(product => product._id === productId);
        const product = listOfProduct[productIndexInArray];
        setProductData(product);
    }, [listOfProduct]);

    const handleChange = (event) => {
        setNewProductData({ ...newProductData, [event.target.name]: event.target.value });
    };


    const doUpdateProduct = async (e) => {
        e.preventDefault();
        let currentURI = (window.location + "").split("/");
        let productId = currentURI[currentURI.length - 1];
        let requestData = {
            "productName": productData.productName,
            "category": productData.category,
            "quantity": newProductData.quantity,
            "price": newProductData.price
        };
        try {
            const newProductCall = await Axios.put(`http://localhost:5000/product/${productId}`, requestData, {
                headers: {
                    "auth-token": token
                }
            });
            let { message } = newProductCall.data;
            await Swal.fire({
                icon: 'success',
                title: 'Updated Successfully',
                text: `${message}`
            });
            clearInputField();
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

    const clearInputField = () => {
        setProductData({
            productName: '',
            category: '',
            quantity: 0,
            price: 0
        });
        window.location.replace('/products');
    }

    return (
        <div className="addNewProduct">
            <label id="anpLabel">EDIT PRODUCT</label>
            <br />
            <form className="anpForm" onSubmit={doUpdateProduct}>
                <div id="anproductNameDiv">
                    <TextField
                        name="productName"
                        id="outlined-search productName"
                        label="Product Name"
                        type="search"
                        variant="outlined"
                        style={{ width: '100%' }}
                        value={productData.productName}
                        onChange={handleChange}
                        required
                        disabled
                    />
                </div>
                <FormControl variant="outlined" id="anproductCategoryDiv">
                    <InputLabel htmlFor="outlined-age-native-simple"
                    >Product Category</InputLabel>
                    <Select
                        required
                        disabled
                        native
                        value={productData.category}
                        onChange={handleChange}
                        label="Product Category"
                        style={{ width: '100%' }}
                        inputProps={{
                            name: 'category',
                            id: 'outlined-age-native-simple',
                        }}
                    >
                        <option aria-label="None" value="" />
                        <option value={"Snacks"}>Snacks</option>
                        <option value={"Goods"}>Goods</option>
                        <option value={"Personal Hygiene"}>Personal Hygiene</option>
                    </Select>
                </FormControl>
                <div id="anproductQuantityDiv">
                    <TextField
                        name="quantity"
                        id="outlined-search quantity"
                        label="Quantity"
                        type="number"
                        variant="outlined"
                        style={{ width: '100%' }}
                        onChange={handleChange}
                        placeholder={'Current quantity : ' + productData.quantity}
                        required
                    />
                </div>
                <div id="anproductPriceDiv">
                    <TextField
                        name="price"
                        id="outlined-search price"
                        label="Price"
                        type="number"
                        variant="outlined"
                        style={{ width: '100%' }}
                        onChange={handleChange}
                        required
                        step="0.01"
                        placeholder={'Current price : ' + productData.price}
                    />

                </div>
                <div id="anproductImageDiv">
                    <input
                        accept="image/*"
                        id="contained-button-file"
                        multiple
                        type="file"
                        color="primary"
                    // required
                    />
                </div>
                <div id="anproductBtnDiv">
                    <div id="anpButtons">
                        <Button variant="contained" color="primary" id="anpCreate" type="submit">
                            Update
                            </Button>
                        <Button variant="contained" color="secondary" id="anpCancel" href="/products">
                            Cancel
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditProduct;