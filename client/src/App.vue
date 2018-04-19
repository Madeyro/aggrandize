<template>
  <div :class="{'nav-open': $sidebar.showSidebar}">
    <notifications></notifications>
    <router-view></router-view>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
    ...mapGetters({ currentUser: 'currentUser' })
    },
    created () {
      this.checkCurrentLogin()
    },
    updated () {
      this.checkCurrentLogin()
    },
    methods: {
      checkCurrentLogin () {
        if (!this.currentUser && this.$route.path !== '/' && this.$route.path !== '/register') {
          this.$router.push('/login')
        }
      }
    }
  }
</script>
<style lang="scss">
  .vue-notifyjs.notifications{
    .list-move {
      transition: transform 0.3s, opacity 0.4s;
    }
    .list-item {
      display: inline-block;
      margin-right: 10px;

    }
    .list-enter-active {
      transition: transform 0.2s ease-in, opacity 0.4s ease-in;
    }
    .list-leave-active {
      transition: transform 1s ease-out, opacity 0.4s ease-out;
    }

    .list-enter {
      opacity: 0;
      transform: scale(1.1);

    }
    .list-leave-to {
      opacity: 0;
      transform: scale(1.2, 0.7);
    }
  }
</style>
