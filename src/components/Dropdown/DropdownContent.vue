<template>
  <div v-if="active" class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg z-10">
    <div class="rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
      <slot> </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DropdownContent',
  inject: ['sharedState'],
  computed: {
    active() {
      return this.sharedState.active
    }
  }
}
</script>
