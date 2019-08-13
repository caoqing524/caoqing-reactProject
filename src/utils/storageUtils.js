/* 操作local数据的工具函数模块  封装两个函数即保存和读取user的函数*/
//保存user
export const saveUser=(user)=>localStorage.setItem('user_key',JSON.stringify(user))
//读取user
export const getUser=()=>JSON.parse(localStorage.getItem('user_key')||'{}')

