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
        <el-form-item label="有效期" prop="expired">
          <el-date-picker
            v-model="ruleForm.expired"
            style="width: 100%"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
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
import request from "@/utils/request";
export default {
  name: "Publish",
  data() {
    return {
      redirect: undefined,
      loading: false,
      options: [],
      ruleForm: {
        title: "",
        content: "",
        tags: [],
        expired: null,
      },
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          {
            min: 2,
            max: 255,
            message: "长度在 2 到 255 个字符",
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
        expired: [
          { required: false, message: "请选择有效期", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          request
            .post("/article/", this.ruleForm)
            .then((res) => {
              if (res && res.data) {
                this.loading = false;
                this.$message.success("发布成功");
                this.resetForm('ruleForm')
              } else {
                throw new Error("publish failed");
              }
            })
            .catch((err) => {
              console.log(err);
              this.loading = false;
              this.$message.error("发布失败");
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    queryTags() {
      request
        .get("/tags/")
        .then((result) => {
          if (result && result.data && result.data.status) {
            this.options = result.data.tags.map((item) => ({
              label: item,
              value: item,
            }));
          }
        })
        .catch((err) => {});
    },
  },
  mounted() {
    this.queryTags();
  },
};
</script>

<style scoped></style>
