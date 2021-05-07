<template>
	<div class="KdNavBookmark" @click="$emit('bookmark')">
		<kd-nav-item class="KdNavBookmark__root" :item="{ label: $t('bookmark') }" root>
			<template #icon>
				<icon-bookmark-outline class="KdNavBookmark__icon" />
			</template>
		</kd-nav-item>

		<kd-nav-item v-for="bookmark in bookmarks" :item="getItem(bookmark)"
			:key="`${bookmark.title}_${bookmark.href}`" border>

			<button class="KdNavBookmark__delete KdNavItem__open" @click="removeBookmark(bookmark.id)">
				<icon-times class="KdNavBookmark__delete-icon" />
			</button>
		</kd-nav-item>
	</div>
</template>

<style lang="less" scoped>
	.KdNavBookmark {
		&__root {
			margin-bottom: 0;

			& + .KdNavItem {
				border: none;
			}
		}

		&__icon {
			fill: rgba(var(--grey-050), 1);
			height: 16px;
			vertical-align: middle;
		}

		&__delete-icon {
			stroke: rgba(var(--grey-050), 1);
			vertical-align: middle;
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
	},

	"ja": {
		"bookmark": "ブックマーク"
	}
}
</i18n>

<script>
	import IconBookmarkOutline from "@/images/IconBookmarkOutline?inline";
	import IconTimes from "@/images/IconTimes?inline";
	import KdNavItem from "@/components/KdNavItem";

	export default {
		computed: {
			bookmarks() {
				return this.$store.state.bookmarks.bookmarks;
			}
		},

		methods: {
			getItem(bookmark) {
				return {
					label: bookmark.title,
					url: bookmark.url
				};
			},

			removeBookmark(id) {
				this.$store.dispatch('bookmarks/removeBookmark', id);
			}
		},

		components: {
			IconBookmarkOutline,
			IconTimes,
			KdNavItem
		}
	};
</script>
