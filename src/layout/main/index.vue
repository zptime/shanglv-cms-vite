<template>
  <el-container class="layout-container">
    <div>
      <div>{{ getThemeConfig.globalTitle }}</div>
      <div>侧边栏</div>
    </div>
  </el-container>
</template>

<script lang="ts">
import { computed } from "vue";
import { useStore } from "store/index";

export default {
  name: "layoutDefaults",
  setup() {
    const store = useStore();
    // 获取布局配置信息
    const getThemeConfig = computed(() => {
      return store.state.themeConfig;
    });

    return {
      getThemeConfig,
    };
  },
};
</script>

