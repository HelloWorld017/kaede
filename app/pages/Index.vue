<template>
	<div id="Index">
		<kd-topbar />
		<kd-header />
		<kd-post-list :context="[]" />
		<kd-footer />
	</div>
</template>

<style lang="less" scoped>
	#Index {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		width: 100%;
		min-height: 100vh;
	}
</style>

<script>
	import KdFooter from "@/layouts/KdFooter";
	import KdHeader from "@/layouts/KdHeader";
	import KdPostList from "@/layouts/KdPostList";
	import KdTopbar from "@/layouts/KdTopbar";

	export default {
		components: {
			KdFooter,
			KdHeader,
			KdPostList,
			KdTopbar
		}
	};
</script>
