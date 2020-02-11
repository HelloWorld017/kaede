<template>
	<transition name="ListNav">
		<div class="KdNavList" v-if="opened" @click.self="close">
			<div class="KdNavList__items" @click.self="close">
				<button @click="close" class="KdNavList__item KdNavList__button" style="animation-delay: 200ms">
					<icon-menu class="KdNavList__close" :class="{ 'MenuClose--active': opened }" />
				</button>

				<template v-for="(item, index) in navigation">
					<kd-nav-item class="KdNavList__item" :item="item" @close="close"
						:style="{'animation-delay': `${(index + 1) * 75 + 200}ms`}" root />
				</template>

				<kd-nav-bookmark v-if="bookmarkEnabled" class="KdNavList__item"
					:style="{'animation-delay': `${(navigation.length + 1) * 75 + 200}ms`}" />
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
		overflow: auto;
		backdrop-filter: blur(4px);
		background: rgba(0, 0, 0, .6);
		will-change: backdrop-filter;
		z-index: 9;

		&__items {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			padding: 0 28px;
			padding-top: 16px;
			margin-top: 1.3rem;
			padding-bottom: 28px;

			& > *:first-child {
				margin-top: 0;
			}
		}

		&__item {
			animation-name: item;
			animation-duration: .4s;
			animation-fill-mode: forwards;
			opacity: 0;
		}

		&__button {
			position: relative;
			cursor: pointer;
			border: none;
			outline: none;
			background: var(--grey-900);
			padding: 15px 20px;
			margin: 0;
			margin-bottom: 10px;
			text-decoration: none;
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

		&-enter, &-leave-to {
			.MenuClose__item {
				&--top {
					transform: scaleX(1) translate(0);
					opacity: 1;
				}

				&--bottom {
					transform: scaleX(1) translate(0);
					opacity: 1;
				}

				&--middle-1 {
					transform: rotate(0deg);
				}

				&--middle-2 {
					transform: rotate(0deg);
				}
			}
		}
	}

	.MenuClose__item {
		transition: all .4s ease;
		transform-origin: center;

		&--top {
			transform: scaleX(0.5) translate(-8px);
			opacity: 0;
		}

		&--bottom {
			transform: scaleX(0.5) translate(8px);
			opacity: 0;
		}

		&--middle-1 {
			transform: rotate(135deg);
		}

		&--middle-2 {
			transform: rotate(225deg);
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
	import IconMenu from "@/images/IconMenu?inline";
	import KdNavBookmark from "@/layouts/KdNavBookmark";
	import KdNavItem from "@/components/KdNavItem";

	export default {
		props: {
			opened: Boolean
		},

		model: {
			prop: 'opened',
			event: 'opened'
		},

		computed: {
			bookmarkEnabled() {
				return this.$store.state.bookmarks.enabled;
			},

			navigation() {
				if(window.$KaedeFullNavigation)
					return window.$KaedeFullNavigation;

				return this.$store.state.config.navigation;
			}
		},

		methods: {
			open() {
				this.$emit('opened', true);
			},

			close() {
				this.$emit('opened', false);
			},

			toggle() {
				this.$emit('opened', !this.opened);
			},

			openBookmark() {
				setTimeout(() => {
					this.$emit('bookmark');
				}, 1000);
				this.opened = false;
			}
		},

		components: {
			IconMenu,
			KdNavBookmark,
			KdNavItem
		}
	};
</script>
