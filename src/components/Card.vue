<template>
  <div class="max-w-sm w-full lg:max-w-full lg:flex">
    <div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" :style="{backgroundImage: 'url(' + require('@/assets/images/' + image ) + ')'}" title="Woman holding a mug">
    </div>
    <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
      <div class="mb-8">
        <div class="text-gray-900 font-bold text-xl mb-2">{{title}}</div>
        <p class="text-gray-700 text-base">{{text}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    image: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null,
      required: true
    },
    text: {
      type: String,
      default: null
    }
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

