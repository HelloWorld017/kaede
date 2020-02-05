<template>
	<div id="Author">
		<kd-header />
		<section class="Author__masthead"
			:class="{'Author__masthead--empty': !author.name}"
			:style="{ background }">

			<div class="Author__filter"></div>

			<div class="Author__content">
				<img class="Author__profile" :src="author.profile_image">

				<div class="Author__text">
					<h2 class="Author__name">
						{{author.name}}
					</h2>
					<span class="Author__bio">
						{{author.bio}}
					</span>
				</div>
			</div>

			<div class="Author__metadata">
				<div class="Author__metadata-row">
					<div class="Author__metadata-item" v-if="author.location">
						<icon-location class="Author__metadata-icon" />
						{{author.location}}
					</div>

					<kd-link class="Author__metadata-item" :href="author.website" v-if="author.website">
						<icon-link class="Author__metadata-icon" />
						{{author.website}}
					</kd-link>
				</div>

				<div class="Author__metadata-row">
					<kd-link class="Author__metadata-item" :href="twitter" v-if="author.twitter">
						<icon-twitter class="Author__metadata-icon" />
						@{{twitterName}}
					</kd-link>

					<kd-link class="Author__metadata-item" :href="facebook" v-if="author.facebook">
						<icon-facebook class="Author__metadata-icon" />
						{{author.facebook}}
					</kd-link>
				</div>
			</div>
		</section>
		<kd-post-list class="Author__list" :context="[`author:${authorSlug}`]" automatic />
		<kd-footer />
	</div>
</template>

<style lang="less" scoped>
	#Author {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		width: 100%;
		min-height: 100vh;
	}

	.Author {
		&__masthead {
			min-height: 400px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			position: relative;
			user-select: none;
			opacity: 1;
			transition: opacity .4s ease;

			color: var(--grey-900);
			font-family: var(--font-sans);

			background-size: cover !important;
			background-position: center !important;

			&--empty {
				opacity: 0;
			}
		}

		&__filter {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(32, 32, 32, .5);
		}

		&__content {
			display: flex;
			align-items: center;
		}

		&__text {
			max-width: 300px;
		}

		&__profile {
			width: 100px;
			height: 100px;
			border-radius: 50%;
			margin-right: 40px;
		}

		&__name {
			margin-top: 0;
			margin-bottom: .3rem;
			font-size: 2rem;
		}

		&__count {
			font-size: .9rem;
		}

		&__name, &__bio {
			position: relative;
			z-index: 1;
		}

		&__metadata {
			position: absolute;
			bottom: 30px;
		}

		&__metadata-row {
			display: flex;
		}

		&__metadata-item {
			color: rgba(255, 255, 255, .7);
			font-size: 1rem;
			margin: 0 10px;
			text-decoration: none;
		}

		&__metadata-icon {
			fill: rgba(255, 255, 255, .7);
			height: 1rem;
			margin-right: .3rem;
			vertical-align: middle;
		}

		&__list {
			padding-top: 50px;
		}
	}
</style>

<script>
	import api from "@/src/api";

	import IconFacebook from "@/images/IconFacebook?inline";
	import IconLink from "@/images/IconLink?inline";
	import IconLocation from "@/images/IconLocation?inline";
	import IconTwitter from "@/images/IconTwitter?inline";
	import KdFooter from "@/layouts/KdFooter";
	import KdHeader from "@/layouts/KdHeader";
	import KdLink from "@/components/KdLink";
	import KdPostList from "@/layouts/KdPostList";

	export default {
		data() {
			return {
				author: {}
			};
		},

		computed: {
			authorSlug() {
				return this.$route.params.author;
			},

			background() {
				return this.author.cover_image ?
					`url(${this.author.cover_image})` :
					'#202020';
			},

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

		async created() {
			this.author = await api.authors.read({
				slug: this.authorSlug
			});
		},

		components: {
			IconFacebook,
			IconLink,
			IconLocation,
			IconTwitter,
			KdFooter,
			KdHeader,
			KdLink,
			KdPostList
		}
	};
</script>
