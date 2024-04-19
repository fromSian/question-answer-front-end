<template>
  <el-card shadow="never">
    <div slot="header" class="has-text-centered has-text-weight-bold">
      发布提问
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
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <el-input
            type="textarea"
            :autosize="{ minRows: 5 }"
            v-model="ruleForm.content"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="标签" prop="tags">
          <el-select
            v-model="ruleForm.tags"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择标签"
            style="width: 100%"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
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
</template>

<script>
export default {
  name: "Publish",
  data() {
    return {
      redirect: undefined,
      loading: false,
      options: [
        {
          value: "HTML",
          label: "HTML",
        },
        {
          value: "CSS",
          label: "CSS",
        },
        {
          value: "JavaScript",
          label: "JavaScript",
        },
      ],
      ruleForm: {
        title: "",
        content: "",
        tags: [],
      },
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          {
            min: 2,
            max: 60,
            message: "长度在 2 到 60 个字符",
            trigger: "blur",
          },
        ],
        content: [
          { required: true, message: "请输入内容", trigger: "blur" },
          {
            min: 6,
            message: "至少6个字符",
            trigger: "blur",
          },
        ],
        tags: [{ required: false, message: "请选择标签", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.ruleForm)
            .then(() => {
              this.$message({
                message: "恭喜你，登录成功",
                type: "success",
                duration: 2000,
              });

              setTimeout(() => {
                this.loading = false;
                this.$router.push({ path: this.redirect || "/" });
              }, 0.1 * 1000);
            })
            .catch(() => {
              this.loading = false;
            });
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
