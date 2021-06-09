<template>
  <el-aside class="layout-aside" :class="setCollapseWidth">
    <Logo v-if="setShowLogo" />
    <el-scrollbar class="flex-auto" ref="layoutAsideScrollbarRef">
      <SubBar :menuList="menuList" :class="setCollapseWidth" />
    </el-scrollbar>
  </el-aside>
</template>

<script lang="ts">
  import {
    ref,
    toRefs,
    reactive,
    computed,
    watch,
    getCurrentInstance,
    onBeforeMount,
    onUnmounted
  } from 'vue'
  import { useStore } from 'store/index'
  import Logo from './logo/index.vue'
  import SubBar from './navMenu/subBar.vue'
  export default {
    name: 'layoutAside',
    components: { Logo, SubBar },
    setup() {
      const store = useStore()
      const state: any = reactive({
        menuList: [
          {
            meta: {
              auth: ['admin', 'test'],
              icon: 'iconfont el-icon-menu',
              isAffix: true,
              isHide: false,
              isIframe: false,
              isKeepAlive: true,
              title: '首页',
              index: '1'
            },
            name: 'home',
            path: '/home'
          },
          {
            meta: {
              auth: ['admin', 'test'],
              icon: 'iconfont el-icon-s-grid',
              isAffix: true,
              isHide: false,
              isIframe: false,
              isKeepAlive: true,
              title: '首页2',
              index: '2'
            },
            name: 'home2',
            path: '/home2'
          }
        ],
        clientWidth: ''
      })
      const setShowLogo = ref<boolean>(true)
      const setCollapseWidth = ref<string>('layout-aside-width-default')

      // 页面加载前
      onBeforeMount(() => {})
      // 页面卸载时
      onUnmounted(() => {})
      return {
        setShowLogo,
        setCollapseWidth,
        ...toRefs(state)
      }
    }
  }
</script>

