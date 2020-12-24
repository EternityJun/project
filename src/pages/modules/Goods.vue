<template>
  <div class="container">
    <div class="goods_left">
      <!-- 必须在容器元素下放一个ul，而且class必须为content -->
      <ul class="content">
        <!-- 要滚动的元素就放在此ul种 -->
        <div
          :class="{leftBox: true, selected: curSelectedLab === i}"
          v-for="(item,i) in goodslist"
          :key="item.name"
          @click="clickLeftTitle(i)"
        >
          <div class="leftChildBox">
            <p>{{ item.name }}</p>
          </div>
        </div>
      </ul>
    </div>

    <div class="goods_right">
      <ul class="content">
        <div :id="i" v-for="(item,i) in goodslist" :key="item.name + i">
          <h5>{{ item.name }}</h5>

          <div v-for="child in item.foods" :key="child.name">
            <img :src="child.icon" />
            <label>{{ child.name }}</label>
            <button v-show="child.count > 0" @click="clickChangeCount(-1, child.name)">-</button>
            <label v-show="child.count > 0">{{ child.count }}</label>
            <button @click="clickChangeCount(1, child.name)">+</button>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  data() {
    return {
      curSelectedLab: 0 //当前选中的标签
    };
  },
  created() {},
  methods: {
    clickLeftTitle(i) {
      //设置当前选中的索引
      this.curSelectedLab = i;
      //让右侧面板调用scrollToElementg滚动到指定元素上面
      this.rightScroll.scrollToElement(document.getElementById(i), 300);

      //queerySelect不支持数字及字符串类型数字， 所以只能用兼容性最好的getElementById()
      //   document.getElem  queerySelect()  //DOM对象
    },
    clickChangeCount(count, name) {
      this.$store.commit("changeGoodsCount", { count, name });
    }
  },
  mounted() {
    //初始化左侧滚动元素
    //这里需要获取真实DOM元素，所以初始化必须放在mounted中，否则获取不到
    //初始化一个元素为滚动容器
    //参数1：元素选择器（底层使用document.querySelector()实现的） 参数2： 当前容器的配置对象
    this.leftScroll = new BScroll(".goods_left", {
      click: true //派发点击事件(当设置此属性以后，点击事件才会生效)
    }); //初始化左侧

    this.rightScroll = new BScroll(".goods_right", {
      probeType: 3 //让BetterScroll实时派发滚动事件
    }); //初始化右侧

    // console.log(document.getElementById(5).offsetHeight)

    //监听滚动事件， 使用实例对象.on('事件名') 参数1： 事件名  参数2：回调函数
    this.rightScroll.on("scroll", obj => {
      let _y = Math.abs(obj.y);
      // console.log(_y)

      // //高度数组
      // console.log(this.getDivHeight)

      for (let obj of this.getDivHeight) {
        //如果匹配坐标成功，则设置当前选中光标
        if (_y < obj.max && _y >= obj.min) {
          this.curSelectedLab = obj.index;
          // console.log(obj)
          break; //做了想做的事情以后，加上跳出，避免无意义的循环
        }
      }
    });
  },
  computed: {
    //使用计算属性计算DIV高度，极大提升代码性能，避免重复DOM操作引起性能问题
    getDivHeight() {
      let arr = [];

      //计算高度
      for (let i = 0; i < this.goodslist.length; i++) {
        arr.push(document.getElementById(i).offsetHeight);
      }
      //878, 104, 104, 276, 190, 190, 276, 448, 534

      //可以先计算出我想要的区间段，累加高度 { max, min, index }
      let totalHeight = 0; //累加的高度
      let newarr = [];
      for (let n = 0; n < arr.length; n++) {
        newarr.push({ max: arr[n] + totalHeight, min: totalHeight, index: n });
        // {max: 当前div的高度 + 之前累计的高度, min: 之前累加的高度, index: n }
        totalHeight += arr[n]; //每循环一次就把高度加到总高度上
        // {max:  878, min: 0, index: 0},
        // {max: 982 , min: 878, index: 1}
      }
      return newarr;
    },
    goodslist() {
      return this.$store.state.goodslist;
    }
  }
};
</script>

<style lang="less" scoped>
.selected {
  background-color: #fff;
}

.container {
  flex: 1;
  display: flex;
  flex-direction: row;
  background-color: #f4f5f7;

  .goods_left {
    width: 80px;
    height: 300px;
    overflow: auto;

    .leftBox {
      .leftChildBox {
        display: flex;
        align-items: center;
        height: 55px;
        margin: 0 8px;
        border-bottom: 1px solid #d9dce1;
      }
    }
  }

  .goods_right {
    flex: 1;
    height: 400px;
    overflow: auto;
    // background-color: saddlebrown;

    img {
      width: 80px;
      height: 80px;
    }
  }
}
</style>