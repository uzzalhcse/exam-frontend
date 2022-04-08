<template>
  <scrollbar :settings="settings" class="bg-gray-100 flex-1 overflow-auto">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" class="app-main" />
    </transition>
  </scrollbar>
</template>

<script>
export default {
  name: 'AppMain',
  data() {
    return {
      settings: {
        wheelSpeed: 1
      }
    }
  },
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>
