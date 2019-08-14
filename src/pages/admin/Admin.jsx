import React, { Component } from 'react';
import {Redirect,Switch,Route} from 'react-router-dom';
import { Layout } from 'antd';


import LeftNav from '../../components/left-nav';
import Header from '../../components/header'
import memoryUtils from '../../utils/memoryUtils'

import Home from '../home/home'
import  Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'



const { Footer, Sider, Content } = Layout
// 后台管理路由组件
export default class Admin extends Component {
  render() {
    const user=memoryUtils.user
    console.log(user);
    //如果当前用户没有登录，就自动跳转到登录页面login
    //判断
    if(!user._id){
   //在rende()中自动跳转
   return <Redirect to='/login'></Redirect>
   //在事件的回调函数中自动跳转
   //this.props.history.push()
    }
    return (
      <Layout style={{ height: '100%' }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header/>
          <Content style={{ background: 'white', margin: '20px'}}>
            <Switch>
              <Route path="/home" component={Home}/>
              <Route path='/category' component={Category} />
              <Route path='/product' component={Product} />
              <Route path='/role' component={Role} />
              <Route path='/user' component={User} />
              <Route path='/charts/bar' component={Bar} />
              <Route path='/charts/line' component={Line} />
              <Route path='/charts/pie' component={Pie} />
              <Redirect to="/home"/>
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center', color: 'rgba(0, 0, 0, 0.5)'}}>
            推荐使用谷歌浏览器，可以获得更佳页面操作体验
          </Footer>
        </Layout>
      </Layout>
      
    )
  }
}

