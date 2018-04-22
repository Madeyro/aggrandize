<template>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    created () {
      this.chooseBoard()
    },
    updated () {
      this.chooseBoard()
    },
    activated () {
      this.chooseBoard()
    },
    computed: {
      ... mapGetters ([
        'currentUser',
        'isAdmin',
        'currentApp'
      ])
    },
    methods: {
      chooseBoard () {
        if (!this.currentUser) {
          this.$router.replace(this.$route.query.redirect || '.login')
        }
        if (this.isAdmin) {
          this.$store.dispatch('changeApp', this.currentUser.admin[0])
          .then (this.$store.dispatch('setAdminBoard'))
          .then (this.$router.replace(this.$route.query.redirect || '/admin'))
        } else {
          this.$store.dispatch('changeApp', this.currentUser.apps[0])
          .then (this.$store.dispatch('setUserBoard'))
          .then (this.$router.replace(this.$route.query.redirect || '/user'))
        }
      }
    }
  }
</script>
<style>
</style>
