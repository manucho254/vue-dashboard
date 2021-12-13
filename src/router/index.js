import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import Login from '../views/Login.vue'
import store from '../store'

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
        requireLogin: true
    }
}, {
    path: '/search/',
    name: 'Search',
    component: Search,
    meta: {
        requireLogin: true
    }
}, {
    path: '/login/',
    name: 'Login',
    component: Login
}, ]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
        next({ name: 'Login', query: { to: to.path } });
    } else {
        next()
    }
})

export default router