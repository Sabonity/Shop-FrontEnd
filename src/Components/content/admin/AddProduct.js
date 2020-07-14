import React, { useState } from 'react';
import { TextField, FormControl, Select, InputLabel, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import '../../../styles/content/admin/Products.css';
import axios from 'axios';
import Swal from 'sweetalert2';
// import CurrencyTextField from '@unicef/material-ui-currency-textfield'

const AddProduct = () => {

    /*
        Functions and component for product creation
    */

    const [newProductData, setNewProductData] = useState({
        productName: '',
        category: '',
        quantity: 0,
        price: 0
    });

    const { token } = useSelector(state => state.userData);

    const handleChange = (event) => {
        // console.log("Sample : " + newProductData);
        setNewProductData({ ...newProductData, [event.target.name]: event.target.value });
    };

    const clearInputField = () => {
        setNewProductData({
            productName: '',
            category: '',
            quantity: 0,
            price: 0
        });
        window.location.replace('/products/newProduct');
    }

    const createProduct = async (event) => {
        event.preventDefault();
        try {
            const newProductCall = await axios.post('http://localhost:5000/product', newProductData, {
                headers: {
                    "auth-token": token
                }
            });
            let { message } = newProductCall.data;
            await Swal.fire({
                icon: 'success',
                title: 'Product creation was successful',
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


    return (
        <div className="addNewProduct">
            <label id="anpLabel">NEW PRODUCT CREATION</label>
            <br />
            <form className="anpForm" onSubmit={createProduct}>
                <div id="anproductNameDiv">
                    <TextField
                        name="productName"
                        id="outlined-search productName"
                        label="Product Name"
                        type="search"
                        variant="outlined"
                        style={{ width: '100%' }}
                        value={newProductData.productName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <FormControl variant="outlined" id="anproductCategoryDiv">
                    <InputLabel htmlFor="outlined-age-native-simple"
                    >Product Category</InputLabel>
                    <Select
                        required
                        native
                        value={newProductData.category}
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
                        defaultValue={newProductData.quantity}
                        style={{ width: '100%' }}
                        onChange={handleChange}
                        required
                        placeholder="1"
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
                        placeholder="0.00"
                    />
                    {/* <CurrencyTextField
                            variant="outlined"
                            currencySymbol="₱"
                            placeholder="0.00"
                            onChange={handleChange}
                            name="price"
                            id="outlined-search price"
                            label="Price"
                            style={{ width: '100%' }}
                            required
                        /> */}
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
                            Create
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

export default AddProduct;