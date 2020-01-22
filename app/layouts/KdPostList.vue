<template>
	<main class="KdPostList">
		<div class="KdPostList__content">
			<transition name="Fade">
				<div class="KdPostList__featured" v-if="featured.length > 0">
					<h2 class="KdPostList__title">{{$t('featured')}}</h2>

					<vue-agile class="KdPostList__carousel">
						<kd-post-large v-for="post in featured" :post="post" :key="post.id" />
						<template #prevButton>
							<icon-previous />
						</template>
						<template #nextButton>
							<icon-next />
						</template>
					</vue-agile>
				</div>
			</transition>

			<kd-scroll-trigger :current="current" :max="max" :loadNext="loadMoreBound" ref="trigger" />
			<div class="KdPostList__thank">{{$t('thank')}}</div>
		</div>
	</main>
</template>

<i18n>
{
	"ko": {
		"featured": "Featured",
		"thank": "Thank you for reading!"
	},

	"en": {
		"featured": "Featured",
		"thank": "Thank you for reading!"
	}
}
</i18n>

<style lang="less" scoped>
	.KdPostList {
		flex-grow: 1;
		background: var(--color-background);

		&__content {
			width: 100%;
			max-width: 70vw;
			margin: 0 auto;
			box-sizing: border-box;
		}

		&__title {
			font-family: var(--font-ui);
			font-size: 2rem;
			font-weight: 700;
			text-transform: uppercase;
			user-select: none;
		}

		&__carousel {
			margin: 0 100px;
		}

		&__thank {
			color: rgba(64, 64, 64, .3);
			font-size: 3rem;
			font-weight: 700;
			font-family: var(--font-ui);
			text-align: center;
			margin: 0 auto;
			margin-top: 30px;
			user-select: none;
		}
	}

	@media (max-width: 768px) {
		.KdPostList {
			&__content {
				max-width: 100vw;
				padding: 0 15px;
			}

			&__carousel {
				margin: 0;
			}
		}
	}
</style>

<style lang="less">
	.agile__nav-button {
		position: absolute;
		top: 50%;
		cursor: pointer;
		outline: none;
		background: transparent;
		border: none;

		&--prev {
			left: -100px;
		}

		&--next {
			right: -100px;
		}
	}

	.agile__dots {
		width: 100%;
		justify-content: flex-end;
	}

	.agile__dot button {
		width: 8px;
		height: 8px;
		border: 1.5px solid var(--grey-100);
		border-radius: 100%;
		padding: 0;
		margin: 0 10px;
		transition: all .4s ease;
	}

	.agile__dot--current button {
		background: var(--grey-100);
	}

	@media (max-width: 768px) {
		.agile__nav-button {
			display: none;
		}
	}
</style>

<script>
	import api from "@/src/api";

	import IconNext from "@/images/IconNext?inline";
	import IconPrevious from "@/images/IconPrevious?inline";
	import KdPostLarge from "@/components/KdPostLarge";
	import KdScrollTrigger from "@/components/KdScrollTrigger";
	import { VueAgile } from "vue-agile";

	export default {
		data() {
			return {
				posts: [],
				featured: [],
				current: 0,
				max: 1
			};
		},

		props: {
			context: {
				type: Array,
				required: true
			}
		},

		methods: {
			async loadFeatured() {
				const featureContext = [
					'featured:true',
					...this.context
				].join('+');

				const featured = await api.posts.browse({
					limit: 4,
					filter: featureContext,
					include: 'tags'
				});

				console.log(featured);

				this.featured = featured;
			},

			loadMore() {

			}
		},

		created() {
			this.loadMoreBound = this.loadMore.bind(this);
		},

		async mounted() {
			await this.loadFeatured();
			await this.$refs.trigger.preload();
		},

		components: {
			IconNext,
			IconPrevious,
			KdPostLarge,
			KdScrollTrigger,
			VueAgile
		}
	};
</script>
