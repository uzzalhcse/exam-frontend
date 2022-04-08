<template>
  <div
    class="flex items-center mb-2 px-2 py-2 w-full hover:translate-x-2px hover:text-gray-900 text-gray-600 font-medium tracking-wide"
    :class="{
      'text-blue-500 font-medium': active,
      'is-disabled': disabled
    }">
    <slot></slot>
    <slot name="title"></slot>
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
