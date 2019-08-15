//商品管理的默认首页子路由
import React, { Component } from 'react';
import {Card,Select,Input,Button,Icon,Table  } from "antd";

import LinkButton from '../../components/link-button'
import { reqProducts } from "../../api/index";
import { PAGE_SIZE } from '../../utils/constants'



const Option=Select.Option
export default class ProductHome extends Component {
  //初始化状态
  state={
    products:[],//当前页的product数组，当前页有多少条数据
    total:0,//product的总数量
  }

//定义初始化Table的所有列的数组的方法
  initColumns=()=>{
    this.columns=[
      {title:'商品名称',
       dataIndex:'name'
    },
    {
      title: '商品描述',
      dataIndex: 'desc'
    },
    {
      title:'价格',
      dataIndex:'price',
     render:price=>`￥${price}`
    },
    {
      title: '状态',
      width: 100,
      dataIndex: 'status',
      render: status => {
        if (status === 1) {
          return (
            <span>
              <Button type="primary">下架</Button>
              <span>在售</span>
            </span>
          )
        } else {
          return (
            <span>
              <Button type="primary">上架</Button>
              <span>已下架</span>
            </span>
          )
        }
      }
    },

      {
        title: '操作',
        width: 100,
        render: product => (
          <span>
            <LinkButton>详情</LinkButton>
            <LinkButton>修改</LinkButton>
          </span>
        )
      }

    ]
  }

  //组件将要挂载
  componentWillMount() {
    this.initColumns()
  }

//定义一个异步获取指定页码的商品列表显示的方法，在里面发送请求
 getProducts=async (pageNum)=>{
   //发送请求
   let result = await reqProducts(pageNum, PAGE_SIZE)

//判断请求状态
if(result.status===0){
  //结构赋值取到请求来的result.data里的当前页的product数组和product的总数量
  const {total,list}=result.data
 //更新数据状态
 this.setState({
   total:total,
   products:list,
 })


}
 }

 //组件挂载完毕调用该方法
 componentDidMount() {
   this.getProducts()
 }
 
  render() {
 //获取状态
 const {products,total}=this.state

    //Card头部左侧
    const title=(
      <span>
        <Select value='2' style={{ width: 200}}>
          <Option value='1'>按名称搜索</Option>
          <Option value='2'>按描述搜索</Option>
        </Select>
        <Input type='text' style={{ width: 200, margin: '0 15px' }} placeholder='关键字'></Input>
        <Button type='primary'>搜索</Button>
      </span>
    )


    //Card头部右侧

    const extra = (
      <Button type="primary">
        <Icon type="plus"></Icon>
        添加商品
      </Button>
    )

    return (
      <Card title={title} extra={extra}>
        <Table
        //边框
          bordered
          //当前表格的id值
          rowKey="_id"
          dataSource={products}
          columns={this.columns}
          pagination={{
            pageSize: PAGE_SIZE,
            total,
            //onChange的值是个回调函数，当页面改变时触发该回调函数执行
            /* onChange: (page) => {this.getProducts(page)} */
           //下面的写法作用同上
            onChange: this.getProducts
          }}
        />
      </Card>
    );
  }
}
