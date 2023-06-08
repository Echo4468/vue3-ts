<template>
  <div class="login-box">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="80px"
      class="demo-ruleForm"
    >
      <h2>后台管理系统</h2>
      <el-form-item label="账号：" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" />
      </el-form-item>

      <el-form-item label="密码：" prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          class="loginBtn"
          type="primary"
          @click="submitForm(ruleFormRef)"
          >登录</el-button
        >
        <el-button class="loginBtn" @click="resetForm(ruleFormRef)"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from "vue";
import { LoginData } from "../type/login";
//从插件中引入插件自己定义好的泛型
import type { FormInstance } from "element-plus";
//引入发请求的函数，由于ts最终会编译成js，所以引入的文件名只能以js结尾或者不添加后缀
import {login} from '../request/api'
import {useRouter} from 'vue-router'
export default defineComponent({
  setup() {
    //用实例化出来的对象进行reactive
    const data = reactive(new LoginData());
    //用于规范账户和密码的一组规则
    const rules = {
      username: [
        {
          required: true,
          message: "请输入你的账号",
          trigger: "blur",
        },
        {
          min: 3,
          max: 5,
          message: "当前输入不符合要求，账号的长度应该在3到5之间",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "请输入你的密码",
          trigger: "blur",
        },
        {
          min: 3,
          max: 6,
          message: "当前输入不符合要求，密码的长度应该在3到5之间",
          trigger: "blur",
        },
      ],
    };
    //定义ruleFormRef是FormInstance泛型的数据
    const ruleFormRef = ref<FormInstance>();
    //接收下引入的useRouter方法，此时router就相当于$router
    const router = useRouter()
    //submitForm——登录的方法
    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      //对表单的内容进行验证，valid为true表示验证成功
      formEl.validate((valid) => {
        if (valid) {
          login(data.ruleForm).then((res)=>{
            //保持token
            localStorage.setItem('token',res.data.token)
            //跳转到首页,setup下没有$router哦,需要从vue-router插件中引入useRouter方法
            router.push('/')
          })
        } else {
          console.log("error submit!");
          return false
        }
      });
    };
    return {
      ...toRefs(data),
      rules,
      ruleFormRef,
      submitForm,
    };
  },
});
</script>

<style lang="scss" scoped>
.login-box {
  width: 100%;
  height: 100%;
  background: url("../assets/bg.jpg");
  text-align: center;
  padding: 1px;
  .demo-ruleForm {
    width: 500px;
    margin: 200px auto;
    background-color: #fff;
    padding: 40px;
    border-radius: 50px;
  }
  .loginBtn {
    width: 48%;
  }
  h2 {
    margin-bottom: 10px;
  }
}
</style>