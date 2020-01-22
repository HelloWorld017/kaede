import App from "@/App";
import Index from "@/pages/Index";
import Vue from "vue";
import Vuex from "vuex";
import VueI18n from "vue-i18n";
import VueRouter from "vue-router";

import storeDescriptor from "@/src/store";

Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(VueRouter);

(async () => {
	const store = new Vuex.Store(storeDescriptor);
	await store.dispatch('init');
	
	const i18n = new VueI18n({
		locale: navigator.language.split('-')[0],
		fallbackLocale: 'en'
	});

	const router = new VueRouter({
		routes: [
			{ path: '/', component: Index },
			{ path: '/page/:page', component: Index }
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
