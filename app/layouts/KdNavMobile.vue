<template>
	<transition name="MobileNav">
		<div class="KdNavMobile" v-if="opened" @click.self="close">
			<div class="KdNavMobile__items">
				<button @click="close" class="KdNavMobile__item" style="animation-delay: 200ms">
					<icon-times class="KdNavMobile__close" />
				</button>

				<template v-for="(item, index) in navigation">
					<kd-link class="KdNavMobile__item"
						active-class="KdNavMobile__item--active"
						:key="item.url" :href="item.url"
						:style="{'animation-delay': `${(index + 1) * 100 + 200}ms`}">

						{{item.label}}
					</kd-link>
				</template>

				<kd-bookmark-badge class="KdNavMobile__item"
					:style="{'animation-delay': `${(navigation.length + 1) * 100 + 200}ms`}"
					@bookmark="$emit('bookmark')" />
			</div>
		</div>
	</transition>
</template>

<style lang="less" scoped>
	.KdNavMobile {
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

	.MobileNav {
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

			.KdNavMobile__item {
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
	import IconTimes from "@/images/IconTimes?inline";
	import KdBookmarkBadge from "@/components/KdBookmarkBadge";
	import KdLink from "@/components/KdLink";

	export default {
		data() {
			return {
				opened: false
			};
		},

		computed: {
			navigation() {
				return this.$store.state.config.navigation;
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
			IconTimes,
			KdBookmarkBadge,
			KdLink
		}
	};
</script>
