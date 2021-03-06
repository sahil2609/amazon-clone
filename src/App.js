import React, {useEffect} from "react";
import './App.css';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import Orders from './Orders';
import { BrowserRouter as Router, Route, Switch } 
from "react-router-dom";
import Checkout from './Checkout';
import { auth } from "./firebase";
import {useStateValue} from "./StateProvider";
import Payment from './Payment';
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";


const promise = loadStripe(
  "pk_test_51K2cO2SEaIpOQdUwYNGnyvxhmgjdxpK0qYwwxMKOF8dPyvHzoT7dGBntB1uXarDOEN13iyLXLJrpXRovNDptVlQ600GVoP8sag"
);



function App() {

  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads...
    auth.onAuthStateChanged(authUser => {
      console.log('The user is >>>>' , authUser);
      if (authUser){
        // the user was or just logged in

        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }
      else{
        //the user is logged out

        dispatch({
          type: 'SET_USER',
          user: null
        })
        
      }
    })
    
  }, [])


  return (
    //BEM
    <Router>
      <div className="app">
      <Switch>
      <Route path ="/orders">
          <Header/>
          <Orders/>
        </Route>
      <Route path ="/login">
          <Login />
        </Route>
            
        <Route path="/checkout">
          <Header/>
          <Checkout />
        </Route>
        <Route path="/payment">
          <Header/>
          <Elements stripe = {promise}>
            <Payment />
          </Elements>
        </Route>
          <Route path ="/">
            <Header/>
            <Home/>
        </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
