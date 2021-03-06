import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../../styles/content/Content.css'

//Admin Components import
import AdminProducts from './admin/Product/Products';
import OrderList from './admin/Order/Orders';


//User Components import
import UserProducts from './user/Product/Products';
import UserCart from './user/Cart/Cart';
import UserOrder from './user/Order/Orders';


const Content = () => {
    const { access } = useSelector(state => state.userData);
    // const access = 'admin'
    const AdminContent = (
        <Switch >
            <Route exact path="/" component={AdminProducts} />
            <Route exact path="/products" component={AdminProducts} />
            <Route exacxt path="/products/:productToDo" component={AdminProducts} />
            <Route path="/orders" exact component={OrderList} />
            <Route path="/orders/:orderTodo" exact component={OrderList} />
        </Switch>
    )

    const UserContent = (
        <Switch >
            <Route path="/" exact component={UserProducts} />
            <Route path="/products" exact component={UserProducts} />
            <Route path="/cart" exact component={UserCart} />
            <Route path="/orders" exact component={UserOrder} />
            <Route path="/orders/:orderTodo" exact component={UserOrder} />
        </Switch>
    )

    return (
        <div className="Content">
            {(access === 'admin') ? AdminContent : UserContent}
        </div>
    )
}

export default Content;