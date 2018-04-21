/* global localStorage */

import * as MutationTypes from './mutationTypes'

const state = {
  app: null,
  adminBoard: false
}

const mutations = {
  [MutationTypes.CHANGEAPP] (state, appId) {
    state.app = appId
  },
  [MutationTypes.SETADMINBOARD] (state) {
    state.adminBoard = true
  },
  [MutationTypes.SETUSERBOARD] (state) {
    state.adminBoard = false
  }
}

const getters = {
  currentApp (state) {
    return state.app
  },
  isAdminBoard (state) {
    return state.adminBoard
  }
}

const actions = {
  changeApp ({ commit }, appId) {
    commit(MutationTypes.CHANGEAPP, appId)
  },
  setAdminBoard ({ commit }) {
    commit(MutationTypes.SETADMINBOARD)
  },
  setUserBoard ({ commit }) {
    commit(MutationTypes.SETUSERBOARD)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
