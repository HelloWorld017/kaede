<template>
	<footer class="KdFooter">
		<div class="KdFooter__content">
			<span class="KdFooter__blogname">
				{{title}}
			</span>

			<span class="KdFooter__powered">
				{{$t('published-with')}}
				<span class="KdFooter__credit">
					{{$t('credit')}}
				</span>
			</span>
		</div>
	</footer>
</template>

<style lang="less" scoped>
	.KdFooter {
		padding: 15px 20px;
		background: rgba(var(--grey-100), 1);
		user-select: none;

		color: rgba(var(--grey-900), 1);
		font-family: var(--font-ui);

		&__content {
			display: flex;
			justify-content: space-between;
			align-items: center;

			max-width: 70vw;
			margin: 0 auto;
		}

		&__blogname {
			font-weight: 700;
			font-size: 1.8rem;
		}

		&__powered {
			font-weight: 700;
		}

		&__credit {
			font-weight: 200;
		}
	}

	@media (max-width: 768px) {
		.KdFooter__powered {
			display: none;
		}
	}
</style>

<i18n>
{
	"ko": {
		"published-with": "Published with",
		"credit": "Kaede, Ghost"
	},

	"en": {
		"published-with": "Published with",
		"credit": "Kaede, Ghost"
	}
}
</i18n>

<script>
	export default {
		computed: {
			title() {
				return this.$store.state.config.title;
			}
		}
	};
</script>
