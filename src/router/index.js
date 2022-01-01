import Vue from 'vue'
import VueRouter from 'vue-router'

// import Home from '../views/Home.vue'
Vue.use(VueRouter)
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err);
};

const routes = [
    {
        path: '/money',
        name: 'money',
        component: () => import('../components/money'),
        // children: [{
        //     path: '/numbers',
        //     name: 'numbers',
        //     component: () => import('../components/numbers')
        // }]
    },
    {
        path: '/numbers',
        name: 'numbers',
        component: () => import('../components/numbers')
    },
    {
        path: '/risk',
        name: 'risk',
        component: () => import('../components/risk')
    },
    {
        path: '/caseDatabase',
        name: 'caseDatabase',
        component: () => import('../components/caseDatabase')
    }
]

const router = new VueRouter({
    routes
})


export default router