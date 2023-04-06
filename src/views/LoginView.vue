<template>
  <div class="wrap">
    <div class="login-block" v-if="isLogin">
      <div class="login-header">
        <img width="50" height="50" src="../assets/icons/logo.png" alt="logo"/>
        <p>用户登录</p>
      </div>
      <div class="login-body">
        <div class="login-form">
          <el-form ref="loginFormRef" :model="loginForm" label-width="60px" hide-required-asterisk>
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
          <el-button type="primary" style="width: 100%" @click="login(loginFormRef)" :loading=loginLoading>
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
        <div class="login-to-register">
          <p :class="{ hoverClass: isHovering }"
             @mouseover="isHovering = true"
             @mouseout="isHovering = false"
             @click="openRegister"
          >没有账号？立即注册</p>
        </div>
      </div>
    </div>

    <div class="register-block" v-else>
      <div class="register-header">
        <img width="50" height="50" src="../assets/icons/logo.png" alt="logo"/>
        <p>用户注册</p>
      </div>
      <div class="register-body">
        <div class="register-form">
          <el-form ref="registerFormRef" :model="registerForm" label-width="80px" hide-required-asterisk :rules="registerRules">
            <el-form-item
                prop="username"
                label="用户名"
            >
              <el-input v-model="registerForm.username" />
            </el-form-item>
            <el-form-item
                prop="password"
                label="密码"
            >
              <el-input v-model="registerForm.password" type="password" />
            </el-form-item>
            <el-form-item
                prop="checkPassword"
                label="确认密码"
            >
              <el-input v-model="registerForm.checkPassword" type="password" />
            </el-form-item>
          </el-form>
        </div>
        <div class="register-button">
          <el-button type="primary" style="width: 100%" @click="register(registerFormRef)" :loading=registerLoading>
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
            注册
          </el-button>
        </div>
        <div class="register-to-login">
          <p :class="{ hoverClass: isHovering }"
             @mouseover="isHovering = true"
             @mouseout="isHovering = false"
             @click="backLogin"
          >已有帐号，返回登录</p>
        </div>
      </div>
    </div>
  </div>


</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import type {FormInstance, FormRules} from "element-plus";
import router from "@/router";
import userLogin from '@/api/login'
import {ElMessage} from "element-plus";

// 登录功能
const isLogin = ref<boolean>(true)
const loginFormRef = ref<FormInstance>()
const loginForm = reactive<{
  username: string,
  password: string,
  confirmPassword: string,
}>({
  username: '',
  password: '',
  confirmPassword: '',
})

const loginLoading = ref<Boolean>(false)
const registerLoading = ref<Boolean>(false)

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
          loginLoading.value = false
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

// 鼠标悬停修改字体颜色
const isHovering = ref<boolean>(false)

// 注册功能
const openRegister = () => {
  isLogin.value = false
  console.log("注册")
}

const backLogin = () => {
  isLogin.value = true
  console.log("登录")
}

const registerFormRef = ref<FormInstance>()
const registerForm = reactive({
  username: '',
  password: '',
  checkPassword: '',
})

const validateUsername = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else {
    userLogin.checkUsername(value).then(res => {
      console.log(res)
      if (res.isExist) {
        callback(new Error('用户名已存在'))
      } else {
        callback()
      }
    }).catch(e => {
      console.error(e)
    })
  }
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (registerForm.checkPassword !== '') {
      if (!registerFormRef.value) return
      registerFormRef.value.validateField('checkPassword', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== registerForm.password) {
    callback(new Error("两次输入的密码不同!"))
  } else {
    callback()
  }
}

const register = (formEl: FormInstance | undefined) => {
  registerLoading.value = true
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
      userLogin.register(registerForm.username, registerForm.password).then(res => {
        console.log(res)
        if (res.success) {
          setTimeout(() => {
            ElMessage.success(res.message)
            isLogin.value = true
            registerLoading.value = false
          }, 500)
        } else {
          ElMessage.error(res.message)
          registerLoading.value = false
        }
      }).catch(e => {
        registerLoading.value = false
        ElMessage.error('注册失败，请稍后重试。')
        console.error(e)
      })
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const registerRules = reactive<FormRules>({
  username: [{validator: validateUsername, trigger: 'blur'}],
  password: [{ validator: validatePass, trigger: 'blur' }],
  checkPassword: [{ validator: validatePass2, trigger: 'blur' }],
})
</script>

<style scoped lang="less">
.wrap {
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

      .login-to-register {
        width: 80%;
        display: flex;
        justify-content: right;

        p {
          color: #909399;
          font-size: small;
        }

        .hoverClass {
          color: #000000;
          cursor: pointer;
        }
      }
    }
  }

  .register-block {
    height: 300px;
    width: 400px;
    background: #f8f8f8;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    justify-content: center;

    .register-header {
      height: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: large;
      font-family: "Arial Black";
    }

    .register-body {
      //background: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;

      .register-form {
        //background: palegreen;
        width: 80%;
      }

      .register-button {
        width: 80%;
      }

      .register-to-login {
        width: 80%;
        display: flex;
        justify-content: right;

        p {
          color: #909399;
          font-size: small;
        }

        .hoverClass {
          color: #000000;
          cursor: pointer;
        }
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