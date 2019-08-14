import React, { Component } from 'react';
import {Link,withRouter} from 'react-router-dom'
import {Menu,Icon} from 'antd'

import menuList from '../../config/menuConfig'
import logo from '../../asset/images/logo.png';
import  './index.less';
const {SubMenu,Item}=Menu
//admin左侧导航
 class LeftNav extends Component {
  /* 根据菜单的数据数组（menuList）来生成标签数组（SubMenu/Item）,用reduce方法+递归 */
  //自定义得到标签数组的方法
  getMenuNodes2=(menuList)=>{
    //当前请求的path
    const  path=this.props.location.pathname
    //用reduce遍历数据数组的每一项,reduce第三个参数初始值是个空数组，返回的pre会添加到里面
       return menuList.reduce((pre,item)=>{
       //判断数据数组的每一项里是否有children 如果没有然后再向pre中添加Item
       if(!item.children){
         pre.push(
          <Item key={item.key}>
          <Link to={item.key}>
            <Icon type={item.icon} />
            <span>{item.title}</span>
          </Link>
        </Item>
         )
       }else{
         //如果里面有children，则当前某项item的children的key与当前请求的path相同，则当前item的key就是openkey
        const cItem=item.children.find(cItem=>cItem.key===path)
         if (cItem) {
           // 保存openKey到组件对象上
           this.openKey = item.key
        } 
      //如果里面有children,则向pre中添加SubMenu
        pre.push(
        <SubMenu
          key={item.key}
          title={
            <span>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </span>
          }
        >
            {//递归，调用自定义得到标签数组的方法，看看数组item.children中有没有children
            this.getMenuNodes2(item.children)
          }
        </SubMenu>
        )
        }
     //返回pre  最终返回的是最后一次调用的结果
     return pre
       }, [])   
  }
  
  //根据菜单的数据数组（menuList）来生成标签数组（SubMenu/Item）,用map方法+递归做
  //自定义得到标签数组的方法
  getMenuNodes=()=>{
    //遍历菜单数据数组的每一项
    return menuList.map((item,index)=>{
//如果遍历的该项里没children,则返回<Item>
   if(!item.children){
     return (
       <Item key={item.key}>
         <Link to={item.key}>
           <Icon type={item.icon} />
           <span>{item.title}</span>
         </Link>
       </Item>)
   }else{
 //如果遍历的该项里有children,则返回<SubMenu>
     return (
       <SubMenu
         key={item.key}
         title={
           <span>
             <Icon type={item.icon} />
             <span>{item.title}</span>
           </span>
         }
       >
         {//递归，调用自定义得到标签数组的方法,看看数组item.children中有没有children
           this.getMenuNodes(item.children)
         }
       </SubMenu>
     )
   }
    })
  }


   /* 
     在第一次render()之前执行
       1). 同步操作
       2). 第一次render()就需要
     */
   componentWillMount() {
     //组件挂载前就取到所有的menuList
     this.menuNodes = this.getMenuNodes2(menuList)
   }


  render() {
    // 得到请求的路由路径
    const path = this.props.location.pathname
    return (
      <div className="left-nav">
        <Link to="/home" className="left-nav-header">
          <img src={logo} alt="logo" />
          <h1>硅谷后台</h1>
        </Link>

        {/* antd里的样式 */}
        <Menu
          theme="dark"
          mode="inline"
          /* defaultSelectedKeys={[path]} */ /* 只有第一次指定的有效 */
          /* selectedKeys 当前选中的菜单项 key数组 */
          selectedKeys={[path]}
          /*defaultOpenKeys初始展开的SunMenu菜单项key数组*/
          defaultOpenKeys={[this.openKey]}
        >
          {
            this.menuNodes
          }
        </Menu>
      </div>
    
    )
  }
}
//withRouter将非路由组件包装成路由组件，并产生一个新组件
//新组件会向LeftNav组件传递3个属性: history/location/match
export default withRouter(LeftNav)