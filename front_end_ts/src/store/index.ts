import Vue from 'vue';
import Vuex from 'vuex';
// import * as state from './state';
// import * as actions from './actions';
// import * as getters from './getters';
import * as modules from './module';
Vue.use(Vuex);

export default new Vuex.Store({
    // actions,
    // getters,
    // state
    modules
})