<template>
	<a v-if="isExternal"
		class="KdLink"
		:href="href">

		<slot></slot>
	</a>

	<router-link v-else
		class="KdLink"
		:exact-active-class="activeClass"
		:to="href">

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
			}
		},

		computed: {
			isExternal() {
				return /^[a-z]+:/.test(this.href);
			}
		}
	};
</script>
