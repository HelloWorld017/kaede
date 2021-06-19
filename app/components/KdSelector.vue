<template>
	<div class="Selector">
		<button v-for="item in items"
			class="Selector__item"
			:class="{ 'Selector__item--active': selected === item }"
			:key="item"
			@click="select(item)"
		>
			<slot :name="item" />
		</button>
	</div>
</template>

<style lang="less" scoped>
	.Selector {
		display: inline-flex;
		background: var(--grey-100_rgb);
		border-radius: 50px;

		&__item {
			padding: 5px 15px;
			margin: 5px;
			cursor: pointer;
			background: transparent;
			border: none;
			border-radius: 50px;
			outline: none;
			color: var(--grey-900_rgb);
			font-family: var(--font-sans);
			transition: background .4s ease;

			&:not(&--active):hover {
				background: var(--grey-200_rgb);
				color: var(--grey-900_rgb);
			}

			&--active {
				background: var(--grey-850_rgb);
				color: var(--grey-100_rgb);
			}
		}
	}
</style>

<script>
	export default {
		model: {
			prop: 'selected',
			event: 'select'
		},

		props: {
			selected: {
				type: String,
				required: true
			},

			items: {
				type: Array,
				required: true
			}
		},

		methods: {
			select(newItem) {
				this.$emit('select', newItem);
			}
		}
	};
</script>
