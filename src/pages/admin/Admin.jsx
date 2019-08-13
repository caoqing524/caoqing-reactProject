import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils';
// 后台管理路由组件
export default class Admin extends Component {
  render() {
    const user=memoryUtils.user
    //如果当前用户没有登录，就自动跳转到登录页面login
    //判断
    if(!user._id){
   //在rende()中自动跳转
   return <Redirect to='/login'></Redirect>
   //在事件的回调函数中自动跳转
   //this.props.history.push()
    }
    return (
      <div>
       Hello {user.username}
      
      </div>
    );
  }
}

