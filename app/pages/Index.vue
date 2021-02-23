<template>
	<div id="Index">
		<kd-header />

		<kd-selector :items="['all', 'featured']" v-model="type" v-if="featured">
			<template #all> {{ $t('all') }} </template>
			<template #featured> {{ featured.name }} </template>
		</kd-selector>

		<kd-post-list :context="context" :key="type">
			<div class="Index__tags Tags">
				<h2 class="Tags__title">
					{{$t('tags')}}
				</h2>

				<div class="Tags__tags">
					<kd-link class="Tags__tag" :href="tag.url" v-for="tag in tags" :key="tag.slug">
						#{{tag.name}}
					</kd-link>
				</div>
			</div>
		</kd-post-list>
		<kd-footer />
	</div>
</template>

<i18n>
{
	"ko": {
		"tags": "Tags",
		"all": "전체 포스트"
	},

	"en": {
		"tags": "Tags",
		"all": "All Posts"
	},

	"ja": {
		"tags": "Tags",
		"all": "全ての記事"
	}
}
</i18n>

<style lang="less" scoped>
	#Index {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		width: 100%;
		min-height: 100vh;
	}

	.Tags {
		&__title {
			font-family: var(--font-ui);
			font-size: 2rem;
			font-weight: 700;
			text-transform: uppercase;
			user-select: none;
		}

		&__tags {
			display: flex;
			flex-wrap: wrap;
		}

		&__tag {
			color: rgba(32, 32, 32, .4);
			background: rgba(255, 255, 255, .4);
			font-family: var(--font-sans);
			font-weight: 700;
			text-decoration: none;
			padding: 2px 8px;
			margin: 5px;
			border-radius: 5px;
			transition: color .4s ease;

			&:hover {
				color: rgba(32, 32, 32, .7);
			}
		}
	}
</style>

<script>
	import api from "@/src/api";
	import kaedeSettings from "@/src/kaedeSettings";

	import KdFooter from "@/layouts/KdFooter";
	import KdHeader from "@/layouts/KdHeader";
	import KdLink from "@/components/KdLink";
	import KdPostList from "@/layouts/KdPostList";
	import KdSelector from "@/components/KdSelector";

	export default {
		data() {
			return {
				type: 'all',
				tags: [],
				featured: kaedeSettings.featuredTags
			};
		},

		computed: {
			context() {
				if (this.type === 'all')
					return null;

				const contexts = [];

				if (this.featured.exclude) {
					const excludedTags = this.featured.exclude.join(',');
					contexts.push(`tags:-[${excludedTags}]`);
				}

				if (this.featured.include) {
					const includedTags = this.featured.include.join(',');
					contexts.push(`tags:[${includedTags}]`);
				}

				return contexts.join(',');
			}
		},

		async created() {
			this.tags = await api.tags.browse({
				filter: 'visibility:public'
			});
		},

		components: {
			KdFooter,
			KdHeader,
			KdLink,
			KdPostList,
			KdSelector
		}
	};
</script>
