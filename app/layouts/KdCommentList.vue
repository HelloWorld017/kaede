<template>
	<div class="KdCommentList">
		<div class="KdCommentList__list">
			<kd-comment-write :id="id" @add="handleAdd" />
			<kd-comment v-for="comment in comments" :key="comment._id" :id="comment._id"
				:post-id="id" :comment="comment" @add="handleAdd" @delete="handleDelete" />
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
				data.comments.forEach((comment, index) => {
					comment.index = index;
				});

				this.comments.push(...data.comments);

				this.max = data.pagination.max;
				this.current = data.pagination.current;
			},

			async handleAdd(comment) {
				let position = this.comments.findIndex(elem => {
					if(elem.threadId > comment.threadId)
						return true;

					if(elem.threadId < comment.threadId)
						return false;

					if(elem.subThreadId >= comment.subThreadId)
						return true;

					return false;
				});

				comment.index = 0;

				if(position < 0)
					position = this.comments.length;

				this.comments.splice(position, 0, comment);

				await new Promise(resolve => this.$nextTick(resolve));
				location.hash = `#${comment._id}`;
			},

			handleDelete({ candidates, deleted }) {
				if(candidates) {
					const candidateComment = this.comments.find(({ _id }) => _id === candidates);
					if(candidateComment)
						this.$set(candidateComment, 'deleted', true);
				}

				this.comments = this.comments.filter(({ _id }) => !deleted.includes(_id));
			}
		},

		created() {
			this.loadMoreBound = this.loadMore.bind(this);
		},

		mounted() {
			this.$refs.trigger.init(false);
		},

		components: {
			KdComment,
			KdCommentWrite,
			KdScrollTrigger
		}
	};
</script>
