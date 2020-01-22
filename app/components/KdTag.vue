<template>
	<kd-link class="KdTag" :href="tag.url">
		{{tag.name}}
	</kd-link>
</template>

<style lang="less" scoped>
	.KdTag {
		cursor: pointer;
		background: var(--color-foreground);
		padding: 8px 16px;
		color: var(--grey-900);
		font-family: var(--font-ui);
		font-size: 1rem;
		font-weight: 700;
		text-transform: uppercase;
		text-decoration: none;
	}
</style>

<script>
	import KdLink from "@/components/KdLink";

	export default {
		props: {
			tag: {
				type: Object,
				required: true
			}
		},

		components: {
			KdLink
		}
	};
</script>
