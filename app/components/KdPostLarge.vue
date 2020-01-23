<template>
	<div class="KdPostLarge">
		<kd-link class="KdPostLarge__image-link" :href="post.url">
			<img class="KdPostLarge__image" v-if="post.feature_image" :src="post.feature_image">
		</kd-link>

		<div class="KdPostLarge__content PostContent">
			<h3 class="KdPostLarge__title">
				<kd-link :href="post.url">{{post.title}}</kd-link>
			</h3>

			<p class="KdPostLarge__custom-excerpt" v-if="post.custom_excerpt">
				{{post.custom_excerpt}}
			</p>

			<p class="KdPostLarge__excerpt"
				:class="{'KdPostLarge__excerpt--has-custom': !!post.custom_excerpt}"
				v-html="excerpt">
			</p>

			<div class="KdPostLarge__metadata">
				<kd-continue class="KdPostLarge__continue" :href="post.url" />

				<div class="KdPostLarge__tags">
					<kd-tag v-for="tag in post.tags" :key="tag.id" :tag="tag" />
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
	@import "../less/utils.less";

	.KdPostLarge {
		display: flex;
		background: var(--grey-900);
		min-height: 500px;
		flex-basis: 0;

		&__image {
			width: 300px;
			height: 100%;
			object-fit: cover;
		}

		&__image-link {
			display: inline-block;
			width: 300px;
			flex-basis: 300px;
			user-select: none;
		}

		&__content {
			padding: 30px 30px;
			box-sizing: border-box;
			flex: 1 1 0;

			display: flex;
			flex-direction: column;
		}

		&__title {
			background: var(--grey-100);
			color: var(--grey-900);
			font-family: var(--font-title);
			font-weight: 300;
			font-size: 1.6rem;
			text-decoration: none;
			display: inline-block;
			padding: 10px 20px;
			margin: 0;
			margin-top: 10px;
			margin-right: auto;

			* {
				color: inherit;
				text-decoration: inherit;
			}
		}

		&__custom-excerpt, &__excerpt {
			position: relative;
			max-height: 12.8rem;
			line-height: 1.6rem;
			text-align: justify;
			overflow: hidden;
			font-family: var(--font-sans);
			font-weight: 600;
		}

		&__custom-excerpt {
			font-weight: 400;
			margin-bottom: 0;
		}

		&__excerpt {
			&::first-letter {
				display: inline-block;
				font-size: 3rem;
				line-height: 3rem;
				float: left;
				padding-right: 15px;
			}

			&::after {
				.OverflowFade;
			}
		}

		&__metadata {
			display: flex;
			flex-direction: column;
			justify-content: flex-end;

			flex: 1;
			margin-top: auto;
		}

		&__tags {
			display: flex;
			flex-wrap: wrap;
		}

		&__continue {
			margin-bottom: 15px;
		}
	}

	@media (max-width: 900px) {
		.KdPostLarge {
			flex-direction: column;
			&__image {
				width: 100%;
				height: 200px;
				object-fit: cover;
			}

			&__image-link {
				display: inline-block;
				flex-basis: 200px;
				width: 100%;
				height: 200px;
				user-select: none;
			}

			&__custom-excerpt {
				margin-bottom: 20px;
			}

			&__excerpt--has-custom {
				display: none;
			}
		}
	}
</style>

<script>
	import createExcerpt from "@/src/createExcerpt";

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
			excerpt() {
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
