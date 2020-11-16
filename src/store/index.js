import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    width: 0,
    height: 0,
    camera: null,
    scene: null,
    renderer: null,
  },
  mutations: {
    set
  }
})