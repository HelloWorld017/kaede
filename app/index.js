import App from "@/App";
import Author from "@/pages/Author";
import Index from "@/pages/Index";
import Post from "@/pages/Post";
import Tags from "@/pages/Tags";
import Vue from "vue";
import Vuex from "vuex";
import VueI18n from "vue-i18n";
import VueRouter from "vue-router";

import moment from "moment";
import storeDescriptor from "@/src/store";

Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(VueRouter);

(async () => {
	const store = new Vuex.Store(storeDescriptor);
	await store.dispatch('init');

	moment.locale(store.state.config.lang);

	const i18n = new VueI18n({
		locale: store.state.config.lang,
		fallbackLocale: 'en'
	});

	const router = new VueRouter({
		routes: [
			{ path: '/', component: Index },
			{ path: '/page/:page', redirect: '/' },
			{ path: '/author/:author', component: Author },
			{ path: '/tag/:tag', component: Tags },
			{ path: '/:post', component: Post }
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
