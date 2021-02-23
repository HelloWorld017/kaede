<template>
	<header class="KdHeader" :class="{
		'KdHeader--minimalized': minimalized, 'KdHeader--transparent': transparent,
		'KdHeader--top': top
	}">
		<kd-link class="KdHeader__branding" href="/">
			<h1 class="KdHeader__branding__title">
				{{title}}
			</h1>

			<span class="KdHeader__branding__desc" v-if="!minimalized">
				{{description}}
			</span>
		</kd-link>

		<kd-nav class="KdHeader__navigation" :transparent="transparent" />
		<kd-nav-list class="KdHeader__navigation-list" ref="listNav"
			@bookmark="openBookmark"
			v-if="!minimalized" />

		<kd-bookmark class="KdHeader__bookmark" ref="bookmark" />

		<button @click="openListNav" class="KdHeader__list-nav"
			:class="{'KdHeader__list-nav--enabled': listNavEnabled}">

			<icon-menu class="KdHeader__list-nav-icon" />
		</button>

		<transition name="TopbarShow">
			<div class="KdHeader__topbar Topbar" v-if="!minimalized && topbarShown">
				<kd-header class="Topbar__header" @open="openListNav" minimalized />
				<div class="Topbar__scroll-view" :style="{'width': scrollPercent}" v-if="scrollView"></div>
			</div>
		</transition>
	</header>
</template>

<style lang="less" scoped>
	.KdHeader {
		display: flex;
		align-items: center;
		justify-content: space-between;
		max-width: 70vw;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
		padding: 30px 0;

		background: var(--grey-900);
		user-select: none;


		&--minimalized {
			padding: 10px 0;
		}

		&--transparent {
			background: transparent;
		}

		&--transparent > & {
			&__branding {
				color: var(--grey-900);
			}

			&__list-nav .KdHeader__list-nav-icon {
				stroke: var(--grey-900);
			}
		}

		&--top > & {
			&__branding {
				position: relative;
			}
		}

		&__branding {
			display: block;
			color: var(--grey-050);
			text-decoration: none;

			&__title {
				font-family: var(--font-ui);
				font-size: 2rem;
				font-weight: 700;
				margin: 0;
			}

			&__desc {
				display: block;

				font-family: var(--font-title);
				font-size: 1.3rem;
				font-weight: 300;
				margin-top: 5px;
				word-break: keep-all;
			}
		}

		&__list-nav {
			cursor: pointer;
			display: none;
			background: transparent;
			border: none;
			outline: none;
			padding: 6px;

			position: absolute;
			right: 30px;

			&--enabled {
				display: inline-block;
			}
		}

		&__list-nav-icon {
			stroke: var(--grey-050);
		}
	}

	.Topbar {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		z-index: 8;

		background: var(--grey-900);
		box-shadow: 0 1px 6px 1px rgba(0, 0, 0, .2);
		// backdrop-filter: blur(5px);
		// background: rgba(255, 255, 255, .8);

		&__header {
			background: transparent;
		}

		&__scroll-view {
			position: absolute;
			height: 3px;
			bottom: 0;
			background: var(--foreground-400);
		}
	}

	.TopbarShow {
		&-enter-active, &-leave-active {
			transition: all .4s ease;
		}

		&-enter, &-leave-to {
			opacity: 0;
			transform: translate(0, -50px);
		}
	}

	@media (max-width: 768px) {
		.KdHeader {
			max-width: 100vw;
			padding: 30px;

			&--minimalized {
				padding: 15px 30px;
			}

			&__navigation {
				display: none;
			}

			&__list-nav {
				display: inline-block;
				position: relative;
				right: 0 !important;
			}
		}
	}
</style>

<script>
	import kaedeSettings from "@/src/kaedeSettings";
	import scroll from "@/src/scroll";

	import IconMenu from "@/images/IconMenu?inline";
	import KdBookmark from "@/layouts/KdBookmark";
	import KdLink from "@/components/KdLink";
	import KdNav from "@/layouts/KdNav";
	import KdNavList from "@/layouts/KdNavList";

	export default {
		name: 'kd-header',
		data() {
			return {
				scroll: 0,
				scrollHeight: document.documentElement.scrollHeight,
				innerHeight: window.innerHeight
			};
		},

		props: {
			minimalized: {
				type: Boolean
			},

			transparent: {
				type: Boolean
			},

			scrollView: {
				type: Boolean
			},

			top: {
				type: Boolean
			}
		},

		computed: {
			title() {
				return this.$store.state.config.title;
			},

			description() {
				return this.$store.state.config.description;
			},

			topbarShown() {
				return this.scroll > 300;
			},

			scrollPercent() {
				if(this.scrollHeight <= this.innerHeight)
					return '100%';

				const percentage = this.scroll / (this.scrollHeight - this.innerHeight) * 100;
				return `${Math.max(0, Math.min(percentage, 100))}%`;
			},

			listNavEnabled() {
				return kaedeSettings.fullNavigation;
			}
		},

		methods: {
			openListNav() {
				if(this.minimalized) {
					this.$emit('open');
					return;
				}

				this.$refs.listNav.open();
			},

			openBookmark() {
				this.$refs.bookmark.open();
			},

			updateScroll() {
				this.scroll = scroll();
			},

			updateSize() {
				this.updateScroll();
				this.scrollHeight = document.documentElement.scrollHeight;
				this.innerHeight = window.innerHeight;
			}
		},

		mounted() {
			this.updateScrollBound = this.updateScroll.bind(this);
			this.updateSizeBound = this.updateSize.bind(this);
			document.addEventListener('scroll', this.updateScrollBound);
			document.addEventListener('resize', this.updateSizeBound);

			this.updateScroll();
			this.updateSize();
		},

		destroyed() {
			document.removeEventListener('scroll', this.checkTopbarBound);
			document.removeEventListener('resize', this.updateSizeBound);
		},

		components: {
			IconMenu,
			KdBookmark,
			KdLink,
			KdNav,
			KdNavList
		}
	};
</script>
