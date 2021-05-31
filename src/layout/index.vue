// layout 入口文件
<template>
  <div class="app-wrapper">
    <component :is="layout" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import Defaults from './main/index.vue'

  export default defineComponent({
    name: 'Layout',
    components: {
      Defaults
    },
    setup() {
      const layout = ref<string>('Defaults')
      return {
        layout
      }
    }
  })
</script>

<style lang="scss" scoped>
  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
  }
</style>


