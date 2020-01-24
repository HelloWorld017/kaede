<template>
	<transition name="Fade">
		<div id="Post" v-if="post">
			<header class="Post__masthead" :style="{ background }">
				<div class="Post__masthead-filter"></div>
				<kd-header class="Post__nav" transparent />
			</header>

			<main class="Post__body">
				<div class="Post__header">
					<h1 class="Post__title">{{post.title}}</h1>
					<div class="Post__metadata">
						<div class="Post__metadata-item">
							<icon-timestamp class="Post__metadata-icon" />
							{{timestamp}}
						</div>

						<div class="Post__metadata-item">
							<icon-readtime class="Post__metadata-icon" />
							{{readtime}}
						</div>
					</div>
				</div>

				<section class="Post__content Posting" v-html="post.html"></section>
			</main>
		</div>
	</transition>
</template>

<style lang="less" scoped>
	#Post {
		background: var(--color-background);
		min-height: 100vh;
	}

	.Post {
		&__masthead {
			position: relative;
			background-position: center !important;
			background-size: cover !important;
			min-height: 300px;
		}

		&__masthead-filter {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(32, 32, 32, .5);
		}

		&__nav {
			position: relative;
		}

		&__body {
			max-width: 70vw;
			margin: 0 auto;
			padding: 30px;
		}

		&__header {
			margin: 1.5rem 0;
		}

		&__title {
			font-family: var(--font-title);
			font-weight: 100;
			margin: 0;
			margin-bottom: 10px;
		}

		&__metadata {
			display: flex;
		}

		&__metadata-item {
			font-family: var(--font-sans);
			font-weight: 700;
			color: rgba(32, 32, 32, .5);
			fill: rgba(32, 32, 32, .5);
			margin-right: 20px;
		}

		&__metadata-icon {
			height: 1rem;
			vertical-align: middle;
			margin-right: -3px;
		}
	}
</style>

<style lang="less">
@import "../less/posting.less";
</style>

<i18n>
{
	"ko": {
		"readtime": "읽는데 {time}"
	},

	"en": {
		"readtime": "{time} to read"
	}
}
</i18n>

<script>
	import api from "@/src/api";
	import calculateReadtime from "@/src/calculateReadtime";
	import createExcerpt from "@/src/createExcerpt";
	import moment from "moment";

	import IconReadtime from "@/images/IconReadtime?inline";
	import IconTimestamp from "@/images/IconTimestamp?inline";
	import KdFooter from "@/layouts/KdFooter";
	import KdHeader from "@/layouts/KdHeader";
	import KdLink from "@/components/KdLink";
	import KdPostList from "@/layouts/KdPostList";
	import KdTopbar from "@/layouts/KdTopbar";

	export default {
		data() {
			return {
				post: null
			};
		},

		computed: {
			postSlug() {
				return this.$route.params.post;
			},

			background() {
				return this.post.feature_image ?
					`url(${this.post.feature_image})` :
					'#202020';
			},

			readtime() {
				return this.$t('readtime', {
					time: calculateReadtime(createExcerpt(this.post.html), this.post)
				});
			},

			timestamp() {
				return moment(this.post.published_at).format("YYYY. MM. DD");
			}
		},

		async created() {
			this.post = await api.posts.read({
				slug: this.postSlug
			});
		},

		components: {
			IconReadtime,
			IconTimestamp,
			KdFooter,
			KdHeader,
			KdLink,
			KdPostList,
			KdTopbar
		}
	};
</script>
