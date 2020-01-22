<template>
	<div id="App" v-if="apiKeyInitialized">
		<transition name="Fade">
			<router-view />
		</transition>
	</div>
	<div id="App" v-else>
		{{$t('no-api-given')}}
	</div>
</template>

<i18n>
{
	"ko": {
		"no-api-given": "API키가 설정되지 않았습니다. 설치 매뉴얼을 참고해 설정해주세요!"
	},

	"en": {
		"no-api-given": "The API Key has not been configured. Please refer to installation manual!"
	}
}
</i18n>

<style lang="less">
	:root {
		--font-ui: 'Raleway', 'KoPubWorldDotum', sans-serif;
		--font-title: 'NanumSquare', sans-serif;
		--font-sans: 'KoPubWorldDotum', sans-serif;

		--color-background: #efebdd;
		--color-foreground: #35aba4;
		--color-red: #eb5757;
		--color-facebook: #039be5;
		--color-twitter: #56ccf2;

		--grey-050: #000000;
		--grey-100: #202020;
		--grey-200: #3b3b3b;
		--grey-900: #ffffff;
	}

	body, html {
		margin: 0;
		padding: 0;
	}
</style>

<script>
	export default {
		computed: {
			apiKeyInitialized() {
				return this.$store.state.config.title !== undefined;
			}
		}
	};
</script>
