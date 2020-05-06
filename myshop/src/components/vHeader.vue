<template>
  <div>
    <header class="top-nav" v-if="$store.state.showBar">
      <div class="container">
        <div class="logo">MY-SHOP</div>
        <div class="rightIcon">
          <div class="link">
            <span class="iconfont icon-cart-icon" @click="toCart"></span>
            <span class="iconfont icon-xinfeng" @click="toAnnouncement"></span>
            <a href="https://github.com/LZX-hin" class="iconfont icon-GitHub"></a>
          </div>
          <div class="user" v-if="ifToken">
            <div class="pic">
              <img src="../assets/1.jpg" alt />
            </div>
            <div class="logout">
              <el-button size="mini" type="text" @click="logout">退出</el-button>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ifToken: true
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$store.commit('toggleIfToken',false);
      this.$store.commit('ButtonDisabledTrue');
      this.$store.commit('hideBar');
      this.$router.push("/login");
    },
    toCart(){
      this.$router.push('/cart')
    },
    toAnnouncement(){
      this.$router.push('/announcement');
    }
  },
  watch:{
      '$store.state.ifToken'(newV){
          this.ifToken = newV;
      }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 95%;
  margin: 0 auto;
  // position: relative;
}
.top-nav {
  position: relative;
  height: 70px;
  width: 100%;
  background-color: #1c2438;
  .logo {
    float: left;
    font-size: 26px;
    line-height: 70px;
    color: #378af3;
  }
  .rightIcon {
    float: right;
    overflow: hidden;
    .link {
      float: right;
      margin-top: 22px;
      overflow: hidden;
      a {
        color: #2d8cf0;
        font-size: 22px;
        // margin-right: 10px;
      }
      span{
        display: inline-block;
        // font-size: 30px;
        color: #2d8cf0;
        margin-right: 25px;
        cursor: pointer;
        &:nth-child(1){
          font-size: 22px;
        }
        &:nth-child(2){
          font-size: 22px;
        }
      }
    }
    .user {
      float: right;
      overflow: hidden;
      .pic {
        float: left;
        margin-top: 15px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
      .logout {
        float: left;
        margin-top: 21px;
        margin-left: 10px;
        margin-right: 30px;
      }
    }
  }
}
</style>