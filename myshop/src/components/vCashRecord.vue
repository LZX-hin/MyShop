<template>
  <div>
    <div class="container">
      <h4>收银记录</h4>
      <div class="table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="addTime" label="收银时间" align="center"></el-table-column>
          <el-table-column prop="operator" label="收银员" align="center"></el-table-column>
          <el-table-column prop="totalCount" label="合计数量" align="center"></el-table-column>
          <el-table-column prop="totalCashier" label="收银金额 (元)" align="center"></el-table-column>
          <el-table-column prop="payWay" label="付款方式" align="center"></el-table-column>
          <el-table-column prop label="操作" align="center" width="80">
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="check(scope.row)">查看</el-button>
              <el-dialog title="收银详情" :visible.sync="dialogTableVisible">
                <el-table :data="dialogContent">
                  <el-table-column property="number" label="商品编号" align="center"></el-table-column>
                  <el-table-column property="name" label="商品名称" align="center"></el-table-column>
                  <el-table-column property="cartCount" label="数量" align="center"></el-table-column>
                  <el-table-column property="price" label="商品单价 (元)" align="center"></el-table-column>
                  <el-table-column property="totalCashier" label="合计 (元)" align="center"></el-table-column>
                </el-table>
              </el-dialog>
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
      tableData: [],
      dialogTableVisible: false,
      showTable: [], // 点击查看按钮显示的表格内容
      dialogContent: [] // 对话框的表格内容
    };
  },
  methods: {
    objectSpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    check(row) {
      // console.log(row);
      this.dialogContent = JSON.parse(row.goodsList);
      for (let i = 0; i < this.dialogContent.length; i++) {
        this.dialogContent[i].totalCashier =
          this.dialogContent[i].cartCount *
          parseFloat(this.dialogContent[i].price);
      }
      // console.log(this.dialogContent);
      this.dialogTableVisible = true;
    }
  },
  created() {
    this.$axios
      .get("http://127.0.0.1:3000/api/getCashierRecord")
      .then(result => {
        // console.log(result.data.result);
        this.tableData = result.data.result;
      });
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 98%;
  margin: 10px auto 0;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>