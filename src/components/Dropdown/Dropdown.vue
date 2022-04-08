<template>
  <div v-on-clickaway="away" class="relative inline-block text-left text-md" @click="toggle">
    <button
      class="inline-flex justify-center w-full leading-5 font-medium text-gray-900 hover:text-gray-700 focus:outline-none focus:shadow-outline-blue"
      aria-haspopup="true"
      aria-expanded="true">
      <slot name="toggler">
        Dropdown
      </slot>
      <svg-icon class="ml-l" :icon-class="sharedState.active ? 'f-chevron-up': 'f-chevron-down'"/>
    </button>
    <slot> </slot>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'
export default {
  name: 'Dropdown',
  mixins: [clickaway],
  provide() {
    return {
      sharedState: this.sharedState
    }
  },
  data() {
    return {
      sharedState: {
        active: false
      }
    }
  },
  methods: {
    toggle() {
      this.sharedState.active = !this.sharedState.active
    },
    away() {
      this.sharedState.active = false
    }
  }
}
</script>
