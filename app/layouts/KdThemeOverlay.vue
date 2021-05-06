<template>
  <transition name="fade">
    <div v-if="isAnimation" class="KdThemeOverlay">
      <transition name="fade">
        <icon-LightMode v-if="isLight" class="KdThemeOverlay__icon" />
      </transition>
      <transition name="fade">
        <icon-DarkMode v-if="isDark" class="KdThemeOverlay__icon" />
      </transition>
    </div>
  </transition>
</template>

<style lang="less" scoped>
  .KdThemeOverlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;

    background: rgba(var(--grey-900), 1);

    transition: background 1s;
  }

  .KdThemeOverlay__icon {
    color: rgba(var(--grey-050), 1);

    position: absolute;
    width: 128px;
    height: 128px;

    transition: color 1s;
  }

  .fade-enter-active, .fade-leave-active {
    transition: all 1s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>

<script>
  import IconLightMode from "@/images/IconLightMode?inline";
  import IconDarkMode from "@/images/IconDarkMode?inline";

  export default {
    computed: {
      isAnimation() {
        return this.$store.state.theme.isAnimation;
      },

      isDark() {
        return this.$store.state.theme.theme === "dark";
      },

      isLight() {
        return this.$store.state.theme.theme === "light";
      },
    },

    watch: {
      isAnimation(newState) {
        if (newState) {
          setTimeout(() => {
            if (this.$store.state.theme.theme === "dark") {
              this.$store.dispatch("theme/changeTheme", "light");
            } else {
              this.$store.dispatch("theme/changeTheme", "dark");
            }

            setTimeout(() => this.$store.commit('theme/setIsAnimation', false), 1000);
          }, 1000);
        }
      },
    },

    components: {
      IconLightMode,
      IconDarkMode,
    },
  };
</script>