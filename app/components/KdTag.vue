<template>
	<kd-link class="KdTag" :class="{ 'KdTag--monochrome': monochrome }" :href="tag.url">
		{{tag.name}}
	</kd-link>
</template>

<style lang="less" scoped>
	.KdTag {
		cursor: pointer;
		background: var(--grey-800_rgb);
		border-radius: 5px;
		padding: 8px 16px;
		color: var(--grey-100_rgb);
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
