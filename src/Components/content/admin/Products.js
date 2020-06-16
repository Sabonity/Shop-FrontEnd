import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import '../../../styles/content/admin/Products.css';

const AdminProducts = () => {
    return (
        <div className="AdminProducts">
            <div className="pNavigation">
                <Link to="/" id="divViewProducts">
                    <div id="viewProduct">
                        View Products
                </div>
                </Link>
                <Link to="/" id="divAddProduct">
                    <div id="addProduct">
                        Add New Product
                </div>
                </Link>
            </div >
            <div className="pProducts"></div>
        </div >
    )
}

export default AdminProducts;