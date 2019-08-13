import {getUser} from './storageUtils'
const user=getUser()
//const user=JSON.parse(localStorage.getItem('user_key')||'{}')
export default{
    //从local中读取user，保存在内存中
    user
}


/* import { getUser } from "./storageUtils";

// 读取local中保存的user
const user = getUser()

export default {
  // 从local读取user, 保存在内存中
  user
} */