import service from "./index"
interface loginData{
    username:string,
    password:string,
}
//登录接口
export function login(data:loginData) {
    //最终调用login方法发axios请求后返回的是一个promise对象
    return service({
        url: "/login",
        method: "post",
        data,
    })
}
//商品列表接口
export function getGoodsList(){
    return service({
        url:"/getGoodsList",
        method:"get"
    })
}