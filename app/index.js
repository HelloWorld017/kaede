import App from "@/App";
import Author from "@/pages/Author";
import Index from "@/pages/Index";
import Tags from "@/pages/Tags";
import Vue from "vue";
import Vuex from "vuex";
import VueI18n from "vue-i18n";
import VueRouter from "vue-router";

import { setLocale } from "@/src/dateLocale";
import storeDescriptor from "@/src/store";

Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(VueRouter);

(async () => {
	const store = new Vuex.Store(storeDescriptor);
	await store.dispatch('init');

	const lang = store.state.config.lang ?
		store.state.config.lang :
		navigator.language ?
			navigator.language :
			'en';

	setLocale({
		locale: lang,
		fallbackLocale: 'en'
	});

	const i18n = new VueI18n({
		locale: lang.split('-').shift(),
		fallbackLocale: 'en',
		silentTranslationWarn: (process.env.NODE_ENV || 'development').trim() !== 'development'
	});

	const postPromise = import("@/pages/Post");
	const router = new VueRouter({
		routes: [
			{ path: '/', component: Index },
			{ path: '/page/:page', redirect: '/' },
			{ path: '/author/:author', component: Author },
			{ path: '/tag/:tag', component: Tags },
			{ path: '/:post', component: () => postPromise }
		],
		mode: 'history'
	});

	new Vue({
		el: '#App',
		i18n,
		router,
		store,
		render(h) {
			return h(App);
		}
	});
})();
