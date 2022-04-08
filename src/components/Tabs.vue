<template lang="html">
  <div>
    <nav class="flex flex-col sm:flex-row">
      <button
        v-for="(tab, index) in tabs"
        :key="tab.title"
        :class="{'text-blue-500 border-b-2 font-medium border-blue-500': (index == selectedIndex)}"
        class="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none"
        @click="selectTab(index)">
        {{ tab.title }}
      </button>
    </nav>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      default: 'light'
    }
  },
  data() {
    return {
      selectedIndex: 0, // the index of the selected tab,
      tabs: [] // all of the tabs
    }
  },
  created() {
    this.tabs = this.$children
  },
  mounted() {
    this.selectTab(0)
  },
  methods: {
    selectTab(i) {
      this.selectedIndex = i

      // loop over all the tabs
      this.tabs.forEach((tab, index) => {
        tab.isActive = (index === i)
      })
    }
  }
}
</script>
