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

		color: rgba(var(--foreground-400), 1);
		border: 3px solid rgba(var(--foreground-400), 1);

		font-family: var(--font-ui);
		font-weight: 700;
		text-decoration: none;
		text-transform: uppercase;
		
		user-select: none;

		&:hover {
			background: rgba(var(--foreground-400), 1);
			color: rgba(var(--grey-900), 1);
		}

		&:hover &__icon {
			stroke: rgba(var(--grey-900), 1);
		}

		&__icon {
			margin-left: 7px;
			height: 1rem;
			stroke: rgba(var(--foreground-400), 1);
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
