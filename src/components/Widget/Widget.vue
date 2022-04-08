<template>
  <div v-on-clickaway="away" class="relative inline-block text-left text-md" @click="toggle">
    <a
      class="inline-flex justify-center w-full leading-5 font-medium text-gray-900 hover:text-gray-700 focus:outline-none focus:shadow-outline-blue"
      aria-haspopup="true"
      aria-expanded="true">
      <slot name="toggler">
        Dropdown
      </slot>
      <svg-icon class="ml-3" :icon-class="sharedState.active ? 'chevron-up': 'chevron-down'"/>
    </a>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Widget'
}
</script>
