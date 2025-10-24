<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-container">
        <h1 class="nav-title">{{ appTitle }}</h1>
        <div class="nav-links">
          <router-link to="/users" class="nav-link">用户管理</router-link>
        </div>
      </div>
    </nav>

    <main class="main-content">
      <!-- 添加欢迎横幅 -->
      <div class="welcome-banner">
        <div class="banner-content">
          <h2>🎉 欢迎使用全栈用户管理系统</h2>
          <p class="banner-desc">基于 Vue.js + Spring Boot 的现代化Web应用演示</p>
          <div class="tech-stack">
            <span class="tech-tag">Vue.js 2</span>
            <span class="tech-tag">Element UI</span>
            <span class="tech-tag">Axios</span>
            <span class="tech-tag">Spring Boot</span>
            <span class="tech-tag">RESTful API</span>
          </div>
        </div>
      </div>

      <!-- 功能简介 -->
      <div class="feature-intro">
        <h3>🚀 系统功能特色</h3>
        <div class="feature-grid">
          <div class="feature-card">
            <div class="feature-icon">🔐</div>
            <h4>用户认证</h4>
            <p>安全的用户登录和注册功能，支持权限管理</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">👥</div>
            <h4>用户管理</h4>
            <p>完整的用户信息管理和查询系统</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📊</div>
            <h4>数据展示</h4>
            <p>实时数据获取和动态渲染展示</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🔄</div>
            <h4>实时更新</h4>
            <p>支持数据的实时更新和状态同步</p>
          </div>
        </div>
      </div>

      <!-- 快速开始指南 -->
      <div class="quick-start">
        <h3>📖 快速开始</h3>
        <div class="guide-steps">
          <div class="step">
            <span class="step-number">1</span>
            <div class="step-content">
              <strong>点击"用户管理"</strong>进入系统主功能页面
            </div>
          </div>
          <div class="step">
            <span class="step-number">2</span>
            <div class="step-content">
              <strong>使用测试账号登录</strong>：用户名 <code>admin</code>，密码 <code>123456</code>
            </div>
          </div>
          <div class="step">
            <span class="step-number">3</span>
            <div class="step-content">
              <strong>探索系统功能</strong>：注册新用户、查询信息、管理用户列表
            </div>
          </div>
        </div>
      </div>

      <router-view/>
    </main>

    <footer class="footer">
      <div class="footer-content">
        <p>&copy; 2024 Vue.js + Spring Boot 全栈演示项目</p>
        <p class="footer-desc">致力于展示现代Web开发的最佳实践</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    appTitle() {
      return process.env.VUE_APP_TITLE || 'Vue Demo'
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  background: #f5f5f5;
  color: #333;
  line-height: 1.6;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  background: #2c3e50;
  color: white;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.nav-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background 0.3s;
}

.nav-link:hover, .nav-link.router-link-active {
  background: rgba(255,255,255,0.1);
}

.main-content {
  flex: 1;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* 欢迎横幅样式 */
.welcome-banner {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 40px;
  border-radius: 12px;
  margin-bottom: 30px;
  text-align: center;
}

.banner-content h2 {
  font-size: 2.2em;
  margin-bottom: 16px;
  font-weight: bold;
}

.banner-desc {
  font-size: 1.2em;
  margin-bottom: 20px;
  opacity: 0.9;
}

.tech-stack {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.tech-tag {
  background: rgba(255, 255, 255, 0.2);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9em;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* 功能简介样式 */
.feature-intro {
  background: white;
  padding: 30px;
  border-radius: 8px;
  margin-bottom: 30px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.feature-intro h3 {
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
  font-size: 1.5em;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.feature-card {
  text-align: center;
  padding: 20px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.feature-icon {
  font-size: 2.5em;
  margin-bottom: 15px;
}

.feature-card h4 {
  margin-bottom: 10px;
  color: #2c3e50;
}

.feature-card p {
  color: #666;
  font-size: 0.9em;
}

/* 快速开始指南样式 */
.quick-start {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 8px;
  padding: 30px;
  margin-bottom: 30px;
}

.quick-start h3 {
  text-align: center;
  margin-bottom: 25px;
  color: #856404;
}

.guide-steps {
  display: grid;
  gap: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 15px;
}

.step-number {
  background: #856404;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
  color: #856404;
}

.step-content code {
  background: rgba(133, 100, 4, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
}

.footer {
  background: #34495e;
  color: white;
  text-align: center;
  padding: 30px 20px;
  margin-top: auto;
}

.footer-content p {
  margin: 5px 0;
}

.footer-desc {
  opacity: 0.8;
  font-size: 0.9em;
}

/* 全局样式 */
button {
  font-family: inherit;
}

input {
  font-family: inherit;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    height: auto;
    padding: 15px 0;
  }

  .nav-links {
    margin-top: 15px;
  }

  .welcome-banner {
    padding: 30px 20px;
  }

  .banner-content h2 {
    font-size: 1.8em;
  }

  .feature-grid {
    grid-template-columns: 1fr;
  }

  .tech-stack {
    justify-content: flex-start;
  }

  .main-content {
    padding: 15px;
  }
}
</style>