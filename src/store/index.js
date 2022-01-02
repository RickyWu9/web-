import Vue from 'vue'
import Vuex from 'vuex'
import document from './modules/document'
import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        document
    },
    getters
})