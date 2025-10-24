<template>
  <div class="login-container">
    <div class="login-form">
      <h2>用户登录</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>用户名:</label>
          <input
              type="text"
              v-model="loginForm.username"
              placeholder="请输入用户名"
              required
          >
        </div>

        <div class="form-group">
          <label>密码:</label>
          <input
              type="password"
              v-model="loginForm.password"
              placeholder="请输入密码"
              required
          >
        </div>

        <button type="submit" :disabled="loading" class="login-btn">
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>

      <div v-if="message" class="message" :class="{ error: isError }">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import { userApi } from '@/api/userApi'

export default {
  name: 'LoginForm',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loading: false,
      message: '',
      isError: false
    }
  },
  methods: {
    async handleLogin() {
      // 表单验证
      if (!this.loginForm.username || !this.loginForm.password) {
        this.showMessage('请输入用户名和密码', true)
        return
      }

      this.loading = true
      this.message = ''

      try {
        // 调用后端API
        const response = await userApi.login(
            this.loginForm.username,
            this.loginForm.password
        )

        this.showMessage(response, false)

        // 登录成功，可以跳转页面或保存用户信息
        console.log('登录成功:', response)

      } catch (error) {
        this.showMessage('登录失败: ' + (error.message || '网络错误'), true)
        console.error('登录错误:', error)
      } finally {
        this.loading = false
      }
    },

    showMessage(msg, isError) {
      this.message = msg
      this.isError = isError

      // 3秒后清除消息
      setTimeout(() => {
        this.message = ''
      }, 3000)
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  padding: 20px;
}

.login-form {
  width: 100%;
  max-width: 400px;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.login-form h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

.form-group input:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0,123,255,0.3);
}

.login-btn {
  width: 100%;
  padding: 12px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.login-btn:hover:not(:disabled) {
  background: #0056b3;
}

.login-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.message {
  margin-top: 15px;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
}

.message:not(.error) {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
</style>