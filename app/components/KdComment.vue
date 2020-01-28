<template>
	<div class="KdComment">
		<div class="KdComment__comment">
			<icon-replied v-if="isReply" class="KdComment__indicator" />

			<div class="KdComment__meta">
				<div class="KdComment__author">
					{{comment.author}}
				</diV>

				<div class="KdComment__options">
					<button @click="deleteComment" class="KdComment__option">
						<icon-delete class="KdComment__option-icon" />
					</button>

					<button @click="reply" v-if="!isReply" class="KdComment__option">
						<icon-reply class="KdComment__option-icon" />
					</button>
				</div>
			</div>

			<div class="KdComment__bubble">
				{{comment.content}}
			</div>

			<div class="KdComment__datetime">
				<div class="KdComment__date">
					{{date}}
				</div>

				<div class="KdComment__time">
					{{time}}
				</div>
			</div>
		</div>

		<kd-comment-write :id="id" :replyTo="comment.threadId" @add="emitAdd" v-if="replyEnabled" />
	</div>
</template>

<script>
	import moment from "moment";

	export default {
		data() {
			return {
				replyEnabled: false
			};
		},

		props: {
			comment: {
				type: Object,
				required: true
			}
		},

		computed: {
			isReply() {
				return this.comment.subThreadId !== 0;
			},

			date() {
				return moment(this.comment.date)
					.format('LLLL');
			},

			time() {
				return moment(this.comment.date)
					.format('HH:mm:ss');
			}
		},

		methods: {
			deleteComment() {
				this.$emit('delete', this.comment._id);
			},

			reply() {
				this.replyEnabled = true;
			},

			emitAdd(comment) {
				this.$emit('add', comment);
			}
		}
	};
</script>
