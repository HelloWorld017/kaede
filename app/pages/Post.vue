<template>
	<transition name="Fade">
		<div id="Post" v-if="post">
			<header class="Post__masthead" :style="{ background }">
				<div class="Post__masthead-filter"></div>
				<kd-header class="Post__nav" transparent scroll-view top />
			</header>

			<main class="Post__body">
				<div class="Post__header">
					<h1 class="Post__title">{{post.title}}</h1>
					<div class="Post__metadata">
						<div class="Post__metadata-item">
							<icon-timestamp class="Post__metadata-icon" />
							{{timestamp}}
						</div>

						<div class="Post__metadata-item">
							<icon-readtime class="Post__metadata-icon" />
							{{readtime}}
						</div>
					</div>
				</div>

				<div class="Post__outline-wrapper">
					<div class="Post__outline">
						<a class="Post__outline-item"
							:class="[
								`Post__outline-item--${item.level}`,
								{ 'Post__outline-item--active': activeOutline === item.id }
							]"
							:href="`#${item.id}`"
							v-for="item in outline">

							{{item.text}}
						</a>
					</div>
				</div>

				<article class="Post__content Posting" v-html="post.html" ref="content"></article>

				<h2 class="Post__meta-title" v-if="post.tags.length > 0">{{$t('tags')}}</h2>
				<div class="Post__tags">
					<kd-tag v-for="tag in post.tags" :key="tag.id" :tag="tag" monochrome />
				</div>

				<h2 class="Post__meta-title">{{$t('authors')}}</h2>
				<div classs="Post__authors">
					<kd-author v-for="author in post.authors" :key="author.slug" :author="author" />
				</div>

				<h2 class="Post__meta-title" v-if="!isPage">{{$t('if-you-like')}}</h2>
				<div class="Post__share-options" v-if="!isPage">
					<kd-link :href="facebookShare" class="Post__button Post__button--facebook" newtab>
						<icon-facebook class="Post__button-icon" />
						{{$t('share')}}
					</kd-link>

					<kd-link :href="twitterShare" class="Post__button Post__button--twitter" newtab>
						<icon-twitter class="Post__button-icon" />
						{{$t('share')}}
					</kd-link>
				</div>
				<div class="Post__like-options" v-if="!isPage">
					<button class="Post__button Post__button--large Post__button--toggle"
						:class="{'Post__button--active': bookmarked}"
						@click="toggleBookmark" v-if="bookmarkEnabled">

						<icon-bookmark class="Post__button-icon" />
						{{$t('bookmark')}}
					</button>

					<button class="Post__button Post__button--large Post__button--like"
						v-if="kaedeEnabled" @click="increaseLike">

						<icon-heart class="Post__button-icon" />
						{{ likeCounts }}
					</button>
				</div>
			</main>

			<section class="Post__footer" v-if="!isPage">
				<div class="Post__footer-contents Post__body">
					<div class="Post__category" v-if="categoryPosts && categoryPosts.length > 0">
						<h3 class="Post__footer-title">
							{{$t('category')}}
						</h3>
						<div class="Post__footer-decorator"></div>
						<div class="Post__category-items">
							<kd-link :href="post.url" class="Post__category-item"
								:key="post.id" v-for="post in categoryPosts">

								<span class="Post__category-title">{{post.title}}</span>
								<icon-right-arrow class="Post__category-icon" />
							</kd-link>
						</div>
					</div>

					<div class="Post__comments">
						<h3 class="Post__footer-title">
							{{$t('comments')}}
						</h3>
						<div class="Post__footer-decorator"></div>
						<kd-comment-list :id="post.id" />
					</div>
				</div>
			</section>

			<div class="Post__injection" v-html="post.codeinjection_head" v-if="post.codeinjection_head"></div>
			<div class="Post__injection" v-html="post.codeinjection_foot" v-if="post.codeinjection_foot"></div>

			<kd-footer />
		</div>
	</transition>
</template>

<i18n>
{
	"ko": {
		"readtime": "읽는데 {time}",
		"tags": "Tags",
		"authors": "Authors",
		"if-you-like": "If you like this post",
		"bookmark": "Bookmark",
		"share": "Share",
		"category": "카테고리의 다른 글",
		"comments": "댓글"
	},

	"en": {
		"readtime": "{time} to read",
		"tags": "Tags",
		"authors": "Authors",
		"if-you-like": "If you like this post",
		"bookmark": "Bookmark",
		"share": "Share",
		"category": "Related posts",
		"comments": "Comments"
	},

	"ja": {
		"readtime": "読めるのに{time}かかります。",
		"category": "カテゴリーの他の記事",
		"comments": "コメント"
	}
}
</i18n>

<style lang="less" scoped>
	#Post {
		background: var(--background-400);
		min-height: 100vh;
	}

	.Post {
		&__masthead {
			position: relative;
			background-position: center !important;
			background-size: cover !important;
			min-height: 300px;
		}

		&__masthead-filter {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(32, 32, 32, .5);
		}

		&__body {
			color: var(--grey-050);
			width: 100%;
			max-width: 70vw;
			box-sizing: border-box;
			margin: 0 auto;
			padding: 30px;
			padding-bottom: 50px;
			position: relative;
		}

		&__header {
			margin: 1.5rem 0;
		}

		&__title {
			font-family: var(--font-title);
			font-weight: 100;
			margin: 0;
			margin-bottom: 10px;
		}

		&__metadata {
			display: flex;
		}

		&__metadata-item {
			font-family: var(--font-sans);
			font-weight: 700;
			color: rgba(32, 32, 32, .5);
			fill: rgba(32, 32, 32, .5);
			margin-right: 20px;
		}

		&__metadata-icon {
			height: 1rem;
			vertical-align: middle;
			margin-right: -3px;
		}

		&__outline-wrapper {
			position: absolute;
			top: 0;
			right: -220px;
			height: 100%;
		}

		&__outline {
			position: sticky;
			margin-top: 50px;
			margin-bottom: 30px;
			top: 100px;
			width: 180px;
			font-family: var(--font-sans);
			user-select: none;
		}

		&__outline-item {
			display: block;
			font-weight: 700;
			font-size: 1.2rem;
			overflow: hidden;
			text-overflow: ellipsis;
			text-decoration: none;
			white-space: nowrap;

			color: rgba(32, 32, 32, .3);
			transition: all .4s ease;

			&--0 {
				margin-top: 10px;
			}

			&--1 {
				margin-left: 20px;
				margin-top: 5px;
			}

			&--2 {
				margin-left: 40px;
				font-size: 1rem;
				font-weight: 400;
			}

			&:hover {
				color: rgba(32, 32, 32, .7);
			}

			&--active {
				color: #202020;
			}
		}

		&__meta-title {
			font-family: var(--font-ui);
			font-weight: 700;
			color: var(--grey-100);
			margin-top: 50px;
			user-select: none;
		}

		&__like-options {
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
		}

		&__like-options {
			margin-top: 10px;
		}

		&__button {
			cursor: pointer;
			user-select: none;
			outline: none;
			border: none;
			border-radius: 5px;
			padding: 5px 13px;
			margin: 5px;
			background: var(--grey-200);

			display: inline-flex;
			align-items: center;

			color: var(--grey-900);
			fill: var(--grey-900);
			font-family: var(--font-ui);
			font-weight: 300;
			font-size: 1.2rem;
			text-decoration: none;
			text-transform: uppercase;

			&--toggle {
				fill: transparent;
				stroke: var(--grey-900);
				stroke-width: 2px;
				transition: all .4s ease;
			}

			&--toggle&--active {
				fill: var(--grey-900);
			}

			&--large {
				background: var(--red-400);
				font-size: 1.2rem;
				padding: 10px 20px;
				margin: 10px;
				transition: all .4s ease;

				&:hover {
					box-shadow: 0 2px 8px 1px rgba(0, 0, 0, .3);
				}
			}

			&--like {
				font-family: var(--font-title);

				&:hover .Post__button-icon {
					transform: scale(1.2);
				}

				.Post__button-icon {
					transition: transform .4s ease;
					transform: scale(1.0);
					height: 1.2rem;
				}
			}

			&--twitter {
				fill: #56ccf2;
			}

			&--facebook {
				fill: #039be5;
			}
		}

		&__button-icon {
			height: 1.2rem;
			margin-right: 10px;
		}

		&__footer {
			border-top: 30px solid rgba(0, 0, 0, .15);
			display: flex;
		}

		&__footer-contents {
			display: flex;
			width: 100%;

			& > * {
				margin-bottom: 20px;
			}
		}

		&__footer-title {
			color: var(--grey-100);
			font-family: var(--font-sans);
			margin: .8rem 0;
		}

		&__footer-decorator {
			width: 45px;
			height: 7px;
			background: var(--grey-100);
		}

		&__category {
			width: 25%;
			margin-right: 40px;
		}

		&__category-items {
			margin-top: 15px;
		}

		&__category-item {
			color: var(--grey-100);
			font-size: 1.1rem;
			font-family: var(--font-sans);
			text-decoration: none;
			display: flex;
			justify-content: space-between;
			margin: 5px 0;
			margin-left: 10px;

			&:hover .Post__category-icon {
				transform: translate(5px, 0);
			}
		}

		&__category-title {
			flex: 1;
			width: 0;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-right: 5px;
		}

		&__category-icon {
			stroke: var(--grey-100);
			height: 1.1rem;
			transition: all .4s ease;
		}

		&__comments {
			flex: 1;
		}
	}

	@media (max-width: 768px) {
		.Post {
			&__body {
				max-width: 100vw;
			}
		}
	}

	@media (max-width: 1200px) {
		.Post {
			&__outline-wrapper {
				display: none;
			}

			&__footer-contents {
				flex-direction: column;
			}

			&__category {
				width: 100%;
				margin: 0;
			}
		}
	}

	@media (min-width: 1200px) {
		.Post {
			&__body {
				margin-left: 5vw;
			}
		}
	}

	@media (min-width: 1500px) {
		.Post {
			&__body {
				margin-left: 10vw;
			}
		}
	}

	@media (min-width: 1800px) {
		.Post {
			&__body {
				margin: 0 auto;
			}
		}
	}
</style>

<style lang="less">
	@import "../less/posting.less";
</style>

<script>
	import api from "@/src/api";
	import calculateReadtime from "@/src/calculateReadtime";
	import dateLocale from "@/src/dateLocale";
	import { format } from "date-fns";
	import kaedeApi from "@/src/kaedeApi";
	import katex from "@/src/katex";
	import prism from "@/src/prism";

	import IconBookmark from "@/images/IconBookmark?inline";
	import IconFacebook from "@/images/IconFacebook?inline";
	import IconHeart from "@/images/IconHeart?inline";
	import IconReadtime from "@/images/IconReadtime?inline";
	import IconRightArrow from "@/images/IconRightArrow?inline";
	import IconTimestamp from "@/images/IconTimestamp?inline";
	import IconTwitter from "@/images/IconTwitter?inline";
	import KdAuthor from "@/components/KdAuthor";
	import KdCommentList from "@/layouts/KdCommentList";
	import KdFooter from "@/layouts/KdFooter";
	import KdHeader from "@/layouts/KdHeader";
	import KdLink from "@/components/KdLink";
	import KdPostList from "@/layouts/KdPostList";
	import KdTag from "@/components/KdTag";

	export default {
		data() {
			return {
				isPage: false,
				post: null,
				outline: [],
				activeOutlines: Object.create(null),
				activeOutline: null,
				kaedeEnabled: !!kaedeApi,
				likeCounts: 0,
				categoryPosts: []
			};
		},

		computed: {
			postSlug() {
				return this.$route.params.post;
			},

			background() {
				return this.post.feature_image ?
					`url(${this.post.feature_image})` :
					'#202020';
			},

			readtime() {
				return this.$t('readtime', {
					time: calculateReadtime(this.post)
				});
			},

			timestamp() {
				return format(new Date(this.post.published_at), "yyyy. MM. dd", dateLocale());
			},

			facebookShare() {
				return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.post.url)}`;
			},

			twitterShare() {
				return `https://twitter.com/share?url=${encodeURIComponent(this.post.url)}`;
			},

			bookmarkEnabled() {
				return this.$store.state.bookmarks.enabled;
			},

			bookmarked() {
				return this.$store.state.bookmarks.bookmarks.findIndex(
					bookmark => bookmark.id === this.post.id
				) >= 0;
			}
		},

		methods: {
			updateIntersection(entries) {
				entries.forEach(entry => {
					this.$set(this.activeOutlines, entry.target.id, entry.isIntersecting);
				});

				const newActiveOutline = this.outline.reduce((prev, curr, outlineIdx) => {
					if(!this.activeOutlines[curr.id])
						return prev;

					if(prev.rank > outlineIdx)
						return {
							name: curr.id,
							rank: outlineIdx
						};

					return prev;
				}, { name: null, rank: Infinity }).name;

				if(newActiveOutline)
					this.activeOutline = newActiveOutline;
			},

			async updateLike() {
				const { likes } = (await kaedeApi.get(`/${this.post.id}/likes`)).data;
				this.likeCounts = likes;
			},

			async increaseLike() {
				const { likes } = (await kaedeApi.post(`/${this.post.id}/likes`)).data;
				this.likeCounts = likes;
			},

			toggleBookmark() {
				if(this.bookmarked) {
					this.$store.dispatch('bookmarks/removeBookmark', this.post.id);
				} else {
					this.$store.dispatch('bookmarks/addBookmark', this.post);
				}
			}
		},

		created() {
			this._postPromise = api.posts.read(
				{ slug: this.postSlug },
				{ include: 'authors,tags' }
			).catch(err => {
				this.isPage = true;
				return api.pages.read(
					{ slug: this.postSlug },
					{ include: 'authors,tags' }
				);
			}).catch(err => {
				location.href = '/404';
			}).then(post => {
				this.post = post;
			});
		},

		async mounted() {
			await this._postPromise;
			await new Promise(resolve => this.$nextTick(resolve));

			// Create Outline
			this.observer = new IntersectionObserver(
				this.updateIntersection.bind(this)
			);

			const ids = {};
			const outline = [...this.$refs.content.children]
				.map(node => ({
					node,
					match: node.tagName.match(/^h([1-6])$/i)
				}))
				.filter(({ node, match }) => match)
				.map(({ node, match }) => {
					if(ids[node.id]) {
						node.id = `${node.id}-${ids[node.id]}`;
						ids[node.id]++;
					}

					ids[node.id] = 1;

					this.observer.observe(node);

					return {
						level: parseInt(match[1]),
						text: node.innerText,
						id: node.id
					};
				});

			const topLevel = Math.min(...outline.map(v => v.level));
			this.outline = outline.filter(v => {
				v.level -= topLevel;

				if(v.level > 2) return false;
				return true;
			});

			// Generate Gallery
			const images = this.$refs.content.querySelectorAll('.kg-gallery-image img');
			images.forEach(image => {
				const container = image.closest('.kg-gallery-image');

				const width = image.attributes.width.value;
				const height = image.attributes.height.value;
				const ratio = width / height;

				const parent = container.parentNode;
				parent.removeChild(container);

				const newContainer = document.createElement('a');
				newContainer.href = image.src;
				newContainer.target = '_blank';
				newContainer.rel = 'noopener';
				newContainer.className = container.classList.value;
				newContainer.style.flex = ratio + ' 1 0%';
				newContainer.appendChild(image);

				parent.appendChild(newContainer);
			});

			// Syntax Highlighting
			prism(this.$refs.content);

			// KaTeX
			katex(this.$refs.content);

			// Similar posts
			if(this.post.primary_tag) {
				this.categoryPosts = await api.posts.browse({
					filter: `tags:${this.post.primary_tag.slug}`,
					limit: 5
				});
			}

			// Like Count
			try {
				await this.updateLike();
			} catch(e) {}
		},

		components: {
			IconBookmark,
			IconFacebook,
			IconHeart,
			IconReadtime,
			IconRightArrow,
			IconTimestamp,
			IconTwitter,
			KdAuthor,
			KdCommentList,
			KdFooter,
			KdHeader,
			KdLink,
			KdPostList,
			KdTag
		}
	};
</script>
