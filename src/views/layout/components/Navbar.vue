<template>
  <div class="border-b-2 border-gray-200">
    <header class="px-6">
      <!--    Top Area    -->
      <div class="flex justify-between items-center py-3 border-b border-gray-200">
        <!--    Left    -->
        <div class="flex-1 flex min-w-0">
          <button class="text-gray-600 focus:outline-none" @click="toggleSideBar">
            <svg-icon :class="{'transform rotate-180': sidebar.opened}" icon-class="h-menu-alt-2-s"/>
          </button>
          <div class="flex-shrink ml-3 relative w-64">
            <span class="absolute inset-y-0 pl-3 left-0 flex items-center">
              <svg-icon class="text-gray-600" icon-class="f-search"/>
            </span>
            <input
              class="block w-full rounded-md bg-gray-100 pl-10 pr-4 py-2 text-sm text-gray-900 placeholder-gray-500  focus:outline-none focus:bg-white focus:border-gray-500"
              placeholder="Search"
              type="text">
          </div>
        </div>
        <!--    Right    -->
        <div class="flex flex-shrink-0 ml-6 items-center">
          <button>
            <svg-icon class="text-gray-500" icon-class="f-bell"></svg-icon>
          </button>
          <div class="ml-3 flex items-center">
            <img class="h-8 w-8 rounded-full object-cover" src="@/assets/images/avatar.jpg" alt="Profile image">
            <dropdown class="sm:ml-3 items-center">
              <span class="hidden sm:block" slot="toggler">
                {{ name }}
              </span>
              <dropdown-content>
<!--                <dropdown-item icon="f-user">Profile</dropdown-item>-->
                <dropdown-item divided icon="f-log-out" @click.native="logout">Logout</dropdown-item>
              </dropdown-content>
            </dropdown>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      isSidebarOpen: true
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('auth/logout')
      await this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

