<route>
{
  meta: {
    title: '登录',
    public: true
  },
}
</route>

<template>
  <div class="full bg-gray-400">
    <div class="login-box">
      <h3 class="text-$theme-color tracking-12px text-lg bold mb-6">
        登录
      </h3>
      <el-form
        label-position="top"
      >
        <el-form-item label="账号">
          <el-input v-model="loginForm.username" class="line-ipt" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginForm.password" :type="passwordType" class="line-ipt">
            <template #suffix>
              <el-icon class="el-input__icon cursor-pointer" size="16" @click="changePasswordType">
                <Lock v-if="passwordType === 'password'" />
                <Unlock v-else />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <el-button class="mt-8 w-full btn" @click="loginFn(loginForm)">
        登录
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Lock, Unlock } from '@element-plus/icons-vue'
import { token } from '@/composables'
import { loadAsyncRoutes } from '@/router'
const loginForm = reactive({
  username: '',
  password: '',
})
const passwordType = ref('password')
const changePasswordType = () => {
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password'
}
const route = useRoute()
const router = useRouter()

const loginFn = () => {
  if (loginForm.username === 'admin' && loginForm.password === 'admin') {
    token.value = 'asdfgfdgfh'
    loadAsyncRoutes()

    if (route.query && route.query.redirect) {
      router.push(route.query.redirect as string)
    } else {
      router.push('/')
    }
  } else {
    ElMessage.error('用户名或密码错误')
  }
}
</script>

<style scoped>
.login-box{
  width: 400px;
  border-radius: 10px;
  background: #fff;
  position: absolute;
  top: 50%;
  right: 20%;
  transform: translateY(-50%);
  padding: 40px 40px;
}
</style>
