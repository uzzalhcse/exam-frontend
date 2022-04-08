<template>
  <scrollbar id="sidebar" :settings="settings" :class="isCollapse ? 'block' : 'hidden'" class="bg-gray-100 border-r">
    <div class="w-56 p-2 pr-0 overflow-auto">
      <div class="flex items-center">
        <img class="h-8 w-8" src="@/assets/images/logo.svg" alt="">
        <h1 class="ml-2 hover:translate-x-2px text-gray-900 text-lg font-medium tracking-wide">Tailwind Admin</h1>
      </div>
      <nav class="mt-8 mb-1">
        <sidebar-item v-for="route in private_routes" :key="route.path" :item="route" :base-path="route.path" />
      </nav>
    </div>
  </scrollbar >
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
// import PerfectScrollbar from 'perfect-scrollbar'
// import VuePerfectScrollbar from 'vue-perfect-scrollbar'
export default {
  components: { SidebarItem },
  data() {
    return {
      isSidebarOpen: true,
      settings: {
        maxScrollbarLength: 1
      }
    }
  },
  computed: {
    ...mapGetters([
      'private_routes',
      'sidebar'
    ]),
    isCollapse() {
      return this.sidebar.opened
    }
  },
  mounted() {
    // new PerfectScrollbar('#sidebar')
  }
}
</script>
