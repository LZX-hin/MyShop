<template>
  <div>
    <h2>添加员工</h2>
    <div class="table">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
        <el-form-item label="员工姓名" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入员工名称"></el-input>
        </el-form-item>
        <el-form-item label="员工工号" prop="number">
          <el-input v-model="ruleForm.number" placeholder="请输入5位员工工号"></el-input>
        </el-form-item>
        <el-form-item label="员工职位" prop="position">
          <el-input v-model="ruleForm.position" placeholder="请输入员工职位"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phoneNumber">
          <el-input v-model="ruleForm.phoneNumber" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="家庭住址">
          <el-input v-model="ruleForm.address" placeholder="请输入家庭住址"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :plain="true" type="primary" size="mini" @click="onSubmit">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        number: "",
        position: "",
        phoneNumber: "",
        address: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入员工名称", trigger: "blur" },
          { min: 2, message: "请输入至少2位字符", trigger: "blur" }
        ],
        number: [
          { required: true, message: "请输入员工工号", trigger: "blur" },
          { min: 5, max: 5, message: "请输入5位数字", trigger: "blur" }
        ],
        position: [
          { required: true, message: "请输入员工职位", trigger: "blur" }
        ],
        phoneNumber: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { min: 11, max: 11, message: "请输入11位电话号码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$axios
        .get(
          `http://127.0.0.1:3000/api/addCollegue?name=${this.ruleForm.name}&number=${this.ruleForm.number}&position=${this.ruleForm.position}&phoneNumber=${this.ruleForm.phoneNumber}&address=${this.ruleForm.address}&isShow=true`
        )
        .then(result => {
          // console.log(result);
          this.$message({
            message: result.data.message,
            type: "success"
          });
        });
      setTimeout(() => {
        let addTime = new Date();
        addTime = addTime.toLocaleString();
        this.$axios.get(
          `http://127.0.0.1:3000/api/timeData?addTime=${addTime}&event=添加新员工&name=${this.ruleForm.name}&number=${this.ruleForm.number}&isShow=true`
        );
      });
      this.$router.push("/collegueList");
    }
  }
};
</script>

<style lang="scss" scoped>
h2 {
  margin: 20px;
  text-align: center;
}
.table {
  width: 50%;
  margin: 0 auto;
}
</style>