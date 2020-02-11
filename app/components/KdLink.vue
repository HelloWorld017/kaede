<template>
	<a v-if="isExternal"
		class="KdLink"
		:rel="rel"
		:href="hrefReplaceInternal"
		:target="target"
		@click="$emit('click')">

		<slot></slot>
	</a>

	<router-link v-else
		class="KdLink"
		:exact-active-class="activeClass"
		:to="hrefReplaceInternal"
		@click.native="$emit('click')">

		<slot></slot>
	</router-link>
</template>

<script>
	export default {
		props: {
			href: {
				type: String,
				required: true
			},

			activeClass: {
				type: String,
				default: "KdLink--active"
			},

			newtab: {
				type: Boolean
			}
		},

		computed: {
			hrefReplaceInternal() {
				if(!this.checkIsExternal(this.href))
					return this.href;

				try {
					const url = new URL(this.href);
					if(url.host === location.host)
						return `${url.pathname}${url.search}${url.hash}`;
				} catch(err) {}

				return this.href;
			},

			isExternal() {
				return this.checkIsExternal(this.hrefReplaceInternal);
			},

			target() {
				return this.newtab ? `_blank` : '_self';
			},

			rel() {
				return this.newtab ? 'noopener' : '';
			}
		},

		methods: {
			checkIsExternal(url) {
				return /^[a-z]+:/.test(url);
			}
		}
	};
</script>
