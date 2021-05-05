<template>
	<kd-link class="KdTag" :class="{ 'KdTag--monochrome': monochrome }" :href="tag.url">
		{{tag.name}}
	</kd-link>
</template>

<style lang="less" scoped>
	.KdTag {
		cursor: pointer;
		background: rgba(var(--foreground-400), 1);
		padding: 8px 16px;
		color: rgba(var(--grey-900), 1);
		font-family: var(--font-ui);
		font-size: 1rem;
		font-weight: 700;
		user-select: none;
		text-transform: uppercase;
		text-decoration: none;

		&--monochrome {
			background: rgba(var(--grey-200), 1);
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
