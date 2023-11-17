<template>
  <div class="default-layout">
    <div class="content">
      <div class="header">
          
      </div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, Ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { RouteLocationNormalizedLoaded } from "vue-router";

export default {
  setup() {
    const route = useRoute() as RouteLocationNormalizedLoaded;
    const title = ref<string>("");
    const description = ref<string | undefined>("");

    onMounted(() => {
      title.value = route.meta.title as string;
      description.value = route.meta.description as string | undefined;
    });

    return {
      title,
      description,
    };
  },
};
</script>

<style lang="scss">

.default-layout {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  width: 330px;
  margin: auto auto;
  padding: 40px;
  flex-grow: 0;

  .screen-x-small & {
    width: 100%;
    height: 100%;
    border-radius: 0;
    box-shadow: none;
    margin: 0;
    border: 0;
    flex-grow: 1;
  }

  .header {
    margin-bottom: 30px;

    .title {
      line-height: 28px;
      font-weight: 500;
      font-size: 24px;
    }

    .description {
      line-height: 18px;
    }
  }
}
</style>
