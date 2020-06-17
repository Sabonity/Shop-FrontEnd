import React from 'react';
import './App.css';
import Login from './components/Login';
import Registration from './components/Registration';
import Logged from './components/Logged';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { useSelector } from 'react-redux';


const App = () => {
  // const isLogged = useSelector(state => state.isLogged);
  const isLogged = true;
  const userNotLogged = (
    <Switch >
      <Route path="/" exact component={Login} />
      <Route path="/register" component={Registration} />
    </Switch>
  )

  const userLogged = (
    <Logged></Logged>
  )

  return (
    <BrowserRouter>
      <div className="App">
        <div className="initialHeader"></div>
        <div className="initialContent">
          {isLogged ? userLogged : userNotLogged}
        </div>
        <div className="initialFooter"></div>
      </div>
    </BrowserRouter>
  );
}


export default App;
