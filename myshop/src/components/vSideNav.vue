<template>
  <div class="bg">
    <div class="main-left" v-if="$store.state.showBar">
      <el-col :span="3" class="el-col">
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#4a5060"
          text-color="#fff"
          active-text-color="#378af3"
          router
          default-active="/goodsList"
        >
          <el-menu-item index="/goodsList">
            <i class="el-icon-menu"></i>
            <span slot="title">商品列表</span>
          </el-menu-item>
          <el-menu-item index="/addGoods">
            <i class="el-icon-finished"></i>
            <span slot="title">商品入库</span>
          </el-menu-item>
          <el-menu-item index="/cashRecord">
            <i class="el-icon-wallet"></i>
            <span slot="title">收银记录</span>
          </el-menu-item>
          <el-menu-item index="/announcement">
            <i class="el-icon-bell"></i>
            <span slot="title">消息通知</span>
          </el-menu-item>
          <el-menu-item index="dataStatistics">
            <i class="el-icon-s-data"></i>
            <span slot="title">数据统计</span>
          </el-menu-item>
          <el-menu-item index="/collegueList">
            <i class="el-icon-user"></i>
            <span slot="title">人员管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["mainRight"],
  mounted() {}
};
</script>

<style lang="scss" scoped>
.bg {
  width: 200px;
}
.main-left {
  position: absolute;
  top: 0;
  bottom: 0;
  // height: 100%;
  // width: 200px;
}
.el-col {
  position: absolute;
  top: 70px;
  height: 180%;
}
.el-menu {
  width: 200px;
  height: 100%;
}
</style>