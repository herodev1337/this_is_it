<template>
  <Navbar admin=false />
  <TestComponent show="true" />
</template>

<script>
import Navbar from './components/Navbar.vue'
import TestComponent from './components/TestComponent.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    TestComponent
  }
}
</script>