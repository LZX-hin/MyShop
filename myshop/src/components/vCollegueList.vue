<template>
  <div>
    <div class="container">
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        size="mini"
        @click="addCollegue"
      >添加新员工</el-button>
      <div class="table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="position" label="职位" width="180"></el-table-column>
          <el-table-column prop="number" label="工号"></el-table-column>
          <el-table-column prop="phoneNumber" label="联系电话"></el-table-column>
          <el-table-column prop="address" label="家庭住址"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
            <el-button @click="open(scope.row)" type="text" size="small">删除</el-button>
            </template>
            <!-- <template slot-scope="scope"> -->
              <!-- <el-button size="mini" type="danger" @click="open">删除</el-button> -->
            <!-- </template> -->
          </el-table-column>
        </el-table>
      </div>
      <div class="footer">
        <!-- <el-pagination layout="prev, pager, next" :total="50"></el-pagination> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    open(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("http://127.0.0.1:3000/api/deleteOneCollegue", row)
            .then(() => {
              this.$axios
                .get("http://127.0.0.1:3000/api/collegueList")
                .then(result => {
                  let finalData = result.data.result.filter(item => {
                    if (item.isShow === "true") {
                      return item;
                    }
                  });
                  this.tableData = finalData;
                });
            });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
    },
    // delOneCollegue(row) {
    //   console.log(row);
    // },
    addCollegue() {
      this.$router.push("/addCollegue");
    }
  },
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.$axios.get("http://127.0.0.1:3000/api/collegueList").then(result => {
      let finalData = result.data.result.filter(item => {
        if (item.isShow === "true") {
          return item;
        }
      });
      this.tableData = finalData;
    });
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 99%;
  margin: 10px auto 0;
}
.footer {
  position: absolute;
  bottom: 20px;
  left: 50%;
}
</style>