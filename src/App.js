import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Registration from './components/Registration';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// const [isUserLogged, setLogged] = useState(0);

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="initialHeader"></div>
        <div className="initialContent">
          <Switch >
            <Route path="/" exact component={Login} />
            <Route path="/register" component={Registration} />
          </Switch>
        </div>
        <div className="initialFooter"></div>
      </div>
    </BrowserRouter>
  );
}

export default App;
