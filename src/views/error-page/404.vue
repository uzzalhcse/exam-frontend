<template>
  <div class="flex items-center justify-center w-screen h-screen bg-indigo-600">
    <p class="text-5xl text-white md:text-7xl lg:text-9xl">404</p>
  </div>
</template>

<script>

export default {
  name: 'Page404',
  computed: {
    message() {
      return 'The webmaster said that you can not enter this page...'
    }
  }
}
</script>
