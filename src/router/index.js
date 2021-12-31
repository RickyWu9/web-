import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
Vue.use(VueRouter)
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err);
};

const routes = [
    {
        path: '/',
        name: 'HelloWorld',
        component: () => import('../components/HelloWorld')
    }
]

const router = new VueRouter({
    routes
})


export default router