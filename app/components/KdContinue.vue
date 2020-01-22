<template>
	<kd-link class="KdContinue" :href="href">
		{{$t('read-more')}}
		<icon-continue class="KdContinue__icon" />
	</kd-link>
</template>

<i18n>
{
	"ko": {
		"read-more": "Read More"
	},

	"en": {
		"read-more": "Read More"
	}
}
</i18n>

<style lang="less" scoped>
	.KdContinue {
		cursor: pointer;
		transition: all .4s ease;

		display: inline-flex;
		align-items: center;
		align-self: flex-start;
		padding: 5px 13px;

		color: var(--color-foreground);
		border: 3px solid var(--color-foreground);

		font-family: var(--font-ui);
		font-weight: 700;
		text-decoration: none;
		text-transform: uppercase;

		&:hover {
			background: var(--color-foreground);
			color: var(--grey-900);
		}

		&:hover &__icon {
			stroke: var(--grey-900);
		}

		&__icon {
			margin-left: 7px;
			height: 1rem;
			stroke: var(--color-foreground);
			transition: all .4s ease;
		}
	}
</style>

<script>
	import IconContinue from "@/images/IconContinue?inline";
	import KdLink from "@/components/KdLink";

	export default {
		props: {
			href: {
				type: String,
				required: true
			}
		},

		components: {
			IconContinue,
			KdLink
		}
	};
</script>
