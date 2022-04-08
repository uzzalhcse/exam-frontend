<template>
  <div>
    <div :class="contentClass" class="flex items-center justify-between py-3">
      <div class="div">
        <h2 class="text-3xl font-semibold text-gray-900 leading-tight">{{title}}</h2>
        <p>{{ summary }}</p>
      </div>
      <slot name="option"></slot>
    </div>
    <div :class="contentClass" class="py-3">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppView',
  props: {
    title: {
      type: String,
      default: null,
      required: true
    },
    summary: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: 'medium'
    }
  },
  data() {
    return {
    }
  },
  computed: {
    contentClass() {
      if (this.size === 'medium') {
        return 'mx-6'
      } else if (this.size === 'small') {
        return 'mx-64'
      }
      return 'mx-6'
    }
  },
  methods: {
  }
}
</script>

