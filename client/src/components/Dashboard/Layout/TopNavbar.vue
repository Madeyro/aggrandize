<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Test App 1</a>
      <button type="button"
              class="navbar-toggler navbar-toggler-right"
              :class="{toggled: $sidebar.showSidebar}"
              aria-controls="navigation-index"
              aria-expanded="false"
              aria-label="Toggle navigation"
              @click="toggleSidebar">
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="nav navbar-nav mr-auto">
          <drop-down tag="li">
            <template slot="title">
              <i class="nc-icon nc-app"></i>
              <b class="caret"></b>
              <span class="notification selector">4</span>
            </template>
            <a class="dropdown-item" href="/">Test App 1</a>
            <a class="dropdown-item" href="/">App 2</a>
            <a class="dropdown-item" href="/">Application 3</a>
            <a class="dropdown-item" href="/">Teste App 4</a>
          </drop-down>
          <drop-down tag="li">
            <template slot="title">
              <i class="nc-icon nc-bell-55"></i>
              <b class="caret"></b>
              <span class="notification">5</span>
            </template>
            <a class="dropdown-item" href="/">Notification 1</a>
            <a class="dropdown-item" href="/">Notification 2</a>
            <a class="dropdown-item" href="/">Notification 3</a>
            <a class="dropdown-item" href="/">Notification 4</a>
            <a class="dropdown-item" href="/">Another notification</a>
          </drop-down>
        </ul>
        <ul class="navbar-nav ml-auto">
          <drop-down :title="currentUser.mail">
            <a class="dropdown-item" @click="logout" href="javascript:;">Log out</a>
          </drop-down>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({ currentUser: 'currentUser' }),
      routeName () {
        const {name} = this.$route
        return this.capitalizeFirstLetter(name)
      }
    },
    data () {
      return {
        activeNotifications: false
      }
    },
    methods: {
      capitalizeFirstLetter (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      },
      toggleNotificationDropDown () {
        this.activeNotifications = !this.activeNotifications
      },
      closeDropDown () {
        this.activeNotifications = false
      },
      toggleSidebar () {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      },
      hideSidebar () {
        this.$sidebar.displaySidebar(false)
      },
      logout() {
        delete localStorage.token
        this.$store.dispatch('logout')
        this.$router.push('/login')
      }
    }
  }

</script>
<style>
</style>
