<template>
	<main class="KdPostList">
		<div class="KdPostList__content">
			<transition name="Fade">
				<section class="KdPostList__featured" v-if="featured.length > 0">
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
				</section>
			</transition>

			<section class="KdPostList__list">
				<div class="KdPostList__columns">
					<div class="KdPostList__column" v-for="(column, index) in columns" :key="index">
						<kd-post v-for="post in column"
							:post="posts[post]"
							:key="posts[post].id"
							:index="posts[post].index">
						</kd-post>
					</div>
				</div>

				<kd-scroll-trigger :current="current" :max="max" :loadNext="loadMoreBound" ref="trigger" />
			</section>

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
	import KdPost from "@/components/KdPost";
	import KdPostLarge from "@/components/KdPostLarge";
	import KdScrollTrigger from "@/components/KdScrollTrigger";
	import { VueAgile } from "vue-agile";

	export default {
		data() {
			return {
				posts: {},
				featured: [],

				isTablet: false,
				leftColumn: [],
				rightColumn: [],
				tabletColumn: [],

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

		computed: {
			columns() {
				if(this.isTablet) return [this.tabletColumn];

				return [this.leftColumn, this.rightColumn];
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

				this.featured = featured;
			},

			loadMore() {

			},

			updateIsTablet() {
				this.isTablet = window.innerWidth < 900;
			}
		},

		created() {
			this.loadMoreBound = this.loadMore.bind(this);
			this.updateIsTabletBound = this.updateIsTablet.bind(this);
			window.addEventListener('resize', this.updateIsTabletBound);
		},

		async mounted() {
			await this.loadFeatured();
			await this.$refs.trigger.preload();
		},

		destroyed() {
			window.removeEventListener('resize', this.updateIsTabletBound);
		},

		components: {
			IconNext,
			IconPrevious,
			KdPost,
			KdPostLarge,
			KdScrollTrigger,
			VueAgile
		}
	};
</script>
