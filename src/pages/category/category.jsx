import React, { Component } from 'react'
import {Card,Button,Icon,Table,Modal,message} from 'antd'
import { reqCategorys, reqAddCategory, reqUpdateCategory  } from "../../api/index";
import  LinkButton  from '../../components/link-button';

import CategoryForm from './category-form'
/**
 * 分类管理
 */

 
export default class Category extends Component {
 //初始化状态
 state={
 categorys:[],
 loading:false,
 showStatus:0//0 都不显示，1 显示添加 2 显示修改

 }



//定义一个异步获取所有分类列表显示的函数，即等 获取所有商品分类的列表的请求完毕
getCategorys=async()=>{
  this.setState({loading:true})
  //调用获取所有商品分类的列表的请求接口函数
 let result= await reqCategorys()
 //请求结束loading为false
  this.setState({ loading: false })
 //判断请求状态
 if(result.status===0){
   const categorys=result.data
     //更新状态
     this.setState({categorys})
 }

}

  //组件挂载完毕 调用获取所有分类列表显示的函数
  componentDidMount() {
    this.getCategorys()
  }


//初始化Table的所有列的数组
initColumns=()=>{
  const columns = [
    {
      title: '分类的名称',
      dataIndex: 'name'
    },
    {
      width: 300,
      title: '操作',
      render: (category) => ( // 渲染当前行时会自动传入当前行对应的数据对象
       //点击按钮显示修改界面
        <LinkButton
          onClick={() => this.showUpdate(category)}
        >
          修改分类
          </LinkButton>
      )
     
    }

  ]
}

componentWillMount() {
  this.initColumns()
}

  /* 
    点击按钮显示添加界面
    */
  showAdd = () => {
    this.setState({
      showStatus: 1
    })
  }

  /* 
  点击按钮显示修改界面
  */
  showUpdate = (category) => {
    // 保存category到组件对象上
    this.category = category

    // 更新状态显示修改界面
    this.setState({
      showStatus: 2
    })
  }

  /* 
   父组件中 定义接收子组件传来的参数数据form并保存到组件对象上
    */
  setForm = (form) => {
    this.form = form
  }


//更新分类
updateCateogory=()=>{
  //1.表单验证
  this.form.validateFields(async (error, values) => {
    if (!error) {
      // 重置输入框的值(变为初始值)
      this.form.resetFields()

      // 隐藏修改界面
      this.setState({
        showStatus: 0
      })
    //收集数据
      const categoryId = this.category._id
      const categoryName = values.categoryName
      //异步 发请求
      const result = await reqUpdateCategory(categoryId, categoryName)
      //判断请求成功与否
      if (result.status === 0) {
        message.success('修改分类成功')
        // 显示最新列表
        this.getCategorys()
      } else {
        message.error('修改失败: ' + result.msg)
      }
    }
  })
}


//添加分类
addCategory=()=>{
  // 1. 进行表单验证
   //此时在该处可以直接用this.form了，因为当前组件对象上已经有form了
  this.form.validateFields(async (error, values) => {
    if (!error) { // 无错误则验证通过了

      // 重置输入框的值(变为初始值)
      //因为如果手动输入了新值，再点添加分类就显示的是手动输入的值了，则再指定新的默认值是无效的
      this.form.resetFields()

      // 隐藏添加界面
      this.setState({
        showStatus: 0
      })

      // 2. 收集数据 values收集的数据是个对象形式的
      const categoryName = values.categoryName

      // 3. 发请求添加 异步等待 等请求发完
      const result = await reqAddCategory(categoryName)
      // 4. 根据请求结果做不同处理
      if (result.status === 0) {
        message.success('添加分类成功')
    // 显示最新列表 调用前面的异步获取所有分类列表显示的函数
        this.getCategorys()
      } else {
        // result.msg显示具体的错误信息
        message.error('添加失败: ' + result.msg)
      }
    }
  })
}

//隐藏对话框
handleCancel=()=>{
  // 重置输入数据
  this.form.resetFields()
  this.setState({showStatus:0})
}
  render() {
    //发完请求得到数据后要取`出数据
    const { categorys, loading,showStatus}=this.state
    // 取出当前需要修改的分类
    const category = this.category || {} // 避免初始render时报错
    
    const extra=(
      //点击按钮时显示添加
      <Button type='primary' onClick={this.showAdd}>
        <Icon type='plus'/>
        添加
      </Button>
      
    )
    return (
      <Card extra={extra}>
        <Table
         //属性值是true时，可以省略不写
          bordered
          loading={loading}
          rowKey="_id"
          dataSource={categorys}
          columns={this.columns}
          pagination={{ pageSize: 5, showQuickJumper: true }}
        />

        <Modal
          title="修改分类"
          visible={showStatus === 2}
          onOk={this.updateCateogory}
          onCancel={this.handleCancel}
        >
          {/* 将父组件定义的函数setForm以标签属性形式传递给子组件CategoryForm */}
          <CategoryForm categoryName={category.name} setForm={this.setForm} />
        </Modal>

        <Modal
          title="添加分类"
          visible={showStatus === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          <CategoryForm setForm={this.setForm} />
        </Modal>
      </Card>
    
    )
  }
}
