<template>
	<div id="Tags">
		<kd-topbar />
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
		<kd-post-list class="Tags__list" :context="[`tag:${tagSlug}`]" automatic />
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

			color: var(--grey-900);
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
			background: rgba(32, 32, 32, .5);
		}

		&__title {
			margin-top: 0;
			margin-bottom: .5rem;
			font-size: 2rem;

			&::before {
				content: '#';
				color: rgba(255, 255, 255, .4);
			}
		}

		&__count {
			font-size: .9rem;
		}

		&__title, &__description {
			position: relative;
			z-index: 1;
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
	}
}
</i18n>

<script>
	import api from "@/src/api";

	import KdFooter from "@/layouts/KdFooter";
	import KdHeader from "@/layouts/KdHeader";
	import KdPostList from "@/layouts/KdPostList";
	import KdTopbar from "@/layouts/KdTopbar";

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
					'#202020';
			},

			count() {
				return this.tag.count ? this.tag.count.posts : 0;
			}
		},

		async created() {
			this.tag = await api.tags.read({
				slug: this.tagSlug,
				include: 'count.posts'
			});
		},

		components: {
			KdFooter,
			KdHeader,
			KdPostList,
			KdTopbar
		}
	};
</script>
