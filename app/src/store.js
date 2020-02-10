import api from "@/src/api";

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
			if(!window.$KaedeBookmarkEnabled)
				return;

			if(!window.localStorage)
				return;

			commit('enable');
			dispatch('loadBookmarks');
		}
	}
};

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
		async init({ commit, dispatch }) {
			try {
				const config = await api.settings.browse();

				commit('setConfig', config);
			} catch(err) {}

			dispatch('bookmarks/init');
		}
	},

	modules: {
		bookmarks
	}
};
