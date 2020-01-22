<template>
	<div class="KdPost">
		<div class="KdPost__header">
			<div class="KdPost__metadata">
				<h3 class="KdPost__title">
					<kd-link :href="post.url">{{post.title}}</kd-link>
				</h3>
				<span class="KdPost__readtime">{{readtime}}</span>
				<div class="KdPost__tags">
					<kd-tag v-for="tag in post.tags" :key="tag.id" :tag="tag" />
				</div>
			</div>

			<time class="KdPost__time" :datetime="datetime">{{datetext}}</time>
		</div>

		<kd-link class="KdPost__image-link" :href="post.url">
			<img class="KdPost__image" v-if="post.feature_image" :src="post.feature_image">
		</kd-link>

		<div class="KdPost__content">
			<p class="KdPost__excerpt"
				:class="{'KdPost__excerpt--noncustom': !post.custom_excerpt}"
				v-html="excerpt">
			</p>
		</div>

		<div class="KdPost__footer">
			<kd-continue class="KdPost__continue" :href="post.url" />
		</div>
	</div>
</template>

<style lang="less" scoped>
	@import "../less/utils.less";

	.KdPost {
		background: var(--grey-900);

		&__header {
			display: flex;
			justify-content: space-between;
			padding: 25px 30px;
		}

		&__title {
			margin: 0;
			color: var(--grey-050);
			font-family: var(--font-sans);
			font-weight: 800;
			font-size: 1.6rem;
			text-decoration: none;
			user-select: none;

			* {
				color: inherit;
				text-decoration: inherit;
			}
		}

		&__readtime {
			display: block;
			font-family: var(--font-sans);
			font-size: .8rem;
			margin-bottom: 10px;
			user-select: none;
		}

		&__time {
			font-family: var(--font-sans);
			font-weight: 200;
			font-size: 1.2rem;
			user-select: none;
		}

		&__tags {
			display: flex;
		}

		&__image-link {
			user-select: none;
		}

		&__image {
			display: inline-block;
			width: 100%;
			height: 200px;
			object-fit: cover;
		}

		&__content {
			padding: 15px 30px;
			user-select: none;
		}

		&__excerpt {
			position: relative;
			margin: 0;
			max-height: 12.8rem;
			line-height: 1.6rem;
			text-align: justify;
			overflow: hidden;
			font-family: var(--font-sans);

			&--noncustom::after {
				.OverflowFade;
			}
		}

		&__footer {
			padding-top: 0;
			padding-left: 30px;
			padding-bottom: 30px;
		}
	}
</style>

<script>
	import createExcerpt from "@/src/excerpt";

	import KdContinue from "@/components/KdContinue";
	import KdLink from "@/components/KdLink";
	import KdTag from "@/components/KdTag";

	export default {
		props: {
			post: {
				type: Object,
				required: true
			}
		},

		computed: {
			readtime() {
				return "읽는데 3분";
			},

			datetime() {
				return "2019-10-11";
			},

			datetext() {
				return "월요일";
			},

			excerpt() {
				if(this.post.custom_excerpt)
					return this.post.custom_excerpt;

				return createExcerpt(this.post.html);
			}
		},

		components: {
			KdContinue,
			KdLink,
			KdTag
		}
	};
</script>
