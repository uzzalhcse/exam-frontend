<template>
  <div class="py-1">
    <a
      href="#"
      :class="divided ? 'border-t border-gray-200' : ''"
      class="block px-4 py-2 text-sm leading-5 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:bg-gray-100 focus:text-gray-700"
      role="menuitem">
      <span class="flex">
        <svg-icon v-if="icon" class="mr-3" :size="4" :icon-class="icon"/>
        <slot/>
      </span>
    </a>
  </div>
</template>

<script>
export default {
  name: 'DropdownItem',
  props: {
    icon: {
      type: String,
      default: null
    },
    divided: {
      type: Boolean,
      default: false
    }
  }
}
</script>
