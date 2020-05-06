<template>
  <div class="bg">
    <div class="container">
      <h3>数据统计</h3>
      <div class="turnover">
        <div class="turnover-left">
          <p class="text">本月营业额</p>
          <p class="number">{{turnover}}</p>
        </div>
        <div class="turnover-right">
          <div id="sales-category-chart"></div>
        </div>
      </div>
      <h3>本月销售前二十商品</h3>
      <div class="top-sales">
        <div id="top-sales-chart"></div>
      </div>
      <h3>年度销售统计</h3>
      <div class="year-sales">
        <div id="year-sales-chart"></div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入饼状图组件
require("echarts/lib/chart/pie");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  data() {
    return {
      goodsPie: [],
      salesCategoryChart: null,
      topSalesChart: null,
      yearSalesChart: null,
      turnover: null, // 本月营业额
      source: [["amount", "product"]], // 本月销售前二十商品
      yearSalesData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] //年度销售统计
    };
  },
  created() {
    let index = 0;
    let month = "";
    let mayTotalCashier = 0;
    this.$axios.get("http://127.0.0.1:3000/api/getTurnover").then(result => {
      result.data.result.forEach(item => {
        item.value = item.cartCount * parseFloat(item.price);
        this.source.push([item.value, item.name]);

        index = item.addTime.indexOf("/");
        month = item.addTime.charAt(index + 1);
        console.log(month);
        switch (month) {
          case "5":
            mayTotalCashier += item.value;
        }
      });
      setTimeout(() => {
        this.goodsPie = result.data.result;
        this.yearSalesData[4] = mayTotalCashier;
        // console.log(this.goodsPie);
      }, 0);
      let totalTurnover = 0;
      for (let i = 0; i < result.data.result.length; i++) {
        totalTurnover +=
          result.data.result[i].cartCount *
          parseFloat(result.data.result[i].price);
      }
      this.turnover = totalTurnover;
    });
  },
  mounted() {
    const _this = this;
    setTimeout(() => {
      this.turnoverChart();
      this.fnTopSalesChart();
      this.fnYearSalesChart();
    }, 1000);
    // console.log('1');
    window.onresize = () => {
      _this.salesCategoryChart.resize();
      _this.topSalesChart.resize();
      _this.yearSalesChart.resize();
    };
  },
  methods: {
    turnoverChart() {
      this.salesCategoryChart = echarts.init(
        document.getElementById("sales-category-chart")
      );
      this.salesCategoryChart.setOption({
        roseType: "angle",
        title: {
          text: "本月各类商品销售占比图",
          left: "38%",
          top: "10%"
        },
        legend: {
          orient: "vertical",
          left: "right",
          data: this.goodsPie
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/> {b} : {c} ({d}%)"
        },
        series: [
          {
            name: "商品占比",
            type: "pie",
            radius: "50%",
            center: ["50%", "60%"],
            data: this.goodsPie
          }
        ]
      });
    },
    fnTopSalesChart() {
      this.topSalesChart = echarts.init(
        document.getElementById("top-sales-chart")
      );
      this.topSalesChart.setOption({
        title: {
          text: "本月销售前二十商品",
          left: "38%"
        },
        dataset: {
          source: this.source
        },
        grid: { containLabel: true },
        xAxis: { name: "amount" },
        yAxis: { type: "category" },
        series: [
          {
            type: "bar",
            itemStyle: {
              color: "#c23531"
            },
            radius: "100%",
            encode: {
              // Map the "amount" column to X axis.
              x: "amount",
              // Map the "product" column to Y axis
              y: "product"
            }
          }
        ]
      });
    },
    fnYearSalesChart() {
      this.yearSalesChart = echarts.init(
        document.getElementById("year-sales-chart")
      );
      this.yearSalesChart.setOption({
        color: ["#c23531"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        xAxis: {
          type: "category",
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: this.yearSalesData,
            type: "bar"
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.bg {
  background-color: #f8f8f9;
  // height: 750px;
}
.container {
  //   width: 98%;
  //   margin: 0 auto;
  h3 {
    color: darkslategrey;
    padding: 10px 10px;
  }
  .turnover {
    background-color: #fff;
    height: 350px;
    // overflow: hidden;
    width: 100%;
    .turnover-left {
      position: relative;
      float: left;
      width: 30%;
      height: 100%;
      .text {
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%);
        font-size: 20px;
        font-weight: bold;
        color: darkslategrey;
      }
      .number {
        position: absolute;
        top: 47%;
        left: 50%;
        transform: translate(-50%);
        font-size: 18px;
        font-weight: bold;
        color: #ffa007;
        letter-spacing: 0.1em;
      }
    }
    .turnover-right {
      float: left;
      width: 70%;
      height: 100%;
      #sales-category-chart {
        width: 100%;
        height: 100%;
      }
    }
  }
  .top-sales {
    height: 400px;
    width: 100%;
    background-color: #fff;
    #top-sales-chart {
      width: 100%;
      height: 100%;
    }
  }
  .year-sales {
    height: 400px;
    width: 100%;
    background-color: #fff;
    #year-sales-chart {
      width: 100%;
      height: 100%;
    }
  }
}
</style>