<template>
	<kd-link class="KdTag" :class="{ 'KdTag--monochrome': monochrome }" :href="tag.url">
		{{tag.name}}
	</kd-link>
</template>

<style lang="less" scoped>
	.KdTag {
		cursor: pointer;
		background: var(--foreground-400_rgb);
		padding: 8px 16px;
		color: var(--grey-900_rgb);
		font-family: var(--font-ui);
		font-size: 1rem;
		font-weight: 700;
		user-select: none;
		text-transform: uppercase;
		text-decoration: none;

		&--monochrome {
			background: var(--grey-200_rgb);
		}
	}
</style>

<script>
	import KdLink from "@/components/KdLink";

	export default {
		props: {
			tag: {
				type: Object,
				required: true
			},

			monochrome: {
				type: Boolean
			}
		},

		components: {
			KdLink
		}
	};
</script>
