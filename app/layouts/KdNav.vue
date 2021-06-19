<template>
	<nav class="KdNav" :class="{'KdNav--transparent': transparent}">
		<template v-for="item in navigation">
			<kd-link class="KdNav__item"
				active-class="KdNav__item--active"
				:key="item.url" :href="item.url">

				{{item.label}}
			</kd-link>
		</template>
	</nav>
</template>

<style lang="less" scoped>
	.KdNav {
		display: flex;
		flex-wrap: wrap;
		margin-left: 10px;

		&__item {
			cursor: pointer;
			position: relative;
			padding: 10px 14px;
			outline: none;

			color: var(--grey-050_rgb);
			font-family: var(--font-sans);
			font-size: 1.1rem;
			font-weight: 500;
			text-decoration: none;

			fill: var(--grey-050_rgb);

			&::after {
				content: '';
				display: inline-block;

				position: absolute;
				left: 0;
				right: 0;
				bottom: 3px;

				width: 100%;
				height: 3px;
				background: var(--grey-050_rgb);

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

		&--transparent & {
			&__item {
				color: var(--grey-900_rgb);
				fill: var(--grey-900_rgb);

				&::after {
					background: var(--grey-900_rgb);
				}
			}
		}
	}
</style>

<script>
	import KdLink from "@/components/KdLink";

	export default {
		props: {
			transparent: {
				type: Boolean
			}
		},

		computed: {
			navigation() {
				return this.$store.state.config.navigation;
			}
		},

		components: {
			KdLink
		}
	};
</script>
