<template>
	<nav class="KdNav" :class="{'KdNav--transparent': transparent}">
		<template v-for="item in navigation">
			<kd-link class="KdNav__item"
				active-class="KdNav__item--active"
				:key="item.url" :href="item.url">

				{{item.label}}
			</kd-link>
		</template>

		<kd-bookmark-badge v-if="bookmarkEnabled" class="KdNav__item" @bookmark="$emit('bookmark')" />
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

			color: var(--grey-050);
			font-family: var(--font-sans);
			font-size: 1.1rem;
			font-weight: 600;
			text-decoration: none;

			fill: var(--grey-050);

			&::after {
				content: '';
				display: inline-block;

				position: absolute;
				left: 0;
				right: 0;
				bottom: 3px;

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

		&--transparent & {
			&__item {
				color: var(--grey-900);
				fill: var(--grey-900);

				&::after {
					background: var(--grey-900);
				}
			}
		}
	}
</style>

<script>
	import KdBookmarkBadge from "@/components/KdBookmarkBadge";
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
			},

			bookmarkEnabled() {
				return window.$KaedeBookmarkEnabled;
			}
		},

		components: {
			KdBookmarkBadge,
			KdLink
		}
	};
</script>
