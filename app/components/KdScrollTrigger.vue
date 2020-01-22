<template>
	<div class="KdScrollTrigger" ref="trigger">
		<div class="KdScrollTrigger__loading" v-if="state === 'requested'"></div>
		<button class="KdScrollTrigger__load" v-else>
			<icon-load /> {{$t('load-more')}}
		</button>
	</div>
</template>

<i18n>
{
	"ko": {
		"load-more": "더 불러오기"
	},

	"en": {
		"load-more": "Load More"
	}
}
</i18n>

<script>
	import IconLoad from "@/images/IconLoad?inline";

	const debugLog = str => {};
	
	export default {
		data() {
			return {
				observer: new IntersectionObserver(this.update, {
					root: null,
					rootMargin: '250px 0px',
					threshold: 0
				}),

				state: 'initial',
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

				if(this.state === 'requested')
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
			}
		},

		mounted() {
			this.observer.observe(this.$refs.trigger);
			this.preload();
		},

		components: {
			IconLoad
		}
	}
</script>
