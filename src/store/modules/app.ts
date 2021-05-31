import { Module } from 'vuex';
import { App, RootStateTypes } from '../interface/index';

const appModule: Module<App, RootStateTypes> = {
	namespaced: true,
	state: {
		count: 0,
	},
	mutations: {
		increment(state: any) {
			state.count++
		}
	},
	actions: {
	},
};

export default appModule;

