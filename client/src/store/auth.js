/* global localStorage */

import User from '@/models/User'
import * as MutationTypes from './mutationTypes'

const state = {
  user: User.from(localStorage.token)
}

const mutations = {
  [MutationTypes.LOGIN] (state) {
    state.user = User.from(localStorage.token)
  },
  [MutationTypes.LOGOUT] (state) {
    state.user = null
  }
}

const getters = {
  currentUser (state) {
    return state.user
  },
  isAdmin (state) {
    return state.user.admin.length
  },
  isUser (state) {
    return state.user.apps.length
  },
  adminApps (state) {
    return state.user.admin
  },
  userApps (state) {
    return state.user.apps
  }
}

const actions = {
  login ({ commit }) {
    commit(MutationTypes.LOGIN)
  },
  logout ({ commit }) {
    commit(MutationTypes.LOGOUT)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
