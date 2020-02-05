<template>
	<div id="Index">
		<kd-header />
		<kd-post-list :context="[]">
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
		"tags": "Tags"
	},

	"en": {
		"tags": "Tags"
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

	import KdFooter from "@/layouts/KdFooter";
	import KdHeader from "@/layouts/KdHeader";
	import KdLink from "@/components/KdLink";
	import KdPostList from "@/layouts/KdPostList";

	export default {
		data() {
			return {
				tags: []
			};
		},

		components: {
			KdFooter,
			KdHeader,
			KdLink,
			KdPostList
		},

		async created() {
			this.tags = await api.tags.browse({
				filter: 'visibility:public'
			});
		}
	};
</script>
