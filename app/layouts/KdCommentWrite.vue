<template>
	<form class="KdCommentWrite" :class="{'KdCommentWrite--small': small}" @submit.prevent="submit">
		<textarea class="KdCommentWrite__text" v-model="text"
			:maxlength="maxContent" :placeholder="$t('content')" required>
		</textarea>

		<div class="KdCommentWrite__row">
			<div class="KdCommentWrite__auth">
				<div class="KdCommentWrite__input-wrapper">
					<input type="text" v-model="username" class="KdCommentWrite__input"
						autocomplete="off" autocorrect="off"
						autocapitalize="off" spellcheck="false"
						:placeholder="$t('username')" :maxlength="maxAuthor" required>
				</div>

				<div class="KdCommentWrite__input-wrapper">
					<input type="password" v-model="password" class="KdCommentWrite__input"
						:placeholder="$t('password')" required>
				</div>
			</div>

			<span class="KdCommentWrite__error" v-if="errorReason">
				{{$t(errorReason)}}
			</span>

			<button class="KdCommentWrite__submit" type="submit">
				<icon-submit class="KdCommentWrite__submit-icon" />
			</button>
		</div>
	</form>
</template>

<style lang="less" scoped>
	.KdCommentWrite {
		&__text {
			background: rgba(var(--grey-050), .12);
			box-sizing: border-box;
			border: none;
			resize: none;
			outline: none;
			width: 100%;
			height: 140px;
			padding: 20px;

			color: var(--grey-100_rgb);
			font-family: var(--font-sans);
			font-size: 1rem;

			&::selection {
				background: var(--grey-100_rgb);
				color: var(--grey-900_rgb);
			}
		}

		&__row {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 10px;
		}

		&__error {
			color: var(--red-400_rgb);
			font-size: .8rem;
			font-family: var(--font-sans);
		}

		&__input-wrapper {
			display: inline-block;
			background: var(--grey-100_rgb);
			padding: 10px;
			width: 160px;
			margin: 0 5px;

			&:first-child {
				margin-left: 0;
			}

			&:last-child {
				margin-right: 0;
			}
		}

		&__input {
			background: var(--grey-100_rgb);
			border: 1px solid rgba(var(--grey-900), .2);
			box-sizing: border-box;
			padding: 5px 20px;
			width: 100%;

			color: var(--grey-900_rgb);
			font-family: var(--font-sans);
			font-size: .9rem;
			font-weight: 700;

			outline: none;
		}

		&__submit {
			cursor: pointer;
			background: transparent;
			border: none;
			outline: none;
			transition: transform .4s ease;
			transform: translate(0, 0);

			&:hover {
				transform: translate(5px, 0);
			}
		}

		&--small & {
			&__text {
				height: 80px;
			}

			&__submit-icon {
				height: 30px;
			}

			&__input-wrapper {
				padding: 5px;
			}

			&__input {
				font-size: .8rem;
			}
		}
	}

	@media (max-width: 600px) {
		.KdCommentWrite {
			&__input-wrapper {
				margin: 5px;

				&:first-child {
					margin-left: 5px;
				}

				&:last-child {
					margin-right: 5px;
				}
			}

			&__submit-icon {
				width: 1.5rem;
			}
		}
	}
</style>

<i18n>
{
	"ko": {
		"username": "이름",
		"password": "비밀번호",
		"content": "여기에 입력하세요",
		"invalid-postid": "새로고침 후 다시 시도해주세요!",
		"no-such-post": "포스트가 삭제된 듯 합니다.",
		"invalid-body": "새로고침 후 다시 시도해주세요!",
		"too-many-comments": "이미 너무 많은 댓글이 달려있습니다!",
		"invalid-content": "내용을 입력해주세요.",
		"invalid-author": "사용자명을 입력해주세요.",
		"invalid-password": "비밀번호를 입력해주세요."
	},

	"en": {
		"username": "Username",
		"password": "Password",
		"content": "Input here",
		"invalid-postid": "Please retry after refresh!",
		"no-such-post": "This post seems to be deleted.",
		"invalid-body": "Please retry after refresh!",
		"too-many-comments": "There are too many comments already.",
		"invalid-content": "Please enter the contents.",
		"invalid-author": "Please enter the username.",
		"invalid-password": "Please enter the password."
	},

	"ja": {
		"username": "名前",
		"password": "パスワード",
		"content": "ここに入力してください",
		"invalid-postid": "再読み込みした後でやり直してください。",
		"no-such-post": "この記事は削除されましたのようです。",
		"invalid-body": "再読み込みした後でやり直してください。",
		"too-many-comments": "もうすでにコメントが多すぎます。",
		"invalid-content": "内容を入力してください。",
		"invalid-author": "名前を入力してください。",
		"invalid-password": "パスワードを入力してください。"
	}
}
</i18n>

<script>
	import hash from "hash.js";
	import kaedeApi from "@/src/kaedeApi";
	import kaedeSettings from "@/src/kaedeSettings";

	import IconSubmit from "@/images/IconSubmit?inline";

	export default {
		data() {
			return {
				text: '',
				username: '',
				password: '',
				errorReason: ''
			};
		},

		props: {
			id: {
				type: String,
				required: true
			},

			replyTo: {
				type: Number,
				default: 0
			},

			small: {
				type: Boolean
			}
		},

		computed: {
			maxAuthor() {
				return kaedeSettings.commentsMaxAuthor || 32;
			},

			maxContent() {
				return kaedeSettings.commentsMaxContent || 1500;
			}
		},

		methods: {
			async submit() {
				const passwordHash = hash.sha256().update(this.password).digest('hex');
				const targetComment = {
					password: passwordHash,
					content: this.text,
					author: this.username,
				};

				if(this.replyTo)
					targetComment.replyTo = this.replyTo;

				const { data } = await kaedeApi.post(`/${this.id}/comments`, targetComment);
				const { ok, comment, reason } = data;

				if(!ok) {
					this.errorReason = reason;
					setTimeout(() => this.errorReason = '', 3000);
					return;
				}

				this.$emit('add', comment);
				this.text = '';
				this.username = '';
				this.password = '';
				this.errorReason = '';
			}
		},

		components: {
			IconSubmit
		}
	};
</script>
