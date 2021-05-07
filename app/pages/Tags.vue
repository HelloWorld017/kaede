<template>
	<div id="Tags">
		<kd-header />
		<section class="Tags__masthead"
			:class="{'Tags__masthead--empty': !tag.name}"
			:style="{ background }">

			<div class="Tags__filter"></div>
			<h2 class="Tags__title">
				{{tag.name}}

				<span class="Tags__count">
					({{count}})
				</span>
			</h2>
			<span class="Tags__description">
				{{description}}
			</span>
		</section>
		<kd-post-list class="Tags__list" :context="[context]" :key="context" automatic />
		<kd-footer />
	</div>
</template>

<style lang="less" scoped>
	#Tags {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		width: 100%;
		min-height: 100vh;
	}

	.Tags {
		&__masthead {
			min-height: 400px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			position: relative;
			user-select: none;
			opacity: 1;
			transition: opacity .4s ease;

			color: rgba(var(--grey-900), 1);
			font-family: var(--font-sans);

			background-size: cover !important;
			background-position: center !important;

			&--empty {
				opacity: 0;
			}
		}

		&__filter {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(var(--grey-100), .5);
		}

		&__title {
			margin-top: 0;
			margin-bottom: .5rem;
			font-size: 2rem;

			&::before {
				content: '#';
				color: rgba(var(--grey-900), .4);
			}
		}

		&__count {
			font-size: .9rem;
		}

		&__title, &__description {
			width: 80vw;
			text-align: center;
			position: relative;
			z-index: 1;
			word-break: keep-all;
		}

		&__list {
			padding-top: 50px;
		}
	}
</style>

<i18n>
{
	"ko": {
		"tag-description": "{count}개의 포스트"
	},

	"en": {
		"tag-description": "A collection of one post. | A collection of {count} posts."
	},

	"ja": {
		"tag-description": "{count}本の記事"
	}
}
</i18n>

<script>
	import api from "@/src/api";

	import KdFooter from "@/layouts/KdFooter";
	import KdHeader from "@/layouts/KdHeader";
	import KdPostList from "@/layouts/KdPostList";

	export default {
		data() {
			return {
				tag: {}
			};
		},

		computed: {
			tagSlug() {
				return this.$route.params.tag;
			},

			description() {
				if(this.tag.description)
					return this.tag.description;

				if(!this.tag.count)
					return;

				return this.$tc(
					'tag-description', this.tag.count.posts, { count: this.tag.count.posts }
				);
			},

			background() {
				return this.tag.feature_image ?
					`url(${this.tag.feature_image})` :
					'rgba(var(--grey-100), 1)';
			},

			count() {
				return this.tag.count ? this.tag.count.posts : 0;
			},

			context() {
				return `tag:${this.tagSlug}`;
			}
		},

		methods: {
			async loadTag() {
				if(this.$route.name !== 'Tags')
					return;

				try {
					this.tag = await api.tags.read({
						slug: this.tagSlug,
						include: 'count.posts'
					});
				} catch(err) {
					location.replace('/404');
				}
			}
		},

		async created() {
			await this.loadTag();
		},

		watch: {
			async tagSlug() {
				await this.loadTag();
			}
		},

		components: {
			KdFooter,
			KdHeader,
			KdPostList
		}
	};
</script>
