import { Module } from 'vuex';
import { ThemeConfigState, RootStateTypes } from '../interface/index';

const themeConfigModule: Module<ThemeConfigState, RootStateTypes> = {
	namespaced: true,
	state: {
		/*  --------- 界面设置  --------- */
		// 网站主标题（菜单导航、浏览器当前网页标题）
		globalTitle: 'Vue3-ElementPlus-Vite2',
	},
	mutations: {
		// 设置布局配置
		getThemeConfig(state: any, data: object) {
			state.themeConfig = data;
		},
	},
	actions: {
		// 设置布局配置
		setThemeConfig({ commit }, data: object) {
			commit('getThemeConfig', data);
		},
	},
};

export default themeConfigModule;

