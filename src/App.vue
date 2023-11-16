<template>
  <notifications position="bottom right" />
  <div id="root">
    <div :class="cssClasses">
      <component
        :is="$route.meta.layout"
        :title="title"
        :is-x-small="screen.getScreenSizeInfo.isXSmall"
        :is-large="screen.getScreenSizeInfo.isLarge"
      >
        <div class="content" style="margin: 10px">
          <!-- Sağdan ve soldan 5 piksel margin ekler -->
          <router-view></router-view>
        </div>
        <template #footer>
          <app-footer />
        </template>
      </component>
    </div>
  </div>
</template>

<script lang="ts">
import AppFooter from "@/components/app-footer.vue";
import { sizes, subscribe, unsubscribe } from "./utils/media-query";
import {
  getCurrentInstance,
  reactive,
  onMounted,
  onBeforeUnmount,
  computed,
} from "vue";


function getScreenSizeInfo() {
  const screenSizes: any = sizes();

  return {
    isXSmall: screenSizes["screen-x-small"],
    isLarge: screenSizes["screen-large"],
    cssClasses: Object.keys(screenSizes).filter((cl) => screenSizes[cl]),
  };
}

export default {
  components: {
    AppFooter,
  },
  setup() {
    const vm: any = getCurrentInstance();

    const title = vm.proxy.$appInfo.title;
    const screen: any = reactive({ getScreenSizeInfo: {} });
    screen.getScreenSizeInfo = getScreenSizeInfo();

    function screenSizeChanged() {
      screen.getScreenSizeInfo = getScreenSizeInfo();
    }

    onMounted(() => {
      subscribe(screenSizeChanged);
    });

    onBeforeUnmount(() => {
      unsubscribe(screenSizeChanged);
    });

    const cssClasses = computed(() => {
      return ["app"].concat(screen.getScreenSizeInfo.cssClasses);
    });

    return {
      title,
      screen,
      cssClasses,
    };
  },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
