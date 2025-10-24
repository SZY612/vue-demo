import Vue from 'vue'
import VueRouter from 'vue-router'
import UserManagement from '@/views/UserManagement.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        redirect: '/users'
    },
    {
        path: '/users',
        name: 'UserManagement',
        component: UserManagement
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router