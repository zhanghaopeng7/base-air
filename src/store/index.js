import Vue from "vue";
import Vuex from "vuex";
import Layout from './modules/layout'
import Repair from './modules/repair'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Layout,
    Repair
  }
});
