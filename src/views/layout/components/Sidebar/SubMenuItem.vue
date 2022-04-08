<template>
  <div>
    <a
      class="flex items-center mb-2 px-2 py-2 w-full relative hover:translate-x-2px hover:text-gray-900 text-gray-600 font-medium tracking-wide cursor-pointer"
      :class="{
        'text-blue-500 font-medium': active,
        'is-disabled': disabled
      }"
      @click="toggle =  !toggle"
    >
      <slot></slot>
      <slot name="title"></slot>
      <svg-icon class="absolute right-3" :icon-class="toggle ? 'f-chevron-up' : 'f-chevron-down'"/>
    </a>
    <slot v-if="toggle" name="sub-menu"></slot>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      default: null,
      validator: val => typeof val === 'string' || val === null
    },
    disabled: Boolean
  },
  data() {
    return {
      toggle: false
    }
  },
  computed: {
    active() {
      const route = this.$route
      const { path } = route
      return this.index === path
    }
  },
  methods: {
  }
}
</script>
