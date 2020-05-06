<template>
  <div class="bg">
    <div class="backgroundImg"></div>
    <div class="table">
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="formLabelAlign.password"></el-input>
        </el-form-item>
      </el-form>
      <div class="btn">
        <!-- <el-button type="success" @click="login">登录</el-button> -->
        <el-button type="primary" :plain="true" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {
        name: "aaa",
        password: "123123"
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    login() {
      this.$axios
        .get(
          `http://127.0.0.1:3000/api/login?username=${this.formLabelAlign.name}&password=${this.formLabelAlign.password}`
        )
        .then(result => {
          console.log(result);
          if (result.data.code === 200) {
            this.$message({
              message: "登录成功",
              type: "success"
            });
            localStorage.setItem("token", result.data.result.token);
            this.$store.commit("toggleIfToken", true);
            this.$store.commit("ButtonDisabledFalse");
            this.$store.commit("showBar");
            this.$router.push("/goodsList");
          } else {
            this.$message({
              message: "登录失败",
              type: "warning"
            });
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.bg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.backgroundImg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("https://hbimg.huabanimg.com/82a157611554c63d28ece768435e2abb9565ff8752dd1c-aibt11_fw658");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  filter: blur(5px);
}
.table {
  z-index: 1000;
  position: relative;
  width: 20%;
  height: 300px;
  margin: 100px auto 10px;
}
.btn {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: au;
}
</style>