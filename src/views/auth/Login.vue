<!-- 用户登录页面 -->
<template>
  <div style="width: 50vw; margin-left: 24vw">
    <el-card shadow="never">
      <div slot="header" class="has-text-centered has-text-weight-bold">
        用户登录
      </div>
      <div>
        <el-form
          v-loading="loading"
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >提交</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { setToken } from "@/utils/auth";
import request from "@/utils/request";
export default {
  name: "Login",
  data() {
    return {
      redirect: undefined,
      loading: false,
      ruleForm: {
        username: "",
        password: "",
      },
      // 表单验证规则，required表示字段是否必填，message表示触发校验时提示的信息，trigger是触发校验的方式
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "长度在 2 到 15 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 提交登录信息
    submitForm(formName) {
      let cVue = this;
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          cVue.loading = true;
          try {
            // 将登录信息调用接口传给后端
            const res = await request.post("/user/login/", this.ruleForm);
            if (res && res.data.status) {
              cVue.$message.success("登录成功");
              // 登录成功后，记录当前登录的用户信息
              cVue.$store.commit("user/SET_USER_STATE", {
                id: res.data.id,
                username: res.data.username,
                coins: res.data.coins,
              });
              // 记录当前登录的token信息
              cVue.$store.commit("user/SET_TOKEN_STATE", res.data.token);
              setToken(res.data.token);
              setTimeout(() => {
                cVue.loading = false;
                cVue.$router.push({ path: this.redirect || "/" });
              }, 0.1 * 1000);
              cVue.loading = false;
            } else {
              cVue.loading = false;
              cVue.$message.error("登录失败");
            }
          } catch (err) {
            cVue.loading = false;
            this.$message.error("登录失败");
          }
        } else {
          return false;
        }
      });
    },
    // 清除当前表单的输入
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped></style>
