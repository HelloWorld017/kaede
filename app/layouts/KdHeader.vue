<template>
	<header class="KdHeader" :class="{'KdHeader--transparent': transparent}">
		<kd-link class="KdHeader__branding" href="/">
			<h1 class="KdHeader__branding__title">
				{{title}}
			</h1>

			<span class="KdHeader__branding__desc" v-if="!minimalized">
				{{description}}
			</span>
		</kd-link>

		<kd-nav-desktop class="KdHeader__navigation" :transparent="transparent" />
		<kd-nav-mobile class="KdHeader__navigation-mobile" ref="mobileNav" v-if="!minimalized" />

		<button @click="openMobileNav" class="KdHeader__mobile" v-if="!minimalized" >
			<icon-menu class="KdHeader__mobile-icon" />
		</button>
	</header>
</template>

<style lang="less" scoped>
	.KdHeader {
		display: flex;
		align-items: center;
		justify-content: space-between;
		max-width: 70vw;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
		padding: 30px 0;

		background: var(--grey-900);
		user-select: none;

		&--transparent {
			background: transparent;
		}

		&--transparent & {
			&__branding {
				color: var(--grey-900);
			}
		}

		&__branding {
			display: block;
			color: var(--grey-050);
			text-decoration: none;

			&__title {
				font-family: var(--font-ui);
				font-size: 2rem;
				font-weight: 800;
				margin: 0;
			}

			&__desc {
				display: block;

				font-family: var(--font-title);
				font-size: 1.3rem;
				font-weight: 300;
				margin-top: 5px;
				word-break: keep-all;
			}
		}

		&__mobile {
			cursor: pointer;
			display: none;
			background: transparent;
			border: none;
			outline: none;
			padding: 6px;
		}
	}

	@media (max-width: 768px) {
		.KdHeader {
			max-width: 100vw;
			padding: 30px;

			&__navigation {
				display: none;
			}

			&__mobile {
				display: inline-block;
			}
		}
	}
</style>

<script>
	import IconMenu from "@/images/IconMenu?inline";
	import KdLink from "@/components/KdLink";
	import KdNavDesktop from "@/layouts/KdNavDesktop";
	import KdNavMobile from "@/layouts/KdNavMobile";

	export default {
		props: {
			minimalized: {
				type: Boolean
			},

			transparent: {
				type: Boolean
			}
		},

		computed: {
			title() {
				return this.$store.state.config.title;
			},

			description() {
				return this.$store.state.config.description;
			}
		},

		methods: {
			openMobileNav() {
				this.$refs.mobileNav.open();
			}
		},

		components: {
			IconMenu,
			KdLink,
			KdNavDesktop,
			KdNavMobile
		}
	};
</script>
