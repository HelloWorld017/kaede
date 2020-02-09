<template>
	<transition name="ListNav">
		<div class="KdNavList" v-if="opened" @click.self="close">
			<div class="KdNavList__items">
				<button @click="close" class="KdNavList__item" style="animation-delay: 200ms">
					<icon-times class="KdNavList__close" />
				</button>

				<template v-for="(item, index) in navigation">
					<kd-link class="KdNavList__item"
						active-class="KdNavList__item--active"
						:key="item.url" :href="item.url"
						:style="{'animation-delay': `${(index + 1) * 100 + 200}ms`}">

						{{item.label}}
					</kd-link>
				</template>

				<kd-bookmark-badge class="KdNavList__item" v-if="bookmarkEnabled"
					:style="{'animation-delay': `${(navigation.length + 1) * 100 + 200}ms`}"
					@bookmark="$emit('bookmark')" />
			</div>
		</div>
	</transition>
</template>

<style lang="less" scoped>
	.KdNavList {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		backdrop-filter: blur(4px);
		background: rgba(0, 0, 0, .6);
		will-change: backdrop-filter;
		z-index: 9;

		&__items {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			padding: 30px;
			margin-top: 1.3rem;

			& > *:first-child {
				margin-top: 0;
			}
		}

		&__item {
			position: relative;
			cursor: pointer;
			border: none;
			outline: none;
			background: var(--grey-900);
			padding: 10px 20px;
			margin: 5px 0;

			color: var(--grey-050);
			font-family: var(--font-sans);
			font-size: 1.2rem;
			font-weight: 600;
			text-decoration: none;

			animation-name: item;
			animation-duration: .4s;
			animation-fill-mode: forwards;
			opacity: 0;
		}

		&__close {
			vertical-align: middle;
			stroke: var(--grey-200);
		}
	}

	.ListNav {
		&-enter-active {
			animation-name: backdrop;
			animation-duration: .4s;
			animation-fill-mode: forwards;
			animation-timing-function: linear;
		}

		&-leave-active {
			animation-name: backdrop;
			animation-duration: .4s;
			animation-fill-mode: forwards;
			animation-timing-function: linear;
			animation-direction: reverse;

			.KdNavList__item {
				animation-name: fadeout;
				animation-duration: .4s;
				animation-delay: 0s !important;
				animation-fill-mode: forwards;
			}
		}
	}

	@keyframes backdrop {
		from {
			backdrop-filter: blur(0);
			background: transparent;
		}

		to {
			backdrop-filter: blur(4px);
			background: rgba(0, 0, 0, .6);
		}
	}

	@keyframes item {
		from {
			opacity: 0;
			transform: translate(-10px);
		}

		to {
			opacity: 1;
			transform: translate(0);
		}
	}

	@keyframes fadeout {
		from {
			opacity: 1;
		}

		to {
			opacity: 0;
		}
	}
</style>

<script>
	import createNavigation, { importNav } from "@/src/createNavigation";

	import IconTimes from "@/images/IconTimes?inline";
	import KdBookmarkBadge from "@/components/KdBookmarkBadge";
	import KdLink from "@/components/KdLink";

	export default {
		data() {
			return {
				navigation: [],
				opened: false
			};
		},

		computed: {
			bookmarkEnabled() {
				return window.$KaedeBookmarkEnabled;
			}
		},

		methods: {
			open() {
				this.opened = true;
			},

			close() {
				this.opened = false;
			},

			toggle() {
				this.opened = !this.opened;
			}
		},

		async created() {
			try {
				const page = await api.pages.read({ slug: window.$KaedeNavigationPage });
				this.navigation = createNavigation(page.html);
			} catch(err) {
				this.navigation = importNav(this.$store.state.config.navigation);
			}
		},

		components: {
			IconTimes,
			KdBookmarkBadge,
			KdLink
		}
	};
</script>
