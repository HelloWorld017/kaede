<template>
	<button class="KdBookmarkBadge" @click="openBookmark">
		<icon-bookmark class="KdBookmarkBadge__icon" />
		{{$t('bookmark')}}
	</button>
</template>

<style lang="less" scoped>
	.KdBookmarkBadge {
		border: none;
		background: transparent;

		display: inline-flex;
		align-items: center;
		justify-content: center;

		&__icon {
			height: 1.1rem;
			margin-right: 5px;
		}
	}
</style>

<i18n>
{
	"ko": {
		"bookmark": "북마크"
	},

	"en": {
		"bookmark": "Bookmark"
	}
}
</i18n>

<script>
	import IconBookmark from "@/images/IconBookmark?inline";

	export default {
		methods: {
			openBookmark() {

			}
		},

		components: {
			IconBookmark
		}
	};
</script>
