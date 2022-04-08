<template>
  <div class="h-screen flex overflow-hidden">
    <!--  Sidebar  -->
    <sidebar/>
    <!--  End Sidebar  -->
    <!--  Main Area -->
    <div class="flex flex-col flex-1 min-w-0 bg-white">
      <!--  Header -->
      <navbar />
      <!--  End Header -->
      <!--  Content Area -->
      <app-main />
      <!--  End Content Area -->
    </div>
    <!--  End Main Area -->
  </div>
</template>

<script>
import { AppMain, Navbar, Sidebar } from './components'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    Sidebar
  }
}
</script>
