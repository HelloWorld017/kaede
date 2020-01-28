<template>
	<form class="KdCommentWrite" @submit.prevent="submit">
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

			<button class="KdCommentWrite__submit" type="submit">
				<icon-submit class="KdCommentWrite__submit-icon" />
			</button>
		</div>
	</form>
</template>

<style lang="less" scoped>
	.KdCommentWrite {
		&__text {
			background: rgba(0, 0, 0, .12);
			box-sizing: border-box;
			border: none;
			resize: none;
			outline: none;
			width: 100%;
			height: 140px;
			padding: 20px;

			color: var(--grey-100);
			font-family: var(--font-sans);
			font-size: 1rem;
		}

		&__row {
			display: flex;
			justify-content: space-between;
			margin-top: 10px;
		}

		&__input-wrapper {
			display: inline-block;
			background: var(--grey-100);
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
			background: var(--grey-100);
			border: 1px solid rgba(255, 255, 255, .2);
			box-sizing: border-box;
			padding: 5px 20px;
			width: 100%;

			color: var(--grey-900);
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
	}
</style>

<i18n>
{
	"ko": {
		"username": "이름",
		"password": "비밀번호",
		"content": "여기에 입력하세요"
	},

	"en": {
		"username": "Username",
		"password": "Password",
		"content": "Input here"
	}
}
</i18n>

<script>
	import hash from "hash.js";
	import kaedeApi from "@/src/kaedeApi";

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
			}
		},

		computed: {
			maxAuthor() {
				return window.$KaedeCommentsMaxAuthor || 32;
			},

			maxContent() {
				return window.$KaedeCommentsMaxContent || 1500;
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

				const { ok, comment, reason } = await kaedeApi.post(`/${this.id}/comments`, targetComment);
				if(!ok) {
					this.errorReason = reason;
					setTimeout(() => this.errorReason = '', 3000);
					return;
				}

				this.$emit('add', comment);
			}
		},

		components: {
			IconSubmit
		}
	};
</script>
