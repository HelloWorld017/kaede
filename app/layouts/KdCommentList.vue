<template>
	<div class="KdCommentList">
		<div class="KdCommentList__list">
			<kd-comment-write :id="id" />
			<kd-comment v-for="comment in comments" :key="comment._id" />
		</div>

		<kd-scroll-trigger :current="current" :max="max"
			:loadNext="loadMoreBound" automatic ref="trigger" />
	</div>
</template>

<style lang="less" scoped>
	.KdCommentList {
		padding: 10px;
		padding-top: 30px;
	}
</style>

<script>
	import kaedeApi from "@/src/kaedeApi";

	import KdComment from "@/components/KdComment";
	import KdCommentWrite from "@/layouts/KdCommentWrite";
	import KdScrollTrigger from "@/components/KdScrollTrigger";

	export default {
		data() {
			return {
				comments: [],
				current: 0,
				max: 1
			};
		},

		props: {
			id: {
				type: String,
				required: true
			}
		},

		methods: {
			async loadMore() {
				if(this.current >= this.max)
					return;

				const { data } = await kaedeApi.get(`/${this.id}/comments?page=${this.current + 1}`);
				this.comments.push(...data.comments);

				this.max = data.pagination.max;
				this.current = data.pagination.current;
			}
		},

		created() {
			this.loadMoreBound = this.loadMore.bind(this);
		},

		mounted() {
			this.$refs.trigger.init();
		},

		components: {
			KdComment,
			KdCommentWrite,
			KdScrollTrigger
		}
	};
</script>
