<template>
  <transition name="fade" mode="out-in">
    <div v-if="isAnimation" class="KdThemeOverlay">
      <transition name="slide" mode="out-in">
        <icon-LightMode v-if="isLight" class="KdThemeOverlay__icon" />
      </transition>
      <transition name="slide" mode="out-in">
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

    background: var(--grey-900_rgb);

    transition: background .75s;
  }

  .KdThemeOverlay__icon {
    color: var(--grey-050_rgb);

    position: absolute;
    width: 128px;
    height: 128px;

    transition: color .75s;
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .75s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .slide-enter-active, .slide-leave-active {
    transition: all .75s;
  }

  .slide-enter {
    transform: translateX(100%);
    opacity: 0;
  }

  .slide-leave-to {
    transform: translateX(-100%);
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

            setTimeout(() => this.$store.commit('theme/setIsAnimation', false), 750);
          }, 750);
        }
      },
    },

    components: {
      IconLightMode,
      IconDarkMode,
    },
  };
</script>