<template>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ... mapGetters ([
        'currentUser',
        'isAdmin',
        'isUser',
        'currentApp'
      ])
    },
    created () {
      this.chooseBoard()
    },
    updated () {
      this.chooseBoard()
    },
    activated () {
      this.chooseBoard()
    },
    methods: {
      chooseBoard () {
        if (!this.currentUser) {
          this.$router.replace(this.$route.query.redirect || '/login')
        }
        if (this.isAdmin) {
          this.$store.dispatch('changeApp', this.currentUser.admin[0])
          .then (this.$store.dispatch('setAdminBoard'))
          .then (this.$router.replace(this.$route.query.redirect || '/admin'))
        } else  if (this.isUser){
          this.$store.dispatch('changeApp', this.currentUser.apps[0])
          .then (this.$store.dispatch('setUserBoard'))
          .then (this.$router.replace(this.$route.query.redirect || '/user'))
        } else {
          this.$router.replace(('/user/firstapp'))
        }
      }
    }
  }
</script>
<style>
</style>
