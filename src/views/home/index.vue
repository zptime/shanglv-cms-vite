<template>
 <div>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <HelloWorld msg="build 时候，组件必传参数" />
  <svg-icon iconClass="bug"></svg-icon>
  <el-button type="primary" @click="addCount">count is: {{ count }}</el-button>

  <el-button type="primary" icon="el-icon-search">搜索</el-button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
  import { useStore } from 'store/index'
  import HelloWorld from '@/components/HelloWorld.vue'


export default defineComponent({
	name: 'App',
  components: {
    HelloWorld,
  },
  setup() {
    const store = useStore();

    const count: any = computed({
      get() {
        return store.state.app.count;
      },
      set(value) {
        store.commit("increment", value);
      },
    });

    function addCount() {
      count.value += 1;
    }

    return {
      count,
      addCount,
    };
  },
});
</script>

<style scoped>
</style>
