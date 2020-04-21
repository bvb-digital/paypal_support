<template>
  <div id="app">
    <div id="paypal-button"></div>
  </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  name: 'App',
  mounted(){
      this.getClientToken()
  },
  components: {
  },
  methods: {
    ...mapActions(['initPaypal', 'getClientToken'])
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
