import axios from 'axios'

//请求
const req = axios.create({
    baseURL: 'http://172.16.14.254:3000',    //配置服务器IP+端口
    timeout: 10000   //请求超时
    // baseURL: 'http://172.16.14.222:3000',    //张三
    // baseURL: 'http://172.16.14.173:3000',    //李四
    // baseURL: 'http://172.16.14.254:3000',    //配置服务器IP+端口
    // baseURL: 'http://172.16.14.254:3000',    //配置服务器IP+端口
    // baseURL: 'http://172.16.14.254:3000',    //配置服务器IP+端口
    // baseURL: 'http://172.16.14.254:3000',    //配置服务器IP+端口
})

//获取商家信息
export var getSeller = () => {
    return req.get('/api/seller')
}


//获取商品信息
export var getGoods = () => {
    return req.get('/api/goods')
}
