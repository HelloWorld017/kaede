<template>
	<main class="KdPostList">
		<div class="KdPostList__content">
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

			<slot name="beforeList"></slot>

			<section class="KdPostList__list">
				<h2 class="KdPostList__title">{{$t('archives')}}</h2>

				<div class="KdPostList__columns">
					<div class="KdPostList__column" ref="columns"
						v-for="(column, index) in columns"
						:key="index">

						<kd-post class="KdPostList__post" v-for="post in column"
							:post="posts[post]"
							:key="posts[post].id"
							:index="posts[post].index"
							:timestamped="isDesktop && index === 0">
						</kd-post>
					</div>
				</div>

				<kd-scroll-trigger :current="current" :max="max"
					:loadNext="loadMoreBound" :automatic="automatic"
					ref="trigger" />

			</section>

			<slot name="afterList"></slot>

			<div class="KdPostList__thank">{{$t('thank')}}</div>
		</div>
	</main>
</template>

<i18n>
{
	"ko": {
		"featured": "Featured",
		"archives": "Archives",
		"thank": "읽어주셔서 감사합니다!"
	},

	"en": {
		"featured": "Featured",
		"archives": "Archives",
		"thank": "Thank you for reading!"
	},

	"ja": {
		"thank": "読んでくださりありがとうございます！"
	}
}
</i18n>

<style lang="less" scoped>
	.KdPostList {
		flex-grow: 1;
		background: var(--background-400);

		&__content {
			width: 100%;
			max-width: 70vw;
			margin: 0 auto;
			box-sizing: border-box;
		}

		&__title {
			color: var(--grey-050);
			font-family: var(--font-ui);
			font-size: 2rem;
			font-weight: 700;
			text-transform: uppercase;
			user-select: none;
		}

		&__carousel {
			margin: 0 100px;
		}

		&__columns {
			display: flex;
		}

		&__column {
			flex: 1;
			margin: 0 15px;
			width: 0;
		}

		&__post {
			margin: 30px 0;
		}

		&__thank {
			color: rgba(64, 64, 64, .3);
			font-size: 2.7rem;
			font-weight: 100;
			font-family: var(--font-ui);
			text-align: center;
			margin: 0 auto;
			margin-top: 90px;
			padding-bottom: 120px;
			user-select: none;
		}

		&__featured {
			margin-bottom: 40px;
		}
	}

	@media (min-width: 1500px) {
		.KdPostList {
			&__columns {
				padding-left: 5rem;
			}
		}
	}

	@media (max-width: 1300px) {
		.KdPostList__carousel {
			margin: 0;
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

			&__column {
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
		transform: translate(0, -50%);

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

	@media (max-width: 900px) {
		.agile__nav-button {
			display: none;
		}
	}
</style>

<script>
	import api from "@/src/api";
	import calculateHeight from "@/src/calculateHeight";

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

				innerWidth: window.innerWidth,
				tabletColumn: [],
				leftColumn: [],
				leftHeight: 0,
				rightColumn: [],
				rightHeight: 0,

				current: 0,
				max: 1
			};
		},

		props: {
			context: {
				type: String,
				required: true
			},

			automatic: {
				type: Boolean
			}
		},

		computed: {
			isTablet() {
				return this.innerWidth < 1300;
			},

			isDesktop() {
				return this.innerWidth >= 1500;
			},

			columns() {
				if(this.isTablet)
					return [this.tabletColumn];

				return [this.leftColumn, this.rightColumn];
			}
		},

		methods: {
			async loadFeatured() {
				const featureContext = [
					'featured:true'
				];

				if (this.context)
					featureContext.push(`(${this.context})`);

				const featured = await api.posts.browse({
					limit: 4,
					filter: featureContext.join('+'),
					include: 'tags'
				});

				this.featured = featured;
			},

			async loadMore() {
				if(this.current >= this.max)
					return;

				const posts = await api.posts.browse({
					page: this.current + 1,
					filter: this.context,
					include: 'tags'
				});

				let columnWidth = 300;
				let columnBoundBox = null;
				if(this.$refs.columns.length >= 1) {
					columnBoundBox = this.$refs.columns[0].getBoundingClientRect();
					columnWidth = columnBoundBox.width;
				}

				if(this.$refs.columns.length >= 2) {
					const rightBoundBox = this.$refs.columns[1].getBoundingClientRect();

					this.leftHeight = columnBoundBox.height;
					this.rightHeight = rightBoundBox.height;
				}

				posts.forEach((post, index) => {
					post.index = index;

					const postHeight = calculateHeight(post, columnWidth);

					if(this.leftHeight <= this.rightHeight) {
						this.leftHeight += postHeight;
						this.leftColumn.push(post.id);
					} else {
						this.rightHeight += postHeight;
						this.rightColumn.push(post.id);
					}

					this.tabletColumn.push(post.id);

					this.posts[post.id] = post;
				});

				this.max = posts.meta.pagination.pages;
				this.current = posts.meta.pagination.page;
			},

			updateIsTablet() {
				this.innerWidth = window.innerWidth;
			}
		},

		created() {
			this.loadMoreBound = this.loadMore.bind(this);
			this.updateIsTabletBound = this.updateIsTablet.bind(this);
			window.addEventListener('resize', this.updateIsTabletBound);
		},

		async mounted() {
			this.updateIsTablet();
			await this.loadFeatured();
			await this.$refs.trigger.init();
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
