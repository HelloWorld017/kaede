import api from "@/src/api";
import kaedeSettings from "@/src/kaedeSettings";

const bookmarks = {
	namespaced: true,
	state: {
		bookmarks: [],
		enabled: false
	},

	mutations: {
		enable(state) {
			state.enabled = true;
		},

		setBookmarks(state, bookmarks) {
			state.bookmarks = bookmarks;
		},

		pushBookmark(state, bookmark) {
			state.bookmarks.push(bookmark);
		},

		deleteBookmark(state, id) {
			const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
			if(index >= 0)
				state.bookmarks.splice(index, 1);
		}
	},

	actions: {
		loadBookmarks({ commit, state }) {
			if(!state.enabled)
				return;

			try {
				const bookmarks = localStorage.getItem('KaedeBookmarks');
				const bookmarksParsed = JSON.parse(bookmarks);

				if(Array.isArray(bookmarksParsed))
					commit('setBookmarks', bookmarksParsed);
			} catch(e) {}
		},

		writeBookmarks({ commit, state }) {
			if(!state.enabled)
				return;

			localStorage.setItem('KaedeBookmarks', JSON.stringify(state.bookmarks));
		},

		addBookmark({ commit, dispatch }, post) {
			dispatch('loadBookmarks');

			const { id, title, url } = post;
			commit('pushBookmark', {
				id, title, url
			});

			dispatch('writeBookmarks');
		},

		removeBookmark({ commit, dispatch }, id) {
			dispatch('loadBookmarks');
			commit('deleteBookmark', id);
			dispatch('writeBookmarks');
		},

		init({ commit, dispatch }) {
			if(!kaedeSettings.bookmarkEnabled)
				return;

			if(!window.localStorage)
				return;

			commit('enable');
			dispatch('loadBookmarks');
		}
	}
};

const theme = {
	namespaced: true,
	state: {
		theme: 'light',
		enabled: false
	},

	mutations: {
		enable(state) {
			state.enabled = true;
		},

		setTheme(state, theme) {
			state.theme = theme;
		}
	},

	actions: {
		loadTheme({ commit, state }) {
			console.log('theme enabled', state.enabled);
			if (!state.enabled) return;

			try {
				const theme = localStorage.getItem('KaedeTheme');

				if (theme === 'light' || theme === 'dark') {
					commit('setTheme', theme);
				} else {
					const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

					commit('setTheme', isDark ? 'dark' : 'light');
				}
			} catch {}
		},

		writeTheme({ state }) {
			if (!state.enabled) return;

			localStorage.setItem('KaedeTheme', state.theme);
		},

		changeTheme({ commit, dispatch }, theme) {
			dispatch('loadTheme');
			if (theme === 'light' || theme === 'dark') {
				commit('setTheme', theme);
			}
			dispatch('writeTheme');
			dispatch('sync');
		},

		sync({ state }) {
			if(state.theme === 'dark') {
				document.body.className += " Body--dark";
			} else {
				document.body.className = document.body.className.replace(/\s*Body--dark/g, '');
			}
		},

		init({ commit, dispatch }) {
			if(!window.localStorage)
				return;

			commit('enable');
			dispatch('loadTheme');
			dispatch('sync');
		}
	}
};

export default {
	state: {
		config: {},
		listNavOpened: false
	},

	mutations: {
		setConfig(state, config) {
			state.config = config;
		},

		setListNavOpened(state, value) {
			if(value) {
				document.body.className += " Body--opened";
			} else {
				document.body.className = document.body.className.replace(/\s*Body--opened/g, '');
			}

			state.listNavOpened = value;
		}
	},

	actions: {
		async init({ commit, dispatch }) {
			try {
				const config = await api.settings.browse();

				commit('setConfig', config);
			} catch(err) {}

			dispatch('bookmarks/init');
			dispatch('theme/init');
		}
	},

	modules: {
		bookmarks,
		theme,
	}
};
