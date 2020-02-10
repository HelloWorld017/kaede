<template>
	<div class="KdScrollTrigger" ref="trigger">
		<div class="KdScrollTrigger__loading Loading" v-if="state === 'requested'">
			<div class="Loading__circle"></div>
		</div>
		<button class="KdScrollTrigger__load LoadMore" @click="loadMore" v-else-if="current < max">
			<icon-load class="LoadMore__icon" /> {{$t('load-more')}}
		</button>
	</div>
</template>

<style lang="less" scoped>
	.LoadMore {
		cursor: pointer;
		display: block;
		width: 100%;

		font-family: var(--font-sans);
		font-size: 1.2rem;
		font-weight: 600;

		background: transparent;
		border: none;
		outline: none;
		text-align: center;

		&__icon {
			width: auto;
			height: 1.2rem;
			margin-right: 5px;
			vertical-align: middle;
		}

		&:hover &__icon {
			opacity: 1;
			transform: translate(0, 0);
			animation-name: loadmore;
			animation-duration: .8s;
			animation-iteration-count: infinite;
			animation-timing-function: linear;
		}
	}

	.Loading {
		position: relative;
		width: 100%;
		height: 30px;

		&__circle {
			position: absolute;
			top: 50%;
			left: 50%;
			width: 32px;
			height: 32px;
			box-sizing: border-box;
			border: 15px solid rgba(0, 0, 0, .4);

			animation-name: loading;
			animation-duration: .7s;
			animation-iteration-count: infinite;
			animation-timing-function: linear;
			transform: translate(-50%, -50%) scale(0) rotate(-45deg);
		}
	}

	@keyframes loading {
		0% {
			border-width: 16px;
			opacity: 0;
			transform: translate(-50%, -50%) scale(0) rotate(-45deg);
		}

		50% {
			opacity: 1;
			border-width: 16px;
			transform: translate(-50%, -50%) scale(1) rotate(-45deg);
		}

		100% {
			opacity: 0;
			border-width: 0;
			transform: translate(-50%, -50%) scale(1.2) rotate(-45deg);
		}
	}

	@keyframes loadmore {
		0% {
			opacity: 1;
			transform: translate(0, 0);
		}

		20% {
			opacity: 1;
			transform: translate(0, 3px);
		}

		60% {
			opacity: 0;
			transform: translate(0, 9px);
		}

		70% {
			opacity: 0;
			transform: translate(0, -9px);
		}

		90% {
			opacity: 1;
			transform: translate(0, -3px);
		}

		100% {
			opacity: 1;
			transform: translate(0, 0);
		}
	}
</style>

<i18n>
{
	"ko": {
		"load-more": "더 불러오기"
	},

	"en": {
		"load-more": "Load More"
	},

	"ja": {
		"load-more": "もっと読み込む"
	}
}
</i18n>

<script>
	import IconLoad from "@/images/IconLoad?inline";

	//FIXME
	const debugLog = str => {};

	export default {
		data() {
			return {
				observer: new IntersectionObserver(this.update, {
					root: null,
					rootMargin: '250px 0px',
					threshold: 0
				}),

				state: 'requested',
				loadFulfilled: true
			};
		},

		props: {
			current: {
				type: Number,
				required: true
			},

			max: {
				type: Number,
				required: true
			},

			loadNext: {
				type: Function,
				required: true
			},

			automatic: {
				type: Boolean
			}
		},

		methods: {
			update(entries) {
				if(entries.length < 1) return;
				this.loadFulfilled = !entries[0].isIntersecting;

				if(this.state === 'initial' && !this.loadFulfilled)
					this.preload();

				debugLog("Updated. CurrentState:", this.state, this.loadFulfilled);
			},

			async preload() {
				debugLog("Preload Requested");

				if(this.state !== 'initial')
					return;

				this.state = 'requested';

				do {
					if(this.current >= this.max)
						break;

					await this.loadNext();
					await new Promise(resolve => setTimeout(resolve, 1000));

					debugLog("AfterLoadCall. CurrentState:", this.state, this.loadFulfilled);
				} while(!this.loadFulfilled)

				this.state = 'initial';
				debugLog("Preloaded. CurrentState:", this.state, this.loadFulfilled);
			},

			async init(preload = true) {
				if(!this.automatic) {
					this.state = 'uninitialized';

					if(preload) await this.loadNext();
				} else {
					this.state = 'initial';

					if(preload) await this.preload();
				}
			},

			loadMore() {
				if(this.state === 'uninitialized') {
					this.state = 'initial';
				}

				this.preload();
			}
		},

		mounted() {
			this.observer.observe(this.$refs.trigger);
		},

		components: {
			IconLoad
		}
	}
</script>
