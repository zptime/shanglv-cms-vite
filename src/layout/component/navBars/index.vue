<template>
  <div class="layout-navbars-container">
    <i
      class="layout-navbars-breadcrumb-icon"
      :class="getThemeConfig.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
      @click="onThemeConfigChange"
    ></i>
  </div>
</template>

<script lang="ts">
  import { computed } from 'vue'
  import { useStore } from 'store/index'

  export default {
    name: 'layoutNavBars',
    components: {  },
    setup() {
      const store = useStore()
      // 获取布局配置信息
      const getThemeConfig = computed(() => {
        return store.state.themeConfig
      })

      // 展开/收起左侧菜单点击
      const onThemeConfigChange = () => {
        store.state.themeConfig.isCollapse = !store.state.themeConfig.isCollapse
      }
      return {
        getThemeConfig,
        onThemeConfigChange
      }
    }
  }
</script>

<style scoped lang="scss">
  .layout-navbars-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
</style>