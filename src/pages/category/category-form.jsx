import React, { Component } from 'react';
import { Form,Input } from "antd";
//import PropTypes from 'prop-types';
import PropTypes from 'prop-types'
const Item=Form.Item
//分类添加或修改的表单组件
 class CategoryForm extends Component {
//添加上组件类对象本身上的

   static propTypes = {
     categoryName: PropTypes.string,
     setForm: PropTypes.func.isRequired
   }
   componentWillMount() {
     //子组件接收父组件以props形式传来的setForm函数，并传入实参(this.props.form) 
     this.props.setForm(this.props.form) //传入实参后 将form交给父组件(Category)
   }

  render() {
    const {categoryName}=this.props
   // 结构赋值取到CategoryForm组件的props上的强大的form对象里的方法之一
    const {getFieldDecorator}=this.props.form
    return (
      <Form>
        <Item>
        {
         getFieldDecorator('categoryName',{
            initialValue:categoryName||'',
            rules:[{required:true,message:'分类名称是必须的'}
          ]
          })(
             <Input type='text' placeholder='分类名称'/>
             )
        }
        </Item>
      </Form>
    )
  }
}
//Form.create()(CategoryForm)包裹完后会给CategoryForm组件传递一个强大的form对象，里面有很多方法可用
export default Form.create()(CategoryForm)