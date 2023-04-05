<template>
  <div class="login-wrap">
    <div class="login-block">
      <div class="login-header">
        <img width="50" height="50" src="../assets/icons/logo.png"  alt="logo"/>
        <p>用户登录</p>
      </div>
      <div class="login-body">
        <div class="login-form">
          <el-form ref="formRef" :model="loginForm" label-width="60px" hide-required-asterisk>
            <el-form-item
                prop="username"
                label="用户名"
                :rules="[{
                  required: true,
                  message: '用户名不能为空！',
                  trigger: 'blur',
                  }]"
            >
              <el-input v-model="loginForm.username" />
            </el-form-item>
            <el-form-item
                prop="password"
                label="密码"
                :rules="[{
                  required: true,
                  message: '密码不能为空！',
                  trigger: 'blur',
                  }]"
            >
              <el-input v-model="loginForm.password" type="password" />
            </el-form-item>
          </el-form>
        </div>
        <div class="login-button">
          <el-button type="primary" style="width: 100%" @click="login(formRef)" :loading=loginLoading>
            <template #loading>
              <div class="custom-loading">
                <svg class="circular" viewBox="-10, -10, 50, 50">
                  <path
                      class="path"
                      d="
                          M 30 15
                          L 28 17
                          M 25.61 25.61
                          A 15 15, 0, 0, 1, 15 30
                          A 15 15, 0, 1, 1, 27.99 7.5
                          L 15 15
                        "
                      style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"
                  />
                </svg>
              </div>
            </template>
            登录
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import type {FormInstance} from "element-plus";
import router from "@/router";
import userLogin from '@/api/login'
import {ElMessage} from "element-plus";

const formRef = ref<FormInstance>()
const loginForm = reactive<{
  username: string,
  password: string,
}>({
  username: '',
  password: '',
})

const loginLoading = ref<Boolean>(false)

const login = (formEl: FormInstance | undefined) => {
  loginLoading.value = true
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      userLogin.login(loginForm.username, loginForm.password).then(res => {
        if (res.success) {
          setTimeout(() => {
            router.push('/index')
            console.log(res)
          }, 1000)
        } else {
          ElMessage.error(res.message)
        }
      }).catch(e => {
        loginLoading.value = false
        ElMessage.error('登录失败，请稍后重试。')
        console.error(e)
      })
    } else {
      loginLoading.value = false
      console.log('error login!')
      ElMessage.warning('用户名和密码不能为空')
      return false
    }
  })
}
</script>

<style scoped lang="less">
.login-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .login-block {
    height: 300px;
    width: 400px;
    background: #f8f8f8;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    justify-content: center;

    .login-header {
      height: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: large;
      font-family: "Arial Black";
    }

    .login-body {
      //background: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;

      .login-form {
        //background: palegreen;
        width: 80%;
      }

      .login-button {
        width: 80%;
      }
    }
  }
}

// 登录按钮加载动画
.el-button .custom-loading .circular {
  margin-right: 6px;
  width: 18px;
  height: 18px;
  animation: loading-rotate 2s linear infinite;
}
.el-button .custom-loading .circular .path {
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: var(--el-button-text-color);
  stroke-linecap: round;
}
</style>