import Vue from 'vue';
import Router from 'vue-router';
import Index from './views/index.vue';
import Home from './views/home';
import Infoshow from './views/infoShow';
import Register from './views/register.vue';
import Login from './views/login.vue';
import NotFound from './views/404.vue';

Vue.use(Router)

let router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            redirect: '/index'
        },
        {
            name: 'index',
            path: '/index',
            component: Index,
            children: [{
                    path: '',
                    component: Home
                },
                {
                    name: 'home',
                    path: '/home',
                    component: Home
                },
                {
                    name: 'infoShow',
                    path: '/infoShow',
                    component: Infoshow
                }
            ]
        },
        {
            name: 'register',
            path: '/register',
            component: Register
        },
        {
            name: 'login',
            path: '/login',
            component: Login
        },
        {
            name: '404',
            path: '*',
            component: NotFound
        }
    ]
});

//路由守卫
router.beforeEach((to, from, next) => {
    if (to.path == '/login' || to.path == '/register') {
        next();
    } else {
        const isLogin = !!localStorage.eleToken;
        isLogin ? next() : next('/login');
    }
});

export default router;