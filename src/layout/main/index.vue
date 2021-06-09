<template>
  <el-container class="layout-container">
    <Aside />
    <el-container class="flex-center layout-backtop">
      <el-scrollbar ref="layoutDefaultsScrollbarRef">
        <MainView />
      </el-scrollbar>
    </el-container>
  </el-container>
</template>

<script lang="ts">
  import {  getCurrentInstance, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import Aside from '../component/aside.vue'
  import MainView from '../component/mainView.vue'
  
  export default {
    name: 'layoutDefaults',
    components: { Aside, MainView },
    setup() {
      const { proxy } = getCurrentInstance() as any
      const route = useRoute()
      // 监听路由的变化
      watch(
        () => route.path,
        () => {
          proxy.$refs.layoutDefaultsScrollbarRef.wrap.scrollTop = 0
        }
      )
      return {
        
      }
    }
  }
</script>

