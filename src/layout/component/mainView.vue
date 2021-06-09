<template>
  <el-container class="layout-container">
    <Aside />
  </el-container>
</template>

<script lang="ts">
  import { getCurrentInstance, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { useStore } from 'store/index'
  import Aside from './component/aside.vue'
  export default {
    name: 'layoutDefaults',
    components: { Aside },
    setup() {
      const { proxy } = getCurrentInstance() as any
      const store = useStore()
      const route = useRoute()

      // 监听路由的变化
      watch(
        () => route.path,
        () => {
          proxy.$refs.layoutDefaultsScrollbarRef.wrap.scrollTop = 0
        }
      )
      return {}
    }
  }
</script>

