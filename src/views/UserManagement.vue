<template>
  <div class="user-management">
    <h1>用户管理系统</h1>


    <div class="operation-panel">
      <!-- 登录组件 -->
      <LoginForm />

      <!-- 注册表单 -->
      <div class="register-section">
        <h3>用户注册</h3>
        <form @submit.prevent="handleRegister">
          <div class="form-row">
            <input
                type="text"
                v-model="registerForm.username"
                placeholder="用户名"
                required
            >
            <input
                type="password"
                v-model="registerForm.password"
                placeholder="密码"
                required
            >
            <button type="submit" :disabled="registerLoading">
              {{ registerLoading ? '注册中...' : '注册' }}
            </button>
          </div>
        </form>
        <div v-if="registerMessage" class="message" :class="{ error: registerError }">
          {{ registerMessage }}
        </div>
      </div>

      <!-- 用户信息查询 -->
      <div class="user-info-section">
        <h3>查询用户信息</h3>
        <div class="form-row">
          <input
              type="text"
              v-model="queryUsername"
              placeholder="输入用户名查询"
          >
          <button @click="getUserInfo" :disabled="!queryUsername">
            查询
          </button>
        </div>
        <div v-if="userInfo" class="user-info">
          <h4>用户信息:</h4>
          <pre>{{ userInfo }}</pre>
        </div>
      </div>
    </div>

    <!-- 所有用户列表 -->
    <div class="user-list-section">
      <div class="section-header">
        <h3>所有用户列表</h3>
        <button @click="refreshUsers" class="refresh-btn">
          🔄 刷新
        </button>
      </div>
      <div v-if="usersLoading" class="loading">加载中...</div>
      <div v-else-if="usersError" class="error-message">
        加载失败: {{ usersError }}
      </div>
      <div v-else class="user-list">
        <div v-for="user in users" :key="user" class="user-item">
          {{ user }}
        </div>
        <div v-if="users.length === 0" class="no-data">
          暂无用户数据
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'
import { userApi } from '@/api/userApi'

export default {
  name: 'UserManagement',
  components: {
    LoginForm
  },
  data() {
    return {
      // 注册表单
      registerForm: {
        username: '',
        password: ''
      },
      registerLoading: false,
      registerMessage: '',
      registerError: false,

      // 用户查询
      queryUsername: '',
      userInfo: '',

      // 用户列表
      users: [],
      usersLoading: false,
      usersError: ''
    }
  },
  mounted() {
    // 组件挂载后加载用户列表
    this.loadUsers()
  },
  methods: {
    // 处理注册
    async handleRegister() {
      if (!this.registerForm.username || !this.registerForm.password) {
        this.showRegisterMessage('请输入用户名和密码', true)
        return
      }

      this.registerLoading = true

      try {
        const response = await userApi.register(
            this.registerForm.username,
            this.registerForm.password
        )

        this.showRegisterMessage(response, false)
        this.registerForm.username = ''
        this.registerForm.password = ''

        // 注册成功后刷新用户列表
        this.loadUsers()

      } catch (error) {
        this.showRegisterMessage('注册失败: ' + (error.message || '网络错误'), true)
      } finally {
        this.registerLoading = false
      }
    },

    // 获取用户信息
    async getUserInfo() {
      if (!this.queryUsername) return

      try {
        const response = await userApi.getUserInfo(this.queryUsername)
        this.userInfo = response
      } catch (error) {
        this.userInfo = '查询失败: ' + (error.message || '用户不存在')
      }
    },

    // 加载用户列表
    async loadUsers() {
      this.usersLoading = true
      this.usersError = ''

      try {
        const response = await userApi.getAllUsers()
        // 假设返回的是字符串，需要解析
        if (typeof response === 'string') {
          // 从字符串中提取用户列表
          const match = response.match(/当前所有用户: (\[.*\])/)
          if (match && match[1]) {
            this.users = JSON.parse(match[1])
          } else {
            this.users = []
          }
        } else {
          this.users = response || []
        }
      } catch (error) {
        this.usersError = error.message
        this.users = []
      } finally {
        this.usersLoading = false
      }
    },

    // 刷新用户列表
    refreshUsers() {
      this.loadUsers()
    },

    showRegisterMessage(msg, isError) {
      this.registerMessage = msg
      this.registerError = isError

      setTimeout(() => {
        this.registerMessage = ''
      }, 3000)
    }
  }
}
</script>

<style scoped>
.user-management {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.operation-panel {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 30px;
}

.register-section, .user-info-section {
  padding: 20px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  background: #f8f9fa;
}

.register-section h3, .user-info-section h3 {
  margin-top: 0;
  color: #495057;
}

.form-row {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.form-row input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

.form-row button {
  padding: 8px 16px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.form-row button:hover:not(:disabled) {
  background: #218838;
}

.form-row button:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.user-info {
  margin-top: 15px;
  padding: 15px;
  background: white;
  border-radius: 4px;
  border: 1px solid #dee2e6;
}

.user-info pre {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.user-list-section {
  padding: 20px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  background: white;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h3 {
  margin: 0;
}

.refresh-btn {
  padding: 6px 12px;
  background: #17a2b8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.refresh-btn:hover {
  background: #138496;
}

.user-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
}

.user-item {
  padding: 10px;
  background: #e9ecef;
  border-radius: 4px;
  text-align: center;
}

.loading, .no-data, .error-message {
  text-align: center;
  padding: 20px;
  color: #6c757d;
}

.error-message {
  color: #dc3545;
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
}

.message {
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

@media (max-width: 768px) {
  .operation-panel {
    grid-template-columns: 1fr;
  }
}
</style>