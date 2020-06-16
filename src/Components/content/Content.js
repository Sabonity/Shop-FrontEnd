import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../../styles/content/Content.css'

//Admin Components import
import AdminProducts from './admin/Products';


//User Components import
import UserProducts from './user/Products';


const Content = () => {
    const { access } = useSelector(state => state.userData);
    // const access = 'admin'
    const AdminContent = (
        <Switch >
            <Route path="/" exact component={AdminProducts} />
        </Switch>
    )

    const UserContent = (
        <Switch >
            <Route path="/" exact component={UserProducts} />
        </Switch>
    )

    return (
        <div className="Content">
            {(access === 'admin') ? AdminContent : UserContent}
        </div>
    )
}

export default Content;