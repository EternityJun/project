<template>
  <div class="container">
    <div class="head">
        <img :src="data.avatar" />
        <h6>{{ data.name }}</h6>
        <p>配送方式：{{ data.description }}</p>
    </div>

    <div class="router-box">
      <router-link to="/" :class="{selceted: curSelectedLab == 0}">
        <span @click="clickTitle(0)">商品</span>
      </router-link>
      <router-link to="/evaluate" :class="{selceted: curSelectedLab == 1,}">
        <span @click="clickTitle(1)">评价</span>
      </router-link>
      <router-link to="/business" :class="{selceted: curSelectedLab == 2}">
        <span @click="clickTitle(2)">商家</span>
      </router-link>
    </div>

    <!-- 中间切换的子页面 -->
    <div class="center">
      <!-- 放置路由出口 -->
      <router-view />
    </div>


    <transition name="slide-fade">
      <div class="shopcar-board" v-show="showBoard">
        <Shopcar/>
      </div>
    </transition>

    <!-- vue事件支持直接书写JS代码，可以不用给一个函数，但是仅限于简短1行代码 -->
    <div class="footer" @click="showBoard = !showBoard">
      <img :src='getIconURL'/>
      <span style="color: #fff">￥：{{ getTotalPrice }}</span>
    </div>
  </div>
</template>

<script>
import { getSeller } from '@/api/apis'
import Shopcar from './modules/Shopcar'

export default {
  data() {
    return {
      curSelectedLab: 0, //当前选中选项卡的序号
      data: {},  //商家信息
      showBoard: false  //购物车面板是否隐藏 true显示 false隐藏
    };
  },
  computed: {
    getIconURL(){
      if(this.$store.getters.getshopcarlist.length > 0)
        return 'http://pic.51yuansu.com/pic2/cover/00/35/32/58119a8584f24_610.jpg'

      return 'http://pic.51yuansu.com/pic2/cover/00/32/47/5810f247bb227_610.jpg'
    },
    getTotalPrice(){
      let price = 0

      for(let obj of this.$store.getters.getshopcarlist){
        price += obj.price * obj.count
      }

      return price
    }
  },
  methods: {
    clickTitle(val) {
      //点击时设置当前选项卡的序号
      this.curSelectedLab = val;
    }
  },
  created(){
      //一进入页面，立即初始化vuex的列表数据
        // this.$store.commit()  //触发mutation
        this.$store.dispatch('initGoodsList')  //触发action(action用法和mutation一模一样，只是触发的东西不同)

    //   req.get('/api/seller').then()
        //获取商家信息
        getSeller().then((res) => {
            this.data = res.data.data   //保存数据
        })
  },
  components: {
    Shopcar
  }
};
</script>

<style lang="less" scoped>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(200px);
  opacity: 0;
}


.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .head {
    height: 130px;
    background-color: salmon;

    img{
        width: 80px;
        height: 80px;

    }
  }

  .router-box {
    display: flex;
    justify-content: space-around;
  }

  .center {
    flex: 1;
    background-color: wheat;
  }


  .shopcar-board{
    // height: 200px;
    width: 100%;
    background-color: #fff;
    position: fixed;
    bottom: 50px;
  }

  .footer {
    height: 50px;
    width: 100%;
    background-color: #141c27;
    position: fixed; //相对于浏览器定位
    bottom: 0px;

    img{
      width: 50px;
      height: 50px;
    }
  }
}

.selceted {
  color: red;
}
</style>