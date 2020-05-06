<template>
  <div>
    <div class="container">
      <h4>消息通知</h4>
      <div class="table">
        <el-table :data="tableData">
          <el-table-column prop="addTime" label="日期" align="left"></el-table-column>
          <el-table-column prop="event" label="详情" align="center"></el-table-column>
          <el-table-column prop="operation" label="操作" align="center">
            <!-- <el-button size="mini" type="warning" plain @click="handleClick(scope.row)">删除</el-button> -->
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    handleClick(row) {
      //点击删除按钮之后请求接口，后台修改数据库数据
      this.$axios
        .post("http://127.0.0.1:3000/api/deleteOneTimeData", row)
        .then(() => {
          // 再次请求，获取timeData数据渲染到页面
          this.$axios
            .get("http://127.0.0.1:3000/api/getTimeData")
            .then(result => {
              const newGetData = result.data.result.map(item => {
                //判断添加了新员工还是添加了新商品
                if (item.event.indexOf("员工") > -1) {
                  item.event = "添加了新员工" + item.name;
                  return item;
                } else {
                  item.event =
                    "添加了新商品：" + item.name + "，编号为：" + item.number;
                  return item;
                }
              });
              let finalData = newGetData.filter(item => {
                if (item.isShow === "true") {
                  return item;
                }
              });
              this.tableData = finalData;
            });
        });
    }
  },
  created() {
    this.$axios.get("http://127.0.0.1:3000/api/getTimeData").then(result => {
      //   const now = new Date();
      //   console.log(now.getTime());
      const newGetData = result.data.result.map(item => {
        //判断添加了新员工还是添加了新商品
        if (item.event.indexOf("员工") > -1) {
          item.event = "添加了新员工" + item.name;
          return item;
        } else {
          item.event = "添加了新商品" + item.name + "编号为：" + item.number;
          return item;
        }
      });
      let finalData = newGetData.filter(item => {
        if (item.isShow === "true") {
          return item;
        }
      });
      //   console.log(finalData);
      this.tableData = finalData;
      //   console.log(this.newGetData);
    });
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 98%;
  margin: 10px auto 0;
  overflow: hidden;
}
</style>