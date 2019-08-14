/* 操作local数据的工具函数模块  封装两个函数即保存和读取user的函数*/
//保存user
import store from 'store'
const USER_KEY='user_key'
//export const saveUser=(user)=>localStorage.setItem('user_key',JSON.stringify(user))
export const saveUser = (user) => store.set(USER_KEY,user)
//读取user
//export const getUser=()=>JSON.parse(localStorage.getItem('user_key')||'{}')
export const getUser = (user) => store.get(USER_KEY) || {}

/* 
删除user
*/
export const removeUser = () => store.remove(USER_KEY)
