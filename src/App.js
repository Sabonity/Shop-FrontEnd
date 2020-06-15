import React from 'react';
import './App.css';
import Login from './components/Login';
import Registration from './components/Registration';
import Logged from './components/Logged';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// const [isUserLogged, setLogged] = useState(0);

const App = () => {
  let token = true;
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
          {token ? userLogged : userNotLogged}
        </div>
        <div className="initialFooter"></div>
      </div>
    </BrowserRouter>
  );
}


export default App;
