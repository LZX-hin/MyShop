<template>
  <div>
    <div class="container">
      <h4>购物车</h4>
      <div class="table">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55px"></el-table-column>
          <el-table-column prop="name" label="商品名称" align="center"></el-table-column>
          <el-table-column prop="price" label="商品单价" align="center"></el-table-column>
          <el-table-column prop="cartCount" label="商品数量" width="200px" align="center"></el-table-column>
          <el-table-column prop="cashier" label="商品金额" width="200px" align="center"></el-table-column>
          <el-table-column prop="operation" label="操作" width="100px" align="center">
            <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
          </el-table-column>
        </el-table>
      </div>
      <div class="pay">
        <div class="confirmPay">
          <el-button
            type="primary"
            size="small"
            @click="dialogVisible = true"
            :disabled="disabled"
          >确认结算</el-button>
        </div>
        <el-dialog title="商品结算" :visible.sync="dialogVisible" width="30%">
          <el-collapse accordion>
            <el-collapse-item title="现金支付">
              <div class="box">
                <div class="text">
                  <span>应收</span>
                </div>
                <div class="inp">
                  <el-input size="small" v-model="totalCashier"></el-input>
                </div>
              </div>
              <div class="box">
                <div class="text">
                  <span>实收</span>
                </div>
                <div class="inp">
                  <el-input size="small" v-model="actuallyGet" placeholder="请输入实收金额"></el-input>
                </div>
              </div>
              <div class="box">
                <div class="text">
                  <span>找零</span>
                </div>
                <div class="inp">
                  <el-input size="small" v-model="change" placeholder="现金找零数目"></el-input>
                </div>
              </div>
              <div class="box">
                <el-button
                  @click="toPay"
                  class="confirmPay-dialog"
                  type="success"
                  :disabled="dialogDisabled"
                >确认结算</el-button>
              </div>
            </el-collapse-item>
            <el-collapse-item title="支付宝支付">
              <h4>暂未开发，敬请期待...</h4>
            </el-collapse-item>
            <el-collapse-item title="微信支付">
              <h4>暂未开发，敬请期待...</h4>
            </el-collapse-item>
            <el-collapse-item title="银行卡/信用卡支付">
              <h4>暂未开发，敬请期待...</h4>
            </el-collapse-item>
          </el-collapse>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <!-- <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
          </span>
        </el-dialog>
        <div class="totalCashier">
          合计：
          <span style="color: red;margin-right: 2px;">{{totalCashier}}</span>元
        </div>
        <div class="totalCount">
          共：
          <span style="color: red;margin-right: 2px;">{{totalCount}}</span>件
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [], // 商品列表
      totalCount: null, // 总件数
      totalCashier: null, // 总价格
      CashierMessage: {}, // 收银信息
      dialogVisible: false,
      disabled: true,
      dialogDisabled: true,
      actuallyGet: null // 实收金额
    };
  },
  methods: {
    // 勾选商品
    handleSelectionChange(val) {
      this.multipleSelection = val;
      let curCount = 0;
      let curCashier = 0;
      val.forEach(item => {
        curCount = curCount + item.cartCount;
        curCashier = curCashier + item.cartCount * parseInt(item.price);
      });
      console.log(val);
      this.totalCount = curCount;
      this.totalCashier = curCashier;
    },
    // 确认结算
    toPay() {
      let addTime = new Date();
      addTime = addTime.toLocaleString();
      this.CashierMessage.addTime = addTime;
      this.CashierMessage.totalCount = this.totalCount;
      this.CashierMessage.totalCashier = this.totalCashier;
      this.CashierMessage.operator = "admin";
      this.CashierMessage.payWay = "现金";
      this.CashierMessage.goodsList = [];
      this.multipleSelection.forEach(item => {
        let { name, count, number, price, cartCount } = item;
        let obj = {
          name,
          count,
          number,
          price,
          cartCount,
          addTime
        };
        this.CashierMessage.goodsList.push(obj);
      });
      this.$message({
        message: "结算成功！",
        type: "success"
      });
      this.dialogVisible = false;
      // 结账后更新商品库存
      this.CashierMessage.goodsList = JSON.stringify(
        this.CashierMessage.goodsList
      );
      this.$axios
        .all([
          this.$axios.get(
            `http://127.0.0.1:3000/api/updateGoodsInventory?goodsMessage=${this.CashierMessage.goodsList}`
          ),
          this.$axios.post(
            "http://127.0.0.1:3000/api/cashierRecord",
            JSON.stringify(this.CashierMessage)
          ),
          this.$axios.post(
            "http://127.0.0.1:3000/api/computeTurnover",
            this.CashierMessage.goodsList
          )
        ])
        // .then(
        //   this.$axios.spread(function(result) {
        //     console.log(result);
        //   })
        // )
        // .catch(function(err) {
        //   console.log(err);
        // });
      // })
      // 清空已购物的商品
      for (let i = 0; i < this.tableData.length; i++) {
        for (let j = 0; j < this.multipleSelection.length; j++) {
          if (this.tableData[i].number === this.multipleSelection[j].number) {
            this.tableData.splice(i, 1);
          }
        }
      }
    }
  },
  created() {
    this.tableData = this.$store.state.cartGoods;
  },
  watch: {
    totalCount(newV) {
      if (newV !== null) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    actuallyGet(newV) {
      if (newV !== null && this.actuallyGet - this.totalCashier >= 0) {
        this.dialogDisabled = false;
      } else {
        this.dialogDisabled = true;
      }
    },
    tableData(newV) {
      this.tableData = newV;
    }
  },
  computed: {
    change() {
      if (this.actuallyGet === null || this.actuallyGet === "") {
        return null;
      } else {
        if (this.actuallyGet - this.totalCashier >= 0) {
          return this.actuallyGet - this.totalCashier;
        } else {
          // this.dialogDisabled = true;
          return "请正确输入实收金额";
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 98%;
  margin: 0 auto;
  .pay {
    height: 50px;
    width: 100%;
    margin-top: 15px;
    .totalCount {
      float: right;
      margin-top: 7px;
      margin-right: 40px;
      font-size: 14px;
    }
    .totalCashier {
      float: right;
      margin-top: 7px;
      margin-right: 40px;
      font-size: 14px;
    }
    .confirmPay {
      float: right;
      margin-right: 10px;
    }
    .el-collapse-item {
      //   overflow: hidden;
      .box {
        overflow: hidden;
        margin-left: 50%;
        transform: translate(-50%);
        .text {
          margin-top: 4px;
          margin-right: 30px;
          margin-bottom: 25px;
          float: left;
        }
        .inp {
          float: left;
        }
        .confirmPay-dialog {
          margin-left: 50%;
          transform: translate(-50%);
        }
      }
    }
  }
}
</style>