import  Vuex from 'vuex';
import Vue from 'vue';
import Auth from './modules/auth';

//Load Vuex
Vue.use(Vuex);

//Create Store

export default new Vuex.Store({
  modules:{
    Auth
  }
});


