<template>
	<div class="KdAuthor">
		<div class="KdAuthor__user">
			<div class="KdAuthor__content">
				<img class="KdAuthor__profile" :src="author.profile_image" v-if="author.profile_image">

				<div class="KdAuthor__text">
					<h2 class="KdAuthor__name">
						{{author.name}}
					</h2>
					<span class="KdAuthor__bio">
						{{author.bio}}
					</span>
				</div>
			</div>

			<div class="KdAuthor__metadata">
				<div class="KdAuthor__metadata-item" v-if="author.location">
					<icon-location class="KdAuthor__metadata-icon" />
					{{author.location}}
				</div>

				<kd-link class="KdAuthor__metadata-item" :href="author.website" v-if="author.website">
					<icon-link class="KdAuthor__metadata-icon" />
					{{author.website}}
				</kd-link>

				<kd-link class="KdAuthor__metadata-item" :href="twitter" v-if="author.twitter">
					<icon-twitter class="KdAuthor__metadata-icon" />
					@{{twitterName}}
				</kd-link>

				<kd-link class="KdAuthor__metadata-item" :href="facebook" v-if="author.facebook">
					<icon-facebook class="KdAuthor__metadata-icon" />
					{{author.facebook}}
				</kd-link>
			</div>
		</div>

		<kd-continue class="KdAuthor__continue" :href="author.url" />
	</div>
</template>

<style lang="less" scoped>
	.KdAuthor {
		display: flex;
		align-items: center;
		background: var(--grey-200);
		padding: 40px;
		padding-bottom: 25px;
		max-width: 800px;
		user-select: none;

		&__user {
			flex: 1;
		}

		&__content {
			display: flex;
			align-items: center;
		}

		&__text {
			color: var(--grey-900);
			flex: 1;
		}

		&__profile {
			width: 100px;
			height: 100px;
			border-radius: 50%;
			margin-right: 40px;
		}

		&__name {
			font-family: var(--font-ui);
			margin-top: 0;
			margin-bottom: .3rem;
			font-size: 2rem;
		}

		&__bio {
			font-family: var(--font-sans);
		}

		&__name, &__bio {
			position: relative;
			z-index: 1;
		}

		&__continue {
			margin-left: 20px;
			align-self: center;
		}

		&__metadata {
			margin-top: 30px;
			display: flex;
			flex-wrap: wrap;
			font-family: var(--font-sans);
		}

		&__metadata-item {
			color: var(--grey-700);
			font-size: 1rem;
			margin: 0 10px;
			text-decoration: none;
		}

		&__metadata-icon {
			fill: var(--grey-700);
			height: 1rem;
			margin-right: .3rem;
			vertical-align: middle;
		}
	}

	@media (max-width: 1100px) {
		.KdAuthor {
			flex-direction: column;

			&__continue {
				margin-top: 40px;
			}
		}
	}

	@media (max-width: 500px) {
		.KdAuthor{
			&__profile {
				display: none;
			}

			&__metadata {
				display: none;
			}
		}
	}
</style>

<script>
	import IconFacebook from "@/images/IconFacebook?inline";
	import IconLink from "@/images/IconLink?inline";
	import IconLocation from "@/images/IconLocation?inline";
	import IconTwitter from "@/images/IconTwitter?inline";
	import KdContinue from "@/components/KdContinue";
	import KdLink from "@/components/KdLink";

	export default {
		props: {
			author: {
				type: Object,
				required: true
			}
		},

		computed: {
			twitter() {
				if(!this.author.twitter)
					return '';

				return `https://twitter.com/${this.twitterName}`;
			},

			twitterName() {
				if(!this.author.twitter)
					return '';

				if(this.author.twitter.startsWith('@'))
					return this.author.twitter.slice(1);

				return this.author.twitter;
			},

			facebook() {
				if(!this.author.facebook)
					return '';

				return `https://facebook.com/${this.author.facebook}`;
			}
		},

		components: {
			IconLink,
			IconLocation,
			IconFacebook,
			IconTwitter,
			KdContinue,
			KdLink
		}
	};
</script>
