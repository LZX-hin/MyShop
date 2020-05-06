<template>
  <div>
    <div class="goods-list-header">
      <div class="search-block">
        <span>搜索商品：</span>
        <el-input v-model="searchStr" placeholder="请输入商品名称" @input="onSearch"></el-input>
      </div>
      <div class="tag-list">
        <el-tag size="mini" type="info">全部商品</el-tag>
        <el-tag size="mini" type="info">休闲零食</el-tag>
        <el-tag size="mini" type="info">酒水饮料</el-tag>
        <el-tag size="mini" type="info">粮油副食</el-tag>
        <el-tag size="mini" type="info">生鲜水果</el-tag>
      </div>
    </div>
    <div class="tabs">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="所有商品" name="allGoods">
          <div class="item" v-for="(item,index) in onSearch()" :key="index">
            <div class="pic">
              <img :src="item.img" alt="不能正常显示" />
            </div>
            <div class="goods-name">{{item.name}}</div>
            <div class="others">
              <div class="price">￥{{item.price}}</div>
              <div class="count">库存{{item.count}}</div>
            </div>
            <div class="addToCart">
              <!-- <img src="../assets/plus.jpg" alt /> -->
              <div class="text">请填写数量:</div>
              <div class="inp">
                <el-input v-model="item.cartCount" size="small"></el-input>
              </div>
              <div class="btn">
                <el-button
                  @click="addToCart([item.name,item.number,item.price,item.cartCount,item.count])"
                  type="primary"
                  size="mini"
                >加入到购物车</el-button>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="休闲零食" name="goodsCate1">
          <div class="item" v-for="(item,index) in goodsCate1()" :key="index">
            <div class="pic">
              <img :src="item.img" alt="不能正常显示" />
            </div>
            <div class="goods-name">{{item.name}}</div>
            <div class="others">
              <div class="price">￥{{item.price}}</div>
              <div class="count">库存{{item.count}}</div>
            </div>
            <div class="addToCart">
              <!-- <img src="../assets/plus.jpg" alt /> -->
              <div class="text">请填写数量:</div>
              <div class="inp">
                <el-input v-model="item.cartCount" size="small"></el-input>
              </div>
              <div class="btn">
                <el-button
                  @click="addToCart([item.name,item.number,item.price,item.cartCount])"
                  type="primary"
                  size="mini"
                >加入到购物车</el-button>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="酒水饮料" name="goodsCate2">
          <div class="item" v-for="(item,index) in goodsCate2()" :key="index">
            <div class="pic">
              <img :src="item.img" alt="不能正常显示" />
            </div>
            <div class="goods-name">{{item.name}}</div>
            <div class="others">
              <div class="price">￥{{item.price}}</div>
              <div class="count">库存{{item.count}}</div>
            </div>
            <div class="addToCart">
              <!-- <img src="../assets/plus.jpg" alt /> -->
              <div class="text">请填写数量:</div>
              <div class="inp">
                <el-input v-model="item.cartCount" size="small"></el-input>
              </div>
              <div class="btn">
                <el-button
                  @click="addToCart([item.name,item.number,item.price,item.cartCount])"
                  type="primary"
                  size="mini"
                >加入到购物车</el-button>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="粮油副食" name="goodsCate3">
          <div class="item" v-for="(item,index) in goodsCate3()" :key="index">
            <div class="pic">
              <img :src="item.img" alt="不能正常显示" />
            </div>
            <div class="goods-name">{{item.name}}</div>
            <div class="others">
              <div class="price">￥{{item.price}}</div>
              <div class="count">库存{{item.count}}</div>
            </div>
            <div class="addToCart">
              <!-- <img src="../assets/plus.jpg" alt /> -->
              <div class="text">请填写数量:</div>
              <div class="inp">
                <el-input v-model="item.cartCount" size="small"></el-input>
              </div>
              <div class="btn">
                <el-button
                  @click="addToCart([item.name,item.number,item.price,item.cartCount])"
                  type="primary"
                  size="mini"
                >加入到购物车</el-button>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="生鲜水果" name="goodsCate4">
          <div class="item" v-for="(item,index) in goodsCate4()" :key="index">
            <div class="pic">
              <img :src="item.img" alt="不能正常显示" />
            </div>
            <div class="goods-name">{{item.name}}</div>
            <div class="others">
              <div class="price">￥{{item.price}}</div>
              <div class="count">库存{{item.count}}</div>
            </div>
            <div class="addToCart">
              <!-- <img src="../assets/plus.jpg" alt /> -->
              <div class="text">请填写数量:</div>
              <div class="inp">
                <el-input v-model="item.cartCount" size="small"></el-input>
              </div>
              <div class="btn">
                <el-button
                  @click="addToCart([item.name,item.number,item.price,item.cartCount])"
                  type="primary"
                  size="mini"
                >加入到购物车</el-button>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="日常洗护" name="goodsCate5">
          <div class="item" v-for="(item,index) in goodsCate5()" :key="index">
            <div class="pic">
              <img :src="item.img" alt="不能正常显示" />
            </div>
            <div class="goods-name">{{item.name}}</div>
            <div class="others">
              <div class="price">￥{{item.price}}</div>
              <div class="count">库存{{item.count}}</div>
            </div>
            <div class="addToCart">
              <!-- <img src="../assets/plus.jpg" alt /> -->
              <div class="text">请填写数量:</div>
              <div class="inp">
                <el-input v-model="item.cartCount" size="small"></el-input>
              </div>
              <div class="btn">
                <el-button
                  @click="addToCart([item.name,item.number,item.price,item.cartCount])"
                  type="primary"
                  size="mini"
                >加入到购物车</el-button>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="厨卫用品" name="goodsCate6">
          <div class="item" v-for="(item,index) in goodsCate6()" :key="index">
            <div class="pic">
              <img :src="item.img" alt="不能正常显示" />
            </div>
            <div class="goods-name">{{item.name}}</div>
            <div class="others">
              <div class="price">￥{{item.price}}</div>
              <div class="count">库存{{item.count}}</div>
            </div>
            <div class="addToCart">
              <!-- <img src="../assets/plus.jpg" alt /> -->
              <div class="text">请填写数量:</div>
              <div class="inp">
                <el-input v-model="item.cartCount" size="small"></el-input>
              </div>
              <div class="btn">
                <el-button
                  @click="addToCart([item.name,item.number,item.price,item.cartCount])"
                  type="primary"
                  size="mini"
                >加入到购物车</el-button>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "allGoods",
      goodsList: [],
      searchStr: ""
    };
  },
  methods: {
    // 添加到购物车
    addToCart([name, number, price, cartCount, count]) {
      let goodsObj = {
        name,
        number,
        cartCount,
        price,
        count
      };
      // console.log(goodsObj);
      this.$store.commit("addToCart", goodsObj);
      this.$message({
        message: "成功添加到购物车！",
        type: "success"
      });
    },
    // 搜索商品
    onSearch() {
      return this.goodsList.filter(item => item.name.includes(this.searchStr));
      // console.log(searchResult);
    },
    // 显示 休闲零食
    goodsCate1() {
      return this.goodsList.filter(item => item.cate.includes("休闲零食"));
    },
    // 显示 酒水饮料
    goodsCate2() {
      return this.goodsList.filter(item => item.cate.includes("酒水饮料"));
    },
    // 显示 粮油副食
    goodsCate3() {
      return this.goodsList.filter(item => item.cate.includes("粮油副食"));
    },
    // 显示 生鲜水果
    goodsCate4() {
      return this.goodsList.filter(item => item.cate.includes("生鲜水果"));
    },
    // 显示 日常洗护
    goodsCate5() {
      return this.goodsList.filter(item => item.cate.includes("日常洗护"));
    },
    // 显示 厨卫用品
    goodsCate6() {
      return this.goodsList.filter(item => item.cate.includes("厨卫用品"));
    }
  },
  created() {
    this.$axios.get("http://127.0.0.1:3000/api/showGoods").then(result => {
      // console.log(result);
      let data = result.data.result;
      for (let i = 0; i < data.length; i++) {
        data[i]["cartCount"] = 1;
      }
      // console.log(data);
      this.goodsList = data;
      // console.log(this.goodsList);
    });
  }
};
</script>

<style lang="scss" scoped>
.goods-list-header {
  overflow: hidden;
  .search-block {
    width: 50%;
    margin: 10px auto 10px;
    .el-input {
      width: 75%;
      margin-right: 2%;
    }
  }
  .tag-list {
    width: 50%;
    margin: 0 auto;
    .el-tag {
      margin-right: 2%;
    }
  }
}
.tabs {
  width: 95%;
  margin: 20px auto 0;
  .item {
    position: relative;
    float: left;
    width: 200px;
    height: 290px;
    // margin: 3px;
    margin-left: 5px;
    margin-right: 50px;
    margin-top: 30px;
    border: 1px solid #ccc;
    box-shadow: 10px 10px 10px #ccc;
    &:hover {
      .addToCart {
        // display: block;
        opacity: 1;
      }
    }
    .addToCart {
      opacity: 0;
      position: absolute;
      z-index: 1000;
      top: -5px;
      left: -5px;
      width: 212px;
      height: 302px;
      background-color: rgba(0, 0, 0, 0.2);
      transition: all 0.3s;
      cursor: pointer;
      // img {
      //   position: absolute;
      //   z-index: 1;
      //   top: 50%;
      //   left: 50%;
      //   transform: translate(-50%, -50%);
      //   width: 70px;
      //   height: 70px;
      //   border-radius: 50%;
      //   overflow: hidden;
      // }
      .text {
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        font-weight: bold;
      }
      .inp {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 40%;
        input {
          width: 50%;
          float: left;
        }
      }
      .btn {
        position: absolute;
        top: 70%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .pic {
      width: 92%;
      height: 200px;
      margin: 4% auto 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .goods-name {
      margin-left: 4%;
      font-size: 14px;
    }
    .others {
      overflow: hidden;
      width: 92%;
      margin: 20px auto 0;
      .price {
        float: left;
        font-size: 14px;
        font-weight: bold;
      }
      .count {
        float: right;
        font-size: 12px;
      }
    }
  }
}
</style>