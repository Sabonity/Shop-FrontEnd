import React, { useEffect, useState } from 'react'
import { TextField, FormControl, Select, InputLabel, Button } from '@material-ui/core';
import { useParams } from 'react-router';
import '../../../styles/content/admin/Products.css';


const AdminProducts = () => {

    const { productToDo } = useParams();
    const [displaySelector, setDisplaySelector] = useState(0);

    const [newProductData, setNewProductData] = useState({
        productName: '',
        category: '',
        quantity: 0,
        price: 0
    });

    useEffect(() => {
        const chooseToDisplay = () => {
            if (productToDo == null) {
                console.log("Pasok dito");
                setDisplaySelector(1);
            } else if (productToDo === 'newProduct') {
                console.log("Dito yan");
                setDisplaySelector(2);
            }
        }
        console.log("Hello");
        chooseToDisplay();
        console.log(productToDo);
        console.log(displaySelector);
    }, []);

    const viewProducts = (
        <div className="viewProducts">
            View Products
        </div>
    );

    const handleChange = (event) => {
        setNewProductData({ ...newProductData, [event.target.name]: event.target.value });
    };

    const createProduct = (event) => {
        event.preventDefault();
        console.log(newProductData);
    }

    const addNewProduct = (
        <div className="addNewProduct">
            <label id="anpLabel">NEW PRODUCT CREATION</label>
            <br />
            <form className="anpForm" onSubmit={createProduct}>
                <div id="anproductNameDiv">
                    <TextField
                        name="productName"
                        id="outlined-search"
                        label="Product Name"
                        type="search"
                        variant="outlined"
                        style={{ width: '100%' }}
                        defaultValue={newProductData.productName}
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
                        id="outlined-search"
                        label="Quantity"
                        type="number"
                        variant="outlined"
                        style={{ width: '100%' }}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div id="anproductPriceDiv">
                    <TextField
                        name="price"
                        id="outlined-search"
                        label="Price"
                        type="number"
                        variant="outlined"
                        onChange={handleChange}
                        style={{ width: '100%' }}
                        required
                    />
                </div>
                <div id="anproductBtnDiv">
                    <div id="anpButtons">
                        <Button variant="contained" color="primary" id="anpCreate" type="submit">
                            Create
                        </Button>
                        <Button variant="contained" color="secondary" id="anpCancel" href="/">
                            Cancel
                    </Button>
                    </div>
                </div>
            </form>
        </div>
    );

    return (
        <div className="AdminProducts">
            <div className="pNavigation">
                <Button variant="contained" color="primary" id="divViewProducts" href="/">
                    View Products
                </Button>
                <Button variant="contained" color="primary" id="divAddProduct" href="/newProduct">
                    Create New Product
                </Button>
            </div >
            <div className="pProducts">
                {(displaySelector === 1) ? viewProducts : addNewProduct}
            </div>
        </div >
    )
}

export default AdminProducts;