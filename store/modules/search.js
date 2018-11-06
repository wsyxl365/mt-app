const state = ()=>({
  hotPlace: []
})

const mutations = {
  setHotPlace(state, val){
    state.hotPlace = val;
  }
}

const actions = {
  setHotPlace({commit}, hotPlace){
    commit('setHotPlace', hotPlace)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
