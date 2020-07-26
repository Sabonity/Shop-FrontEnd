import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { useParams } from 'react-router';
import ActiveOrder from './ActiveOrder';
import InactiveOrder from './InactiveOrder';
import '../../../../styles/content/user/Orders.css';


const OrderList = () => {

    const { orderTodo } = useParams();
    const [displaySelector, setDisplaySelector] = useState(true);

    useEffect(() => {
        if (orderTodo === 'inactiveOrder') {
            setDisplaySelector(false);
        } else if ((orderTodo === 'activeOrder') || (orderTodo === undefined)) {
            setDisplaySelector(true);
        }
    }, [displaySelector])


    return (
        <div className="Orders">
            <div className="oNavigation">
                <Button variant="contained" color="primary" id="divViewActiveOrder" href="/orders">
                    Pending Order
                </Button>
                <Button variant="contained" color="primary" id="divViewOrderHistory" href="/orders/inactiveOrder">
                    Order History
                </Button>
            </div>
            <div className="oOrder">
                <div className="oViewOrder">
                    {
                        (displaySelector) ? <ActiveOrder /> : <InactiveOrder />
                    }
                </div>
            </div>
        </div>
    )
}


export default OrderList;