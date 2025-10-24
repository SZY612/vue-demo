import axios from 'axios'

// 创建axios实例
const api = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

// 请求拦截器
api.interceptors.request.use(
    config => {
        console.log('发送请求:', config)
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
api.interceptors.response.use(
    response => {
        console.log('收到响应:', response)
        return response.data
    },
    error => {
        console.error('请求错误:', error)
        return Promise.reject(error)
    }
)

// 用户API
export const userApi = {
    // 登录
    login(username, password) {
        return api.get(`/login?username=${username}&password=${password}`)
    },

    // 注册
    register(username, password) {
        return api.get(`/register?username=${username}&password=${password}`)
    },

    // 获取用户信息
    getUserInfo(username) {
        return api.get(`/userinfo?username=${username}`)
    },

    // 获取所有用户
    getAllUsers() {
        return api.get('/users')
    }
}

export default api