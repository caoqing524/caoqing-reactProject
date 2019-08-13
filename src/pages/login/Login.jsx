import React, { Component } from 'react';
import { Form, Icon, Input, Button,message } from 'antd';
import {reqLogin} from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import { saveUser } from '../../utils/storageUtils'
import "./login.less"
import logo from './images/logo.png';


const Item = Form.Item

// 登录路由组件
 class Login extends Component {

  handleSubmit = e => {
    //取消默认行为
    e.preventDefault();
   // const values=this.props.form.getFieldsValue()
    //const username=this.props.form.getFieldValue('username')
    //const password=this.props.form.getFieldValue('password')
    //console.log(values)

    //对表单的所有字段进行统一验证
    this.props.form.validateFields(async (err,values)=>{
    if(!err){//校验成功
      console.log(values);
     // alert(`发送登录的Ajax请求，username=${values.username},password=${values.password}`)
     const  result=await reqLogin(values)
       if(result.status===0){
         //登录请求成功
         //得到user
         const user=result.data
         //保存user 保存到local
         //localStorage.setItem('user_key',JSON.stringify('user'))
         saveUser(user)
         //保存到内存
         memoryUtils.user=user
       //登录请求成功后跳转到admin
       this.props.history.replace('/admin')
       }else{
         //登录请求失败
         message.error(result.msg)
       }
    }
    })
  };

  // 对密码进行自定义验证，callback必须调用
  validatePwd=(rule,value,callback)=>{
    value=value.trim()
    if(!value){
      callback('密码必须输入')
    }else if(value.length<4){
      callback('密码不能小于4位')
    }else if(value.length>12){
      callback('密码不能大于12位')
    }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
     callback('用户名必须是英文、数字或下划线组成')
    }else{
      callback()//验证通过
    }
  }

  render() {
    const { getFieldDecorator}=this.props.form
    return (
      <div className="login">
        <div className="login-header">
          <img src={logo} alt="logo" />
          <h1>后台管理系统</h1>
        </div>
        <div className="login-content">
          <h1>用户登录</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">

          <Form.Item>
            {/*声明式验证，使用库写好的规则进行验证*/}
          {getFieldDecorator('username', {
           initialValue:'',//初始值
           rules: [
              { required: true,whitespace:true, message: '用户名是必须的' },
              {min:4,message:'用户名不能小于4位'},
              {max:12,message:'用户名不能大于12位'},
              {pattern:/^[a-zA-Z0-9_]+$/,message:'用户名必须是英文、数字或下划线组成'}
            ]
          })(
            <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="用户名"
              />
          )}
        </Form.Item>

            <Form.Item>
              {getFieldDecorator('password',{
                initialValue:'',//初始值
                rules:[
                   {validator:this.validatePwd}
                  ]
              })(<Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="密码"
              />)}
              
        </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
          </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const WrappedLoginForm = Form.create()(Login);// 组件名 <Form(Login)></Form(Login)>,该组件内部会渲染Login标签
//<Form(Login)>包裹后，会给Login传入一个form对象 <Login form={}></Login> 该form对象里有很多方法
//WrappedLoginForm 也是个组件，它包裹着一个组件，最终产生了一个新的组件
export default WrappedLoginForm