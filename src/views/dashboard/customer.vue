<template>
  <app-view :title="'Welcome' + name" summary="Short summary here..">
    <template slot="content">
      <h1 class="text-5xl font-semibold text-gray-900 leading-tight text-center">Customer Dashboard</h1>
    </template>
  </app-view>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CustomerDashboard',
  components: {},
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
  }
}
</script>
