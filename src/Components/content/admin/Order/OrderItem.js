import React from 'react';
import '../../../../styles/content/user/CartItem.css';

const OrderItem = ({ productName, price, id, quantity }) => {
    return (
        <div className="uOrderItem">
            <div id="iImage"></div>
            <div id="iContent">
                <div id="iName" className="wordBreaker">{productName}</div>
                <div id="iStock">Quantity: {quantity}</div>
                <div id="iPrice">Price: ₱ {price}</div>
            </div>
        </div>
    )
}

export default OrderItem;