<template>
  <div class="hello-container">
    <h1>{{ greeting }}</h1>
    <p>{{ message }}</p>
    <button @click="changeGreeting">点击我！</button>
    <p>点击次数 : {{ count }}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      greeting: 'Hello, Vue!',
      message: '欢迎学习 Vue.js！',
      count: 0
    }
  },
  methods: {
    changeGreeting() {
      this.count++
      this.greeting = '你好，Vue！'
      this.message = `你已经点击了 ${this.count} 次`
    }
  },
  mounted() {
    console.log('Hello 组件已挂载')
  }
}
</script>

<style scoped>
.hello-container {
  text-align: center;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  color: #2c3e50;
  font-size: 2.5em;
  margin-bottom: 20px;
}

p {
  color: #7f8c8d;
  font-size: 1.2em;
  margin: 10px 0;
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;
}

button:hover {
  background-color: #2980b9;
}
</style>