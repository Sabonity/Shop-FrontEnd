import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import '../../../../styles/content/user/Order.css';

const Order = ({ price, status, message, id, products }) => {

    useEffect(() => {
        console.log(products)
    }, [])

    return (
        <div className='uOrder'>
            <div className="uOrderTxt">
                <label id="uOrderId">Order Id: {id} </label>
                <label id="uOrderPrice">Total Amount: {price}</label>
                <label id="uOrderMessage">Status: {status}</label>
                <label id="uOrderStatus">Mesasge: {message}</label>
            </div>
            <div className="uOrderBtn">
                <Button variant="contained" color="primary" id="oViewOrderBtn" type="submit" >
                    View Order
                </Button>
            </div>
        </div>
    )
}

export default Order;