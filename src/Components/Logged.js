import React, { useState } from 'react';
import '../styles/Logged.css';
import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar, Toolbar, Typography, Drawer, IconButton,
    Divider, List, ListItem, ListItemIcon, ListItemText
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShopIcon from '@material-ui/icons/Shop';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StorefrontIcon from '@material-ui/icons/Storefront';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { LOGOUT } from '../actions/isLogged';
import Content from './content/Content';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
}));


const Logged = () => {
    const classes = useStyles();

    const dispatch = useDispatch(); // Variable assigning to useDispatch

    const { firstName } = useSelector(state => state.userData); //Get firstName of the user from the store
    const { lastName } = useSelector(state => state.userData); //Get firstName of the user from the store

    const [open, setOpen] = useState(false);

    const handleDrawer = () => {
        setOpen(true);
    }

    const logOut = async (e) => {
        e.preventDefault();
        dispatch(LOGOUT());
    }

    const userNavigationBar = (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton onClick={handleDrawer} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Products
                    </Typography>
                    <Typography>
                        Hi, {`${firstName} ${lastName}`}
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor='left'
                open={open}
                onClose={() => setOpen(false)}
                classes={{
                    paper: classes.drawerPaper,
                }} >
                <List>
                    <ListItem button key="Products">
                        <ListItemIcon><StorefrontIcon /></ListItemIcon>
                        <ListItemText primary="Products" />
                    </ListItem>
                    <ListItem button key="Cart">
                        <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
                        <ListItemText primary="Cart" />
                    </ListItem>
                    <ListItem button key="Placed Order">
                        <ListItemIcon><ShopIcon /></ListItemIcon>
                        <ListItemText primary="Placed Order" />
                    </ListItem>
                    <ListItem button key="Profile">
                        <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button key="Logout" onClick={logOut}>
                        <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>
            </Drawer >
        </div >
    );
    return (
        <div className="Logged">
            <div className="navigation">
                {userNavigationBar}
            </div>
            <div className="content">
                <Content />
            </div>
        </div>
    )
}

export default Logged;