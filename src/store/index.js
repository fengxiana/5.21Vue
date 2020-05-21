import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import api from '../services/api'
import qs from 'querystring'

Vue.use(Vuex)

export default new Vuex.Store({
  
  state: {
    listData: [],
    title: '添加',
    currentId: null
  },

  mutations: {

    //存储用户数据
    'HOME_GETDATA_MUTATIONS'(state, action) {
      state.listData = action
    },

    //区分添加修改
    'HOME_DIFFRENT_MUTATIONS'(state, action) {
      state.title = action.title
      state.currentId = action.id || null
    }
  },

  actions: {

    //异步请求用户数据
    'HOME_GETDATA_ACTIONS'({ commit }) {
      Axios.get(api.getData)
        .then(res => {
          commit('HOME_GETDATA_MUTATIONS', res.data.users)
        })
    },

    //添加数据
    'HOME_ADD_ADCTIONS'(context, obj) {
      Axios.post(api.addData, qs.stringify(obj))
        .then(res => {
          if (Number(res.data.status) === 200) {
            alert(res.data.info)
          } else {
            alert(res.data.info)
          }
        })
    },

    //修改数据
    'HOME_UPDATE_ADCTIONS'(context, obj) {
      Axios.post(api.updateData, qs.stringify(obj))
        .then(res => {
          if (Number(res.data.status) === 200) {
            alert(res.data.message)
          } else {
            alert(res.data.message)
          }
        })
    },

    //删除数据
    'HOME_DELETE_ACTIONS'(context, obj) {
      Axios.post(api.deleteData, qs.stringify(obj))
        .then(res => {
          if (Number(res.data.status) === 200) {
            alert(res.data.info)
          } else {
            alert(res.data.info)
          }
        })
    }
  },

  modules: {
  }
})
