<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">{{ currentApp }}</a>
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
              <span class="notification selector">{{ Apps.length }}</span>
            </template>
            <template v-for="app in Apps">
              <a class="dropdown-item"  v-on:click="switchApp(app)" href="javascript:;" v-bind:key="app">{{ app }}</a>
            </template>
          </drop-down>
        </ul>
        <ul class="navbar-nav ml-auto">
          <drop-down :title="currentUser.mail">
            <a class="dropdown-item" @click="switchAdminBoard" href="javascript:;" v-if="isAdmin">Admin Dashboard</a>
            <a class="dropdown-item" @click="firstApp" href="javascript:;" v-if="!isAdmin">Admin Dashboard</a>
            <a class="dropdown-item" @click="switchUserBoard" href="javascript:;" v-if="isUser">User Dashboard</a>
            <a class="dropdown-item" @click="logout" href="javascript:;" >Log out</a>
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
      ...mapGetters([
        'currentUser',
        'isAdmin',
        'isUser',
        'adminApps',
        'userApps',
        'currentApp',
        'isAdminBoard'
      ])
    },
    data () {
      return {
        activeNotifications: false,
        Apps: []
      }
    },
    created () {
      this.getApps()
    },
    updated () {
      this.getApps()
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
      async logout() {
        delete localStorage.token
        this.$store.dispatch('logout')
        .then (this.$router.push('/login'))
      },
      async switchAdminBoard () {
        this.$store.dispatch('changeApp', this.adminApps[0])
        .then (this.$store.dispatch('setAdminBoard'))
        .then (this.$router.push('/admin'))
      },
      async switchUserBoard () {
        await this.$store.dispatch('changeApp', this.userApps[0])
        .then (this.$store.dispatch('setUserBoard'))
        .then (this.$router.push('/user'))
      },
      getApps () {
        if (this.isAdminBoard) {
          this.Apps = this.adminApps
        } else {
          this.Apps = this.userApps
        }
      },
      async switchApp (app) {
        this.$store.dispatch('changeApp', app)
        .then (this.currentApp)
      },
      firstApp () {
        this.$router.push('/user/firstapp')
      }
    }
  }

</script>
<style>
</style>
