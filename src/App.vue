<template>
  <div id="app">
    <emerald-navbar />
    <router-view />
  </div>
</template>

<script>
import EmeraldNavbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    'emerald-navbar': EmeraldNavbar
  }
};
</script>
