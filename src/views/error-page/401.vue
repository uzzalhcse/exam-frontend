<template>
  <div class="flex items-center justify-center w-screen h-screen bg-indigo-600">
    <p class="text-5xl text-white md:text-7xl lg:text-9xl">401</p>
  </div>
</template>

<script>
import errGif from '@/assets/images/401.gif'

export default {
  name: 'Page401',
  data() {
    return {
      errGif: errGif + '?' + +new Date(),
      ewizardClap: 'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646',
      dialogVisible: false
    }
  },
  methods: {
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: '/dashboard' })
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>
