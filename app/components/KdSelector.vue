<template>
	<div class="Selector">
		<a v-for="item in items"
			class="Selector__item"
			:class="{ 'Selector__item--active': selected === item }"
			v-key="item"
			@select="select(item)"
		>
			<slot name="item" />
		</a>
	</div>
</template>

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
