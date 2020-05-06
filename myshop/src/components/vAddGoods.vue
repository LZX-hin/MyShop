<template>
  <div>
    <div class="content">
      <div class="tabs">
        <el-tabs v-model="activeName">
          <el-tab-pane label="快捷入库" name="first">
            <el-form
              :model="ruleForm2"
              :rules="rules2"
              ref="ruleForm2"
              label-width="100px"
              class="demo-ruleForm"
              :label-position="labelPosition"
            >
              <el-form-item label="商品编码" prop="number" :show-message="showMessage">
                <el-input v-model="ruleForm2.number" placeholder="请输入5位数的商品编码"></el-input>
              </el-form-item>
              <el-form-item label="商品数量" prop="count" :show-message="showMessage">
                <el-input v-model="ruleForm2.count" placeholder="请输入商品数量"></el-input>
              </el-form-item>
              <el-form-item label="选择保质期" prop="time" :show-message="showMessage">
                <el-date-picker v-model="ruleForm2.time" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
              <el-form-item>
                <!-- <el-input size="mini" type="submit" @click="submit">添加</el-input> -->
                <el-button size="mini" type="primary" @click="submit2">添加</el-button>
                <!-- <el-button size="mini" @click="resetForm('ruleForm')">重置</el-button> -->
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="商品入库" name="second">
            <div class="info">
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
                :label-position="labelPosition"
              >
                <el-form-item label="商品编码" prop="number" :show-message="showMessage">
                  <el-input v-model="ruleForm.number" placeholder="请输入5位数的商品编码"></el-input>
                </el-form-item>
                <el-form-item label="商品名称" prop="name" :show-message="showMessage">
                  <el-input v-model="ruleForm.name" placeholder="请输入2到10位置字符"></el-input>
                </el-form-item>
                <el-form-item label="商品单价" prop="price" :show-message="showMessage">
                  <el-input v-model="ruleForm.price" placeholder="请输入商品单价"></el-input>
                </el-form-item>
                <el-form-item label="商品数量" prop="count" :show-message="showMessage">
                  <el-input v-model="ruleForm.count" placeholder="请输入商品数量"></el-input>
                </el-form-item>
                <el-form-item label="商品分类" prop="cate" :show-message="showMessage">
                  <el-select v-model="ruleForm.cate" placeholder="请选择商品分类">
                    <el-option v-for="item in options" :key="item.value" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="选择保质期" prop="time" :show-message="showMessage">
                  <el-date-picker v-model="ruleForm.time" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="商品图片">
                  <input type="file" ref="file" />
                  <input type="hidden" v-model="ruleForm.img" />
                </el-form-item>

                <div class="pic">
                  <img src alt ref="img" />
                </div>
                <el-form-item>
                  <!-- <el-input size="mini" type="submit" @click="submit">添加</el-input> -->
                  <el-button size="mini" type="primary" @click="submit">添加</el-button>
                  <!-- <el-button size="mini" @click="resetForm('ruleForm')">重置</el-button> -->
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "second",
      dialogImageUrl: "",
      dialogVisible: false,
      labelPosition: "left",
      showMessage: true,
      ruleForm: {
        number: "",
        name: "",
        price: "",
        count: "",
        cate: "",
        img: "",
        time: ""
      },
      ruleForm2: {
        number: "",
        count: "",
        time: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        number: [
          { required: true, message: "请输入商品编号", trigger: "blur" },
          { min: 5, max: 5, message: "长度为5位", trigger: "blur" }
        ],
        price: [{ required: true, message: "请输入商品单价", trigger: "blur" }],
        count: [{ required: true, message: "请输入商品数量", trigger: "blur" }],
        cate: [{ required: true, message: "请输入商品分类", trigger: "blur" }],
        time: [{ required: true, message: "请输入商品保质期", trigger: "blur" }]
      },
      rules2: {
        number: [
          { required: true, message: "请输入商品编号", trigger: "blur" },
          { min: 5, max: 5, message: "长度为5位", trigger: "blur" }
        ],
        count: [{ required: true, message: "请输入商品数量", trigger: "blur" }],
        time: [{ required: true, message: "请输入商品保质期", trigger: "blur" }]
      },
      options: [
        {
          value: "休闲零食"
        },
        {
          value: "酒水饮料"
        },
        {
          value: "粮油副食"
        },
        {
          value: "生鲜水果"
        },
        {
          value: "日常洗护"
        },
        {
          value: "厨卫用品"
        }
      ]
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submit() {
      // const _this = this;
      let data = {
        number: this.ruleForm.number,
        name: this.ruleForm.name,
        price: this.ruleForm.price,
        count: this.ruleForm.count,
        cate: this.ruleForm.cate,
        img: this.ruleForm.img,
        time: this.ruleForm.time,
        addTime: ""
      };
      data.img = data.img.replace(/\+/g, "%2B");
      // console.log(data.img);
      data = JSON.stringify(data);
      this.$axios.post(`http://127.0.0.1:3000/api/addGoods`, data).then(() => {
        let addTime = new Date();
        addTime = addTime.toLocaleString();
        this.$axios.get(
          `http://127.0.0.1:3000/api/timeData?addTime=${addTime}&event=添加了商品&name=${this.ruleForm.name}&number=${this.ruleForm.number}&isShow=true`
        );
      });
      this.$router.push("/goodsList");
    },
    submit2(){
      let data = {
        number: this.ruleForm2.number,
        count: this.ruleForm2.count,
        time: this.ruleForm2.time,
        addTime: ""
      }
      this.$axios.post(`http://127.0.0.1:3000/api/updateGoods`,data);
      this.$message({
        message: '添加成功',
        type: 'success'
      })
      this.$router.push('/goodsList');
      // console.log(data);
    }
  },
  mounted() {
    const _this = this;
    // 处理图片，把图片上传到服务端且显示在前端页面中
    this.$refs.file.onchange = function() {
      let formdata = new FormData();
      formdata.append("photo", this.files[0]);
      _this.$axios
        .post(`http://127.0.0.1:3000/api/upload`, formdata)
        .then(() => {
          let data = this.files[0];
          let fr = new FileReader();
          fr.readAsDataURL(data);
          fr.onloadend = function() {
            _this.ruleForm.img = this.result;
            _this.$refs.img.src = this.result;
          };
        });
    };
  }
};
</script>

<style lang="scss" scoped>
.content {
  // overflow: hidden;
  width: 40%;
  margin: 0 auto;
  .info {
    div {
      height: 42px;
      line-height: 42px;
      margin-bottom: 20px;
      overflow: hidden;
      .el-input {
        width: 100%;
      }
      input {
        margin-left: 7%;
      }
    }
    .pic {
      width: 200px;
      height: 200px;
      border: 1px dashed #ccc;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>