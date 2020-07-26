import React, { useEffect, useState } from 'react';
import { Button, Modal, Backdrop, Fade } from '@material-ui/core';
import '../../../../styles/content/user/Order.css';
import '../../../../styles/content/admin/Order.css';
import OrderItem from './OrderItem.js';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid white",
        boxShadow: theme.shadows[5],
        outline: 'none'
    }
}));

const Order = ({ price, status, message, id, cart }) => {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [orderedItem, setOrderedItem] = useState([]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const { products } = cart[0];
        setOrderedItem(products);
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
                <Button variant="contained" color="primary" id="oViewOrderBtn" type="submit"
                    onClick={handleOpen}>
                    View Order
                </Button>
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper} id="aOrderModal">
                        <div className="aOrderItem">
                            {
                                orderedItem.map((item, index) => (
                                    <OrderItem productName={item.productName}
                                        quantity={item.quantity}
                                        price={item.price} id={item.productId} key={index}
                                    />
                                ))
                            }
                        </div>
                        <div className="aOrderButton">
                            <Button variant="contained" color="primary" id="orderApproveBtn" type="submit">
                                Approve
                            </Button>
                            <Button variant="contained" color="secondary" id="orderDeniedBtn" type="submit">
                                Deny
                            </Button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default Order;