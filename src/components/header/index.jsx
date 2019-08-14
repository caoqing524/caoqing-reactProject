import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Modal } from 'antd';

import LinkButton from "../link-button/index";
import {removeUser  } from "../../utils/storageUtils";
import memoryUtils from '../../utils/memoryUtils'
import menuConfig from '../../config/menuConfig'
import { formateDate } from '../../utils/dateUtils'
import { reqWeather } from '../../api/index'

import './index.less';

 class Header extends Component {
   //初始化数据状态
  state = {
     currentTime: formateDate(Date.now()),
     dayPictureUrl: '',
     weather: ''
   }

   //更新时间 自定义updateTime方法
   updateTime = () => {
     // 启动循环定时器, 每隔1s更新一下时间状态
     this.intervalId = setInterval(() => {
         //调用封装好的时间工具函数
       const currentTime = formateDate(Date.now())
       //更新时间状态
       this.setState({
         currentTime
       })
     }, 1000);
   }
//组件将要卸载前，清除定时器
   componentWillUnmount() {
     clearInterval(this.intervalId)
   }

   /* 组件挂载完毕
   异步获取天气信息显示
   */
   componentDidMount() {
     //挂载完毕 调用自定义updateTime方法
    this.updateTime()
     //挂载完毕 调用自定义getWeather方法
    this.getWeather()
   }

   //得到对应城市的天气 用async   await的方式，等reqWeather函数里的url请求发出去后，才能得到对应城市的天气
   getWeather = async () => {
     const { dayPictureUrl, weather } = await reqWeather('北京')
     this.setState({
       dayPictureUrl,
       weather
     })
   }



//点击LinkButton按钮退出登录
   logout = () => {
     //Modal是antd里的方法
     Modal.confirm({ // 配置对象
       title: '确认退出吗?',
       onOk: () => {
         // 删除保存的user数据
         removeUser()
         memoryUtils.user = {}
         // 跳转到login
         this.props.history.replace('/login')
       },
       onCancel() {
         console.log('Cancel')
       },
     })
   }

   /* 
    得到当前请求对应的标题
    */
   getTitle = () => {
     let title = ''
     //请求路径
     const path = this.props.location.pathname
     //遍历menuConfig中的数据数组的每一项，再判断得到对应的请求所对应的标题
     menuConfig.forEach(item => {
       if (item.key === path) {
         title = item.title
       } else if (item.children) {
         const cItem = item.children.find(cItem => cItem.key === path)
         if (cItem) {
           title = cItem.title
         }
       }
     })
//返回对应请求的标题
     return title
   }


  render() {
    const { currentTime, dayPictureUrl, weather } = this.state
    const user = memoryUtils.user
    // 得到当前请求对应的标题
    const title = this.getTitle()

    return (
      <div className='header'>
         <div className='header-top'>
            <span>欢迎{user.username}</span>
          <LinkButton onClick={this.logout}>
            退出
          </LinkButton>
         </div>
         <div className='header-bottom'>
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            {dayPictureUrl ? <img src={dayPictureUrl} alt="weather" /> : null}
            <span>{weather}</span>
          </div>
         </div>
      </div>
    );
  }
}


export default withRouter(Header)



