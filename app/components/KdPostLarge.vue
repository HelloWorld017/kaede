<template>
	<div class="KdPostLarge">
		<img class="KdPostLarge__image" v-if="post.feature_image" :src="post.feature_image">
		<div class="KdPostLarge__content PostContent">
			<h3 class="KdPostLarge__title">{{post.title}}</h3>
			<p class="KdPostLarge__excerpt" v-html="excerpt"></p>

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
	.KdPostLarge {
		display: flex;
		background: var(--grey-900);
		min-height: 500px;
		flex-basis: 0;

		&__image {
			object-fit: cover;
			width: 300px;
			flex-basis: 300px;
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
			display: inline-block;
			padding: 10px 20px;
			margin: 0;
			margin-top: 10px;
			margin-right: auto;
		}

		&__excerpt {
			position: relative;
			max-height: 12.8rem;
			line-height: 1.6rem;
			text-align: justify;
			overflow: hidden;
			font-family: var(--font-sans);
			font-weight: 600;

			&::first-letter {
				display: inline-block;
				font-size: 3rem;
				line-height: 3rem;
				float: left;
				padding-right: 15px;
			}

			&::after {
				content: '';
				position: absolute;
				right: 0;
				bottom: 0;
				width: 10rem;
				height: 1.6rem;
				background: linear-gradient(to right, transparent, rgba(255, 255, 255, 1));
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
</style>

<script>
	import createExcerpt from "@/src/excerpt";

	import KdContinue from "@/components/KdContinue";
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
			KdTag
		}
	};
</script>
