<template>
	<div @click="change" class="KdThemeButton__button">
		<div class="KdThemeButton__container">
			<icon-LightMode v-if="isDark" class="KdThemeButton__icon" />
			<icon-DarkMode v-if="isLight" class="KdThemeButton__icon" />

			<div class="KdThemeButton__text" v-if="isDark">{{$t('lightmode')}}</div>
			<div class="KdThemeButton__text" v-if="isLight">{{$t('darkmode')}}</div>
		</div>
	</div>
</template>

<i18n>
{
	"ko": {
	"lightmode": "밝은 테마",
		"darkmode": "어두운 테마"
	},

	"en": {
	"lightmode": "Light Theme",
		"darkmode": "Dark Theme"
	},

	"ja": {
	"lightmode": "明るいテーマ",
		"darkmode": "暗いテーマ"
	}
}
</i18n>

<style lang="less" scoped>
	.KdThemeButton__button {
		width: 30vw;
		max-width: 230px;

		cursor: pointer;

		@media (max-width: 768px) {
			width: 65vw;
		}
	}

	.KdThemeButton__container {
		font-family: var(--font-sans);
		font-size: 1.05rem;
		font-weight: 500;

		padding: 10px 20px;
		text-overflow: ellipsis;
		text-decoration: none;
		overflow: hidden;
		white-space: nowrap;

		display: flex;
		flex: row;
		justify-content: center;
		align-items: center;

		background: var(--grey-050_rgb);
		color: var(--grey-900_rgb);
		transition: background .4s ease;

		&:hover {
			background: var(--grey-100_rgb);
		}
	}

	.KdThemeButton__icon {
		width: 16px;
		height: 16px;

		font-size: 0;
	}

	.KdThemeButton__text {
		margin-left: 8px;
	}
</style>

<script>
	import IconLightMode from "@/images/IconLightMode?inline";
	import IconDarkMode from "@/images/IconDarkMode?inline";

	export default {
		computed: {
			theme() {
				return this.$store.state.theme.theme;
			},

			isDark() {
				return this.$store.state.theme.theme === 'dark';
			},

			isLight() {
				return this.$store.state.theme.theme === 'light';
			}
		},

		methods: {
			change() {
				this.$store.commit('theme/setIsAnimation', true);
			}
		},

		components: {
			IconLightMode,
			IconDarkMode
		}
	}
</script>
