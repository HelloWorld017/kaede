<template>
	<div class="KdNavItem" :class="[`KdNavItem--${type}`, { 'KdNavItem--border': border, 'KdNavItem--root': root }]">
		<div class="KdNavItem__row">
			<kd-link :href="item.url" v-if="item.url" @click="$emit('close')"
				class="KdNavItem__item KdNavItem__item--link" active-class="KdNavItem__item--active">

				<slot name="icon"></slot>
				{{item.label}}
			</kd-link>
			<span v-else class="KdNavItem__item KdNavItem__item--label">

				<slot name="icon"></slot>
				{{item.label}}
			</span>

			<slot></slot>

			<button class="KdNavItem__open" v-if="item.children && !root" @click="toggleChildren">
				<icon-submenu class="KdNavItem__open-icon" :class="{'KdNavItem__open-icon--opened': opened}" />
			</button>
		</div>

		<transition name="Submenu" appear
			@before-appear="beforeEnter" @before-enter="beforeEnter" @after-enter="afterEnter" @before-leave="beforeLeave">

			<div class="KdNavItem__submenu" v-if="item.children && opened">
				<kd-nav-item v-for="subitem in item.children" ref="subNavItem" @close="$emit('close')"
					:item="subitem" :key="`${subitem.label}_${subitem.url}`" border />
			</div>
		</transition>
	</div>
</template>

<style lang="less" scoped>
	.KdNavItem {
		position: relative;
		background: var(--grey-900_rgb);

		margin-bottom: 10px;
		width: 30vw;
		max-width: 230px;

		color: var(--grey-050_rgb);
		font-family: var(--font-sans);
		font-size: 1.05rem;
		font-weight: 500;

		&--label, &--root&--label-sub {
			cursor: default;
			background: var(--grey-700_rgb);
		}

		&--border {
			border-top: 1px solid var(--grey-850_rgb);
			margin: 0;
		}

		&__row {
			display: flex;
			padding: 3px;
		}

		&__item {
			flex: 1;
			padding: 10px 20px;
			padding-right: 0;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;

			display: flex;
			justify-content: flex-start;
			align-items: center;
			gap: 5px;

			&--link {
				cursor: pointer;
				position: relative;
				display: inline-block;
				color: inherit;
				text-decoration: none;
				transition: background .4s ease;

				&:hover {
					background: var(--grey-850_rgb);
				}

				&::before {
					content: '';
					position: absolute;
					width: 5px;
					height: 5px;
					border-radius: 50%;
					top: 50%;
					left: 20px;
					transform: translatE(0, -50%);
					background: transparent;
					transition: background .4s ease;
				}
			}

			&--link&--active {
				cursor: default;
				background: var(--grey-900_rgb);
				color: var(--foreground-400_rgb);
				padding-left: 40px;
				transition: all .4s ease;

				&:hover {
					background: var(--grey-900_rgb);
				}

				&::before {
					background: var(--foreground-400_rgb);
				}
			}
		}

		&__open {
			background: transparent;
			cursor: pointer;
			outline: none;
			border: none;
			padding: 10px 20px;
			transition: all .4s ease;

			&:hover {
				background: var(--grey-850_rgb);
			}

			&-icon {
				transform: rotate(0deg);
				transition: transform .4s ease;

				&--opened {
					transform: rotate(180deg);
				}
			}
		}

		&__submenu {
			padding-left: 20px;
			height: 0;
			will-change: height;
			transition: height .4s ease;
			overflow: hidden;
		}

		&--root > &__submenu {
			padding-left: 0;
		}

		@media (max-width: 768px) {
			width: 65vw;
		}
	}
</style>

<script>
	import IconSubmenu from "@/images/IconSubmenu?inline";
	import KdLink from "@/components/KdLink";

	export default {
		name: 'KdNavItem',

		data() {
			return {
				opened: this.root
			};
		},

		props: {
			item: {
				type: Object,
				required: true
			},

			border: {
				type: Boolean
			},

			root: {
				type: Boolean
			}
		},

		computed: {
			type() {
				if(this.item.url) {
					if(this.item.children)
						return 'link-sub';

					return 'link';
				}

				if(this.item.children)
					return 'label-sub';

				return 'label';
			}
		},

		methods: {
			closeChildren() {
				const subNavItem = this.$refs.subNavItem;
				if(subNavItem) {
					subNavItem.forEach(item => item.closeChildren());
				}
			},

			toggleChildren() {
				this.opened = !this.opened;
			},

			beforeEnter(el) {
				el.style.height = '0';
				setTimeout(() => {
					el.style.height = `${el.scrollHeight}px`
				}, 1);
			},

			afterEnter(el) {
				el.style.height = 'auto';
			},

			beforeLeave(el) {
				el.style.height = `${el.scrollHeight}px`;
				setTimeout(() => {
					el.style.height = '0';
				}, 1);
			}
		},

		components: {
			IconSubmenu,
			KdLink
		}
	};
</script>
