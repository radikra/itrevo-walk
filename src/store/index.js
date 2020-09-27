import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const dbURL = 'http://localhost:3000/walking/'

export default new Vuex.Store({
  state: {
	days: []
  },
  actions: {
	async GET_DAYS_DATA({commit}) {
		await axios.get(dbURL)
		.then(response => {
			commit('SET_DAYS_TO_STATE', response.data);
		})
		.catch(e => {
			console.error(e.message);
		})
	},
	ADD_NEW_DAY_DATA({commit}, dayData) {
		axios.post(dbURL, dayData)
		.then(response => {
			commit('ADD_DAY_TO_STATE', response.data);
		})
		.catch(e => {
			console.error(e.message);
		})
	},
	PUT_NEW_DATA({commit}, dayData) {
		axios.put(dbURL + dayData.id, dayData)
		.then(response => {
			commit('PUT_EDITED_DATA', response.data);
		})
		.catch(e => {
			console.error(e.message);
		})
	},
	DELETE_DAY({commit}, dayData) {
		axios.delete(dbURL + dayData.id, dayData)
		.then(response => {
			commit('DELETE_DAY_FROM_STATE', response.data);
		})
		.catch(e => {
			console.error(e.message);
		})
	}
  },
  mutations: {
	SET_DAYS_TO_STATE: (state, days) => {
		state.days = days;
	},
	ADD_DAY_TO_STATE: (state, dayData) => {
		state.days.push(dayData);
	},
	PUT_EDITED_DATA: (state, dayData) => {
		const el = state.days.findIndex(d => d.id === dayData.id);
		state.days.splice(el, 1, dayData)
	},
	DELETE_DAY_FROM_STATE: (state, dayData) => {
		const el = state.days.findIndex(d => d.id === dayData.id);
		state.days.splice(el, 1);
	}
  },
  getters: {
	DAYS(state) {
		return state.days;
	}
  }
})
