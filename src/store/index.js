import Vue from 'vue'
import Vuex from 'vuex'
import { getGoods } from '@/api/apis'

Vue.use(Vuex)

export default new Vuex.Store({
    //状态值
    state: {
        goodslist: [], //商品数组
        list: [{ name: '张三', age: 18 }, { name: '李四', age: 20 }, { name: '李四', age: 13 }]
    },
    //改变(不支持任何异步代码,所有请求都不能在此处发送)
    mutations: {
        initGoodsList(state, val) {
            state.goodslist = val   //保存
        },
        //改变商品数量
        changeGoodsCount(state, data){
            // obj.count  obj.name
            for(let obj of state.goodslist){
                for(let food of obj.foods){
                    if(food.name == data.name){
                        //找到了对应的商品！！！对商品数量进行修改
                        food.count += data.count
                        return
                    }
                }
            }
        }
    },
    //可以发出请求的通知
    //action和mutation很像，但是2个区别，1action可以支持所有异步  2action不能直接操作state
    actions: {
        initGoodsList(context) {
            //发送异步请求，拿到数据后，把数据提交给mutation，让它去改变state
            getGoods().then(res => {
                //前端自己添加必要字段
                for(let obj of res.data.data){
                    for(let food of obj.foods){
                        food.count = 0
                    }
                }

                context.commit('initGoodsList', res.data.data)
            })
        }
    },
    //获取者 计算属性： 它就是vuex版的计算属性
    getters: {
        getAdult(state) {
            // var newArr = state.list.filter((val) => {
            //     return val.age >= 18
            // })
            // return newArr

            //简化写法
            return state.list.filter(val => val.age >= 18)
        },
        //获取购物车的列表
        getshopcarlist(state){
            let arr = []

            for(let obj of state.goodslist){
                for(let food of obj.foods){
                    if(food.count > 0){
                        arr.push(food)  //把商品数量>0的数据放入购物车
                    }
                }
            }

            return arr
        }
    }
})