<template>
	<div id="App" v-if="apiKeyInitialized">
		<transition name="Fade" mode="out-in">
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
	},

	"ja": {
		"no-api-given": "APIキーがありません。インストールマニュアルを参考してください。"
	}
}
</i18n>

<style lang="less">
	@import "./less/index.less";
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
