<template>
	<header class="KdHeader">
		<kd-link class="KdHeader__branding" href="/">
			<h1 class="KdHeader__branding__title">
				{{title}}
			</h1>

			<span class="KdHeader__branding__desc">
				{{description}}
			</span>
		</kd-link>

		<kd-navigation class="KdHeader__navigation" />
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
		user-select: none;

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
			}
		}
	}

	@media(max-width: 768px) {
		.KdHeader {
			max-width: 100vw;
			padding: 30px;
		}
	}
</style>

<script>
	import KdLink from "@/components/KdLink";
	import KdNavigation from "@/layouts/KdNavigation";

	export default {
		computed: {
			title() {
				return this.$store.state.config.title;
			},

			description() {
				return this.$store.state.config.description;
			}
		},

		components: {
			KdLink,
			KdNavigation
		}
	};
</script>
