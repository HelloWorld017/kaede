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
		background: rgba(var(--grey-100), 1);
		border-radius: 50px;

		&__item {
			padding: 5px 15px;
			margin: 5px;
			cursor: pointer;
			background: transparent;
			border: none;
			border-radius: 50px;
			outline: none;
			color: rgba(var(--grey-900), 1);
			font-family: var(--font-sans);
			transition: background .4s ease;

			&:not(&--active):hover {
				background: rgba(var(--grey-200), 1);
				color: rgba(var(--grey-900), 1);
			}

			&--active {
				background: rgba(var(--grey-850), 1);
				color: rgba(var(--grey-100), 1);
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
