import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import Form from './Components/Form'
import './App.css'

const App = () => {
  return (
    <>
      <h1>Lambda Eats</h1>
      <nav>
        <Link to='/'>Home</Link>
        <Link to="/pizza">Pizza</Link>
      </nav>

      <Route path='/pizza'>
        <Form/>
      </Route>

      <Route exact path='/'/>



    </>
  );
};
export default App;
