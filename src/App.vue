<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <svg-icon iconClass="bug"></svg-icon>
	<button @click="addCount">count is: {{ count }}</button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from './store/index'
import HelloWorld from './components/HelloWorld.vue'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  },
  setup() {
		const store = useStore()

		const count: any = computed({
			get() {
				return store.state.count
			},
			set(value) {
				store.commit('increment', value)
			}
		})

		function addCount() {
			count.value += 1
		}

		return {
			count,
			addCount
		}
	}
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
