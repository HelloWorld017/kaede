<template>
	<nav class="KdNavigation">
		<template v-for="item in navigation">
			<kd-link class="KdNavigation__item"
				active-class="KdNavigation__item--active"
				:key="item.url" :href="item.url">

				{{item.label}}
			</kd-link>
		</template>

		<kd-bookmark-badge class="KdNavigation__item" />
	</nav>
</template>

<style lang="less" scoped>
	.KdNavigation {
		display: flex;

		&__item {
			cursor: pointer;
			position: relative;
			padding: 7px 14px;
			outline: none;

			color: var(--grey-050);
			font-family: var(--font-sans);
			font-size: 1.1rem;
			font-weight: 600;
			text-decoration: none;

			&::after {
				content: '';
				display: inline-block;

				position: absolute;
				left: 0;
				right: 0;
				bottom: -3px;

				width: 100%;
				height: 3px;
				background: var(--grey-050);

				transition: transform .4s ease;
				transform: scaleX(0);
			}

			&--active, &:hover {
				&::after {
					transform: scaleX(.8);
				}
			}

			&--active {
				cursor: default;
			}
		}
	}
</style>

<script>
	import KdBookmarkBadge from "@/components/KdBookmarkBadge";
	import KdLink from "@/components/KdLink";

	export default {
		computed: {
			navigation() {
				return this.$store.state.config.navigation;
			}
		},

		components: {
			KdBookmarkBadge,
			KdLink
		}
	};
</script>
