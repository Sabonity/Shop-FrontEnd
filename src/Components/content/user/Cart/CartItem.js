import React from 'react';
import Swal from 'sweetalert2';
import Axios from 'axios';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import '../../../../styles/content/user/CartItem.css'

const Item = ({ productName, price, id, quantity }) => {

    const { token } = useSelector(state => state.userData);

    const handleEditItemButton = async (event) => {
        event.preventDefault();

        const { value: quantity } = await Swal.fire({
            title: `Update the quantity of your item.\n\n Product : ${productName}`,
            input: 'number',
            showCancelButton: true,
            confirmButtonColor: '#3f51b5',
            cancelButtonColor: '#f50057',
            inputPlaceholder: 'Input the quantity',
            inputValidator: (value) => {
                if (!value) return 'You need to write the quantity';
                if (value < 1) return 'The quantity should be atleast 1'

            }
        })
        //Configuration of request boday
        if (quantity) {
            let requestBody = {
                "productId": id,
                "quantity": parseInt(quantity)
            };
            await sendUpdateTheCartRequest(requestBody);
        }

    }

    const sendUpdateTheCartRequest = async (requestData) => {
        try {
            const addToCartRequest = await Axios.put(`http://localhost:5000/cart`, requestData, {
                headers: {
                    "auth-token": token
                }
            });
            let { message } = addToCartRequest.data;
            await Swal.fire({
                icon: 'success',
                title: 'Successfully updated the cart',
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
        window.location.replace('/cart');
    }


    const handleDeleteButton = async (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure you want to remove this product in your cart?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3f51b5',
            cancelButtonColor: '#f50057',
            confirmButtonText: 'Yes, remove it!'
        }).then(async (result) => {
            if (result.value) {
                try {
                    const deleteProduct = await Axios.delete(`http://localhost:5000/cart/${id}`, {
                        headers: {
                            "auth-token": token
                        }
                    });
                    let { message } = deleteProduct.data;
                    await Swal.fire({
                        icon: 'success',
                        title: 'Removed successfully',
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
                            title: 'Error upon deletion of item',
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
        <div className="itemForm">
            <div id="iImage"></div>
            <div id="iContent">
                <div id="iName" className="wordBreaker">{productName}</div>
                <div id="iStock">Quantity: {quantity}</div>
                <div id="iPrice">Price: ₱ {price}</div>
            </div>
            <div id="iButtons">
                <div id="iContentButton">
                    <Button variant="contained" color="primary" id="regBtnSubmit" type="submit" onClick={handleEditItemButton}>
                        Edit
                    </Button>
                    <Button variant="contained" color="secondary" id="regBtnSubmit" type="submit" onClick={handleDeleteButton}>
                        Remove
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Item;