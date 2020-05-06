<template>
  <div id="app">
    <v-header></v-header>
    <div class="main">
      <v-side-nav :mainRightHeight = "mainRightHeight" :mainRight="mainRight"></v-side-nav>
      <div class="main-right" ref="mainRight">
        <router-view></router-view>
      </div>
    </div>
    <!-- <v-footer></v-footer> -->
  </div>
</template>
<script>
import vHeader from "./components/vHeader";
import vSideNav from "./components/vSideNav";
// import vFooter from "./components/vFooter";
export default {
  data() {
    return {
      mainRightHeight: null,
      mainRight: null
    };
  },
  mounted() {

  },
  methods: {},
  components: {
    vHeader,
    vSideNav,
    // vFooter
  }
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.main {
  height: 100%;
  overflow: hidden;
}
.main-right {
  margin-left: 200px;
  // height: 800px;
  // overflow-y: scroll;
}
</style>
