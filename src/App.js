import React, {Component} from 'react';
import {BrowserRouter,HashRouter,Switch,Link,NavLink,Route} from 'react-router-dom';
import Admin from './pages/admin/Admin';
import Login from './pages/login/Login'
// import {Button,message} from 'antd';
// import './App.css';
export default class App extends Component{

  render(){
    return (
      <HashRouter>
        <Switch>
         <Route path='/login' component={Login}></Route>
         <Route path='/' component={Admin}></Route>
        </Switch>
      </HashRouter>
    );
  }

}


 
