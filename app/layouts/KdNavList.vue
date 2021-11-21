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

				<div class="KdNavList__group">
					<kd-nav-bookmark v-if="bookmarkEnabled" class="KdNavList__item"
						:style="{'animation-delay': `${(navigation.length + 1) * 75 + 200}ms`}" />
				</div>

				<div style="flex: 1" />

				<div class="KdNavList__group">
					<kd-theme-button class="KdNavList__item KdNavList__group"
						:style="{'animation-delay': `${(navigation.length + 2) * 75 + 200}ms`}" />
				</div>
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
		background: rgba(var(--grey-050), .6);
		z-index: 9;
		display: flex;

		&__items {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			padding: 0 28px;
			padding-top: 16px;
			margin-top: 1.3rem;
			padding-bottom: 28px;

			flex: 1;

			& > *:first-child {
				margin-top: 0;
			}
		}

		&__item {
			animation-name: item;
			animation-duration: .4s;
			animation-fill-mode: forwards;
			border-radius: 10px;
			overflow: hidden;
			opacity: 0;
		}

		&__button {
			position: relative;
			cursor: pointer;
			border: none;
			outline: none;
			background: var(--grey-900_rgb);
			border-radius: 10px;
			padding: 15px;
			margin: 0;
			margin-bottom: 10px;
			text-decoration: none;
		}

		&__close {
			vertical-align: middle;
			stroke: var(--grey-200_rgb);
		}

		&__group {
			margin-bottom: 10px;
		}
	}

	.ListNav {
		&-enter-active {
			animation-name: fadeout;
			animation-duration: .4s;
			animation-fill-mode: forwards;
			animation-timing-function: linear;
			animation-direction: reverse;
		}

		&-leave-active {
			animation-name: fadeout;
			animation-duration: .4s;
			animation-fill-mode: forwards;
			animation-timing-function: linear;

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
	import kaedeSettings from "@/src/kaedeSettings";

	import IconMenu from "@/images/IconMenu?inline";
	import KdNavBookmark from "@/layouts/KdNavBookmark";
	import KdNavItem from "@/components/KdNavItem";
	import KdThemeButton from "@/components/KdThemeButton";

	export default {
		computed: {
			bookmarkEnabled() {
				return this.$store.state.bookmarks.enabled;
			},

			navigation() {
				if(kaedeSettings.fullNavigation)
					return kaedeSettings.fullNavigation;

				return this.$store.state.config.navigation;
			},

			opened: {
				get() {
					return this.$store.state.listNavOpened;
				},

				set(value) {
					this.$store.commit('setListNavOpened', value);
				}
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

		components: {
			IconMenu,
			KdNavBookmark,
			KdNavItem,
			KdThemeButton
		}
	};
</script>
