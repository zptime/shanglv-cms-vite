<template>
  <el-container class="layout-container">
    <Aside />
  </el-container>
</template>

<script lang="ts">
  import { getCurrentInstance, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { useStore } from 'store/index'
  import Aside from '../component/aside.vue'
  export default {
    name: 'layoutDefaults',
    components: { Aside },
    setup() {
      return {}
    }
  }
</script>

