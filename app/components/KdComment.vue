<template>
	<div class="KdComment" :class="{'KdComment--anim': anim, 'KdComment--admin': comment.admin}">
		<div class="KdComment__comment">
			<icon-replied v-if="isReply" class="KdComment__indicator" />

			<div class="KdComment__meta">
				<div class="KdComment__author">
					{{author}}

					<div class="KdComment__admin" v-if="comment.admin">
						{{$t('admin')}}
					</div>
				</diV>

				<div class="KdComment__options">
					<button @click="deleteMode = true" class="KdComment__option" v-if="!comment.deleted">
						<icon-times class="KdComment__option-icon" />
					</button>

					<button @click="toggleReply" v-if="!isReply" class="KdComment__option">
						<icon-reply class="KdComment__option-icon" />
					</button>
				</div>
			</div>

			<div class="KdComment__bubble">
				{{content}}
			</div>

			<div class="KdComment__datetime">
				<div class="KdComment__date">
					{{date}}
				</div>

				<div class="KdComment__time">
					{{time}}
				</div>
			</div>

			<transition name="Fade">
				<form class="KdComment__delete DeleteDialog" v-if="deleteMode" @submit.prevent="deleteComment">
					<input class="DeleteDialog__input" type="password" v-model="deletePassword"
						:placeholder="$t('password')" required>

					<transition name="Fade">
						<span class="DeleteDialog__failed" v-if="deleteFailed">
							{{$t('delete-failed')}}
						</span>
					</transition>

					<div class="DeleteDialog__options">
						<button class="DeleteDialog__button" type="button" @click="deleteMode = false">
							{{$t('cancel')}}
						</button>

						<button class="DeleteDialog__button DeleteDialog__button--primary" type="submit">
							<icon-times class="DeleteDialog__button-icon" />
							{{$t('delete')}}
						</button>
					</div>
				</form>
			</transition>
		</div>

		<transition name="FadeSlide">
			<div class="KdComment__reply" v-if="replyEnabled">
				<icon-replied class="KdComment__indicator" />
				<kd-comment-write class="KdComment__reply-write"
					:id="postId" :replyTo="comment.threadId"
					@add="emitAdd" small />
			</div>
		</transition>
	</div>
</template>

<i18n>
{
	"ko": {
		"admin": "관리자",
		"password": "비밀번호",
		"cancel": "Cancel",
		"delete": "Delete",
		"delete-failed": "삭제에 실패하였습니다. 비밀번호를 확인 후 다시 시도해주세요.",
		"deleted-author": "사용자",
		"deleted-content": "삭제된 댓글입니다."
	},

	"en": {
		"admin": "Admin",
		"password": "Password",
		"cancel": "Cancel",
		"delete": "Delete",
		"delete-failed": "Failed to delete comments. Please check your password and retry.",
		"deleted-author": "User",
		"deleted-content": "This comment is deleted."
	},

	"ja": {
		"admin": "管理者",
		"password": "パスワード",
		"cancel": "キャンセル",
		"delete": "削除",
		"delete-failed": "パスワードが異なります。",
		"deleted-content": "このコメントは削除されました。",
		"deleted-author": "ユーザー"
	}
}
</i18n>

<style lang="less" scoped>
	.KdComment {
		position: relative;
		transform: translate(-10px, 0);
		opacity: 0;
		transition: all .5s ease;

		&--anim {
			transform: translate(0, 0);
			opacity: 1;
		}

		&__comment {
			display: flex;
			font-family: var(--font-sans);
			margin: 20px 0;
			min-height: 4.5rem;
		}

		&__indicator {
			margin-right: 20px;
		}

		&__meta {
			width: 12%;
			user-select: none;
		}

		&__author {
			margin-bottom: 10px;
			font-size: 1.1rem;
			font-weight: 700;
			word-break: break-all;
		}

		&__admin {
			margin-top: -0.4rem;
			font-size: .8rem;
			font-weight: 400;
		}

		&__options {
			display: flex;
			align-items: center;
		}

		&__option {
			padding: 0;
			margin: 0 3px;

			cursor: pointer;
			background: transparent;
			border: none;
			outline: none;

			&:first-child {
				margin-left: 0;
			}

			&:last-child {
				margin-right: 0;
			}
		}

		&__option-icon {
			stroke: rgba(var(--grey-200), 1);
			height: .8rem;
		}

		&__bubble {
			align-items: stretch;
			flex: 1;
			margin: 0 10px;
			background: rgba(var(--grey-050), .1);
			border-radius: 10px;
			padding: 10px 15px;

			&::selection {
				background: rgba(var(--grey-100), 1);
				color: rgba(var(--grey-900), 1);
			}
		}

		&__datetime {
			font-size: .8rem;
			align-self: flex-end;
			user-select: none;
		}

		&__reply {
			display: flex;
		}

		&__reply-write {
			flex: 1;
		}

		&__delete {
			position: absolute;
			top: -20px;
			left: -20px;
			width: 100%;
			height: 100%;
		}

		&--admin & {
			&__bubble {
				background: rgba(var(--grey-050) .25);
				font-weight: 700;
			}
		}
	}

	.DeleteDialog {
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: content-box;
		padding: 20px;
		background: rgba(var(--grey-050), .4);

		&__input {
			display: inline-block;

			background: rgba(var(--grey-700), 1);
			border: none;
			border-radius: 5px;
			box-sizing: border-box;
			padding: 5px 20px;

			color: rgba(var(--grey-100), 1);
			font-family: var(--font-sans);
			font-size: .9rem;
			font-weight: 700;

			outline: none;
		}

		&__button {
			cursor: pointer;
			border: none;
			outline: none;
			border-radius: 5px;
			color: rgba(var(--grey-900), 1);

			background: rgba(var(--grey-100), 1);
			font-family: var(--font-ui);
			font-weight: 300;
			font-size: .8rem;

			text-transform: uppercase;
			padding: 10px 20px;
			transition: all .4s ease;

			&:hover {
				background: rgba(var(--grey-200), 1);
			}

			&:active {
				background: rgba(var(--grey-050), 1);
			}

			&--primary {
				background: rgba(var(--red-400), 1);

				&:hover {
					background: rgba(var(--red-500), 1);
				}

				&:active {
					background: rgba(var(--red-300), 1);
				}
			}
		}

		&__button-icon {
			fill: rgba(var(--grey-900), 1);
			stroke: rgba(var(--grey-900), 1);

			height: .8rem;
			margin-right: 10px;
			vertical-align: middle;
		}

		&__failed {
			position: absolute;
			left: 20px;
			bottom: 5px;
			color: rgba(var(--red-500), 1);
			font-size: .9rem;
			font-family: var(--font-sans);
		}
	}

	@media (max-width: 768px) {
		.KdComment {
			margin-bottom: 35px;

			&__meta {
				max-width: 80px;
				width: 20%;
			}

			&__author {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			&__bubble {
				margin-right: 0;
			}

			&__datetime {
				position: absolute;
				bottom: -1.2rem;
				right: 0;
			}

			&__date {
				display: inline;
				margin-right: 10px;
			}

			&__time {
				display: inline;
			}
		}
	}
</style>

<script>
	import dateLocale from "@/src/dateLocale";
	import { format } from "date-fns";
	import hash from "hash.js";
	import kaedeApi from "@/src/kaedeApi";

	import IconReplied from "@/images/IconReplied?inline";
	import IconReply from "@/images/IconReply?inline";
	import IconTimes from "@/images/IconTimes?inline";
	import KdCommentWrite from "@/layouts/KdCommentWrite";

	export default {
		data() {
			return {
				anim: false,
				replyEnabled: false,
				deleteMode: false,
				deletePassword: '',
				deleteFailed: false
			};
		},

		props: {
			comment: {
				type: Object,
				required: true
			},

			postId: {
				type: String,
				required: true
			}
		},

		computed: {
			isReply() {
				return this.comment.subThreadId !== 0;
			},

			author() {
				if(this.comment.deleted)
					return this.$t('deleted-author');

				return this.comment.author;
			},

			content() {
				if(this.comment.deleted)
					return this.$t('deleted-content');

				return this.comment.content;
			},

			date() {
				return format(new Date(this.comment.date), 'PPP', dateLocale());
			},

			time() {
				return format(new Date(this.comment.date), 'HH:mm:ss', dateLocale());
			}
		},

		methods: {
			async deleteComment() {
				const passwordHash = hash.sha256().update(this.deletePassword).digest('hex');
				const { data } = await kaedeApi.delete(
					`/${this.postId}/comments/${this.comment._id}`,
					{ data: { password: passwordHash } }
				);

				const { ok, candidates, deleted } = data;

				if(!ok) {
					this.deleteFailed = true;
					return;
				}

				this.$emit('delete', { candidates, deleted });
				this.deleteMode = false;
			},

			toggleReply() {
				this.replyEnabled = !this.replyEnabled;
			},

			emitAdd(comment) {
				this.replyEnabled = false;
				this.$emit('add', comment);
			}
		},

		mounted() {
			setTimeout(() => { this.anim = true }, this.comment.index / 2 * 250 + 500);
		},

		components: {
			IconReplied,
			IconReply,
			IconTimes,
			KdCommentWrite
		}
	};
</script>
