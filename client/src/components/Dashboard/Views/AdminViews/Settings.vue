<template>
  <div class="content">
    <div class="container-fluid">
      <card>

      </card>
    </div>
  </div>
</template>
<script>
  import Card from 'src/components/UIComponents/Cards/Card.vue'

  export default {
    components: {
      Card
    },
    data () {
      return {

      }
    },
    methods: {
      notifyVue(msg) {
        const notification = {
          template: `<span>${msg}.</span>`
        }
        const color = Math.floor((Math.random() * 4) + 1)
        this.$notify(
          {
            component: notification,
            icon: 'nc-icon nc-check-2',
            type: 'success'
          })
      }
    }
  }

</script>
<style lang="scss">

</style>
