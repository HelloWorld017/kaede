<template>
	<div class="KdPost">
		<div class="KdPost__header">
			<div class="KdPost__metadata">
				<h3 class="KdPost__title">{{post.title}}</h3>
				<span class="KdPost__readtime">{{readtime}}</span>
				<div class="KdPost__tags">
					<kd-tag v-for="tag in post.tags" :key="tag.id" :tag="tag" />
				</div>
			</div>

			<time class="KdPost__time" :datetime="datetime">{{datetext}}</time>
		</div>

		<p class="KdPost__excerpt" v-html="excerpt"></p>

		<kd-continue class="KdPost__continue" :href="post.url" />
	</div>
</template>

<script>
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
			readtime() {

			},

			datetime() {

			},

			datetext() {

			},

			excerpt() {

			}
		},

		components: {
			KdContinue,
			KdTag
		}
	};
</script>
