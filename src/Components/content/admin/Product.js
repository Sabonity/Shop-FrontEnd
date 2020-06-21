import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card, CardActionArea, CardActions, CardContent, CardMedia, Button,
    Typography
} from '@material-ui/core';
import '../../../styles/content/admin/Product.css';

const useStyles = makeStyles({
    root: {
        width: 300,
    },
    media: {
        height: 140,
    },
});

const Product = ({ productName, category, price, id, quantity }) => {
    const classes = useStyles();

    useEffect(() => {
        if (productName.length > 29) {
            let counter = 0;
            let tempProductName = productName.split(" ");
            let sampleProductName;
            console.log(tempProductName);
            tempProductName.map(wordSplit => {

                if (counter > 29) {
                    return;
                } else {

                }
            });
        }
    })

    return (
        <div className="productForm">
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image="/static/images/cards/contemplative-reptile.jpg"
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" id="wordBreaker">
                            {productName}
                        </Typography>
                        <br />
                        <Typography variant="body2" color="textSecondary" component="p">
                            Category: {category}
                        </Typography>
                        <br />
                        <Typography gutterBottom variant="h6" component="h2" id="wordBreaker">
                            Stock on hand : {quantity}
                        </Typography>
                        <br />
                        <Typography gutterBottom variant="h6" component="h2" id="wordBreaker">
                            Price : {price}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button variant="contained" color="primary" id="regBtnSubmit" type="submit">
                        Edit
                        </Button>
                    <Button variant="contained" color="secondary" id="regBtnSubmit" type="submit">
                        Delete
                        </Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default Product;