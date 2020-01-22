import api from "@/src/api";

export default {
	state: {
		config: {}
	},

	mutations: {
		setConfig(state, config) {
			state.config = config;
		}
	},

	actions: {
		async init({ commit }) {
			const config = await api.settings.browse();
			
			commit('setConfig', config);
		}
	}
};
