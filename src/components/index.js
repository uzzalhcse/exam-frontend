import Vue from 'vue'
const files = require.context('./', true, /\.vue$/i)
files.keys().map(key => {
  const name = _.last(key.split('/')).split('.')[0]
  return Vue.component(_.kebabCase(name), files(key).default)
})
