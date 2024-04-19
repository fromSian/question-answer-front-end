<template>
  <div style="width: 50vw; margin-left: 24vw">
    <el-card shadow="never">
      <div slot="header" class="has-text-centered has-text-weight-bold">
        注册
      </div>
      <div>
        <el-form
          ref="ruleForm"
          v-loading="loading"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username" autocomplete="off" />
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input
              v-model="ruleForm.password"
              type="password"
              autocomplete="off"
            />
          </el-form-item>

          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              v-model="ruleForm.checkPass"
              type="password"
              autocomplete="off"
            />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >立即注册</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  name: "Register",
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      ruleForm: {
        password: "",
        checkPass: "",
        username: "",
      },
      rules: {
        username: [
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
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
        checkPass: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: validatePass, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      let cVue = this
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          cVue.loading = true;
          const res = await request.post("/user/register/", {username: cVue.ruleForm.username, password: cVue.ruleForm.password});
          if (res && res.data.status) {
            cVue.$message.success("注册成功");
            setTimeout(() => {
              cVue.loading = false;
              cVue.$router.push({ path: cVue.redirect || "/login" });
            }, 0.1 * 1000);
          } else {
            cVue.$message.error("注册失败，" + message);
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped></style>
