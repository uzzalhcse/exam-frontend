<template lang="html">
  <button :class="classNames" class="mx-1 font-bold py-2 px-4 rounded inline-flex items-center">
    <svg-icon v-if="icon" :icon-class="icon"/>
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'gray'
    }
  },
  data() {
    return {
      colors: {
        black: 'bg-black hover:bg-black text-white',
        white: 'bg-white hover:bg-white text-black',
        gray: 'bg-gray-300 hover:bg-gray-400 text-gray-800',
        red: 'bg-red-300 hover:bg-red-400 text-red-800',
        orange: 'bg-orange-300 hover:bg-orange-400 text-orange-800',
        green: 'bg-green-300 hover:bg-green-400 text-green-800',
        teal: 'bg-teal-300 hover:bg-teal-400 text-teal-800',
        blue: 'bg-blue-300 hover:bg-blue-400 text-blue-800',
        indigo: 'bg-indigo-300 hover:bg-indigo-400 text-indigo-800',
        purple: 'bg-purple-300 hover:bg-purple-400 text-purple-800',
        pink: 'bg-pink-500 hover:bg-pink-700 text-pink-800'
      }
    }
  },
  computed: {
    classNames() {
      return this.colors[this.color]
    }
  }
}
</script>
