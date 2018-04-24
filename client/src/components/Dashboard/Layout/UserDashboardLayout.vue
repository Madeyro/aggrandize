<template>
  <div class="wrapper">
    <side-bar title="User">
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/user/overview">
        <i class="nc-icon nc-chart-pie-35"></i>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/user/waitlists">
        <i class="nc-icon nc-notes"></i>
        <p>Waiting lists</p>
      </sidebar-link>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'
  export default {
      components: {
          TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu
    },
    methods: {
        toggleSidebar () {
            if (this.$sidebar.showSidebar) {
                this.$sidebar.displaySidebar(false)
        }
      }
    }
  }

</script>

<style lang="scss">

</style>