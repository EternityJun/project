import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//使用vuex
//1. 创建store仓库 vuex把所有交互数据都存放在store中
var store = new Vuex.Store({
    //当前仓库保存的值（状态） 记住，自己组件使用的数据还是存放在以前的data中！！要传递的数据才放在此处
    state: {
        obj: {name: '美团蛋糕', price: 20},
        name: '班长123'
    },
    //改变，mutation是改变state值的唯一方式
    mutations: {
        //每一个mutation函数都会接受一个形参，而这个形参就是state本身
        changeName(state, val){
            state.name = val
        }
    }

})    //创建一个仓库实例，最后所有数据都会存放在此仓库内！！！

export default store