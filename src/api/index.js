/* 
包含n个接口请求函数的模块,每个函数的返回值都是promise对象
根据接口文档编写
*/
import jsonp from 'jsonp'
import ajax from './ajax'
import {message} from 'antd'

 // const BASE = 'http://localhost:5000'
 const BASE = ''
//1.登录 一般写法
// export function reqLogin({username,password}){
// return ajax.post('/login',{username,password})
// }
//1.登录 箭头函数的简单写法
 export const reqLogin=({username,password})=>ajax.post('/login',{username,password})
 
 //()=>({name:'tom'}) 如果返回的是对象的话，外面加小括号


//2.添加用户的请求接口函数
export const reqAddUser=(user)=>ajax({
    url:BASE+'/manage/user/add',
    method:'POST',
    data:user
})

/* 
3.获取天气信息(jsonp) 的请求接口函数
*/
export const reqWeather = (city) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`

    return new Promise((resolve, reject) => { // 执行器函数
        jsonp(url, {}, (err, data) => {
            if (!err && data.error === 0) {
                const {
                    dayPictureUrl,
                    weather
                } = data.results[0].weather_data[0]
                resolve({
                    dayPictureUrl,
                    weather
                })
            } else {
                // reject(err)
                message.error('获取天气信息失败!')
            }
        })
    })

}

//4.获取所有商品分类的列表的请求接口函数
//方式一 export const reqCategorys=()=>ajax.get('/manage/category/list')
 //方式二
export  const reqCategorys=()=>ajax({
     method:'GET',
     url: '/manage/category/list'
 })
//方式三 export const reqCategorys = () => ajax(BASE + '/manage/category/list')


//5.添加分类的请求接口函数
export const reqAddCategory = (categoryName) => ajax.post('/manage/category/add', {
    categoryName
})

//6.修改分类的请求接口函数
export const reqUpdateCategory = (categoryId,categoryName) => ajax.post('/manage/category/update', {
   categoryId, categoryName
})

