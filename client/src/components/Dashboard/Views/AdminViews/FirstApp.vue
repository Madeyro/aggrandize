<template>
  <div class="content">
    <notifications></notifications>
    <div class="container-fluid">
      <card>
        <div slot="header" class="icon-danger">
          <h4 class="title">
            <i class="nc-icon nc-button-power text-primary"></i>
            &nbsp;Start program for your app
          </h4>
        </div>
        <!-- form -->
        <fg-input class="col-sm-6 col-12" v-model="app.name" label="Name" palceHolder="Name" type="text" aria-describedby="nameHelpInline">
          <small id="nameHelpInline" class="text-muted">
            Can not be changed. Must be unique.
          </small>
        </fg-input>
        <fg-input class="col-sm-6 col-12" v-model="app.listSize" label="Waiting list size" placeholder="List size" value="app.listSize" type="number" aria-describedby="listHelpInline">
          <small id="listHelpInline" class="text-muted">
            Set new size.<br>If left blank it will be set to 0.
          </small>
        </fg-input>
        <fg-input class="col-sm-6 col-12" v-model="app.admin" label="Admin" placeholder="Admin email" value="app.admin" type="mail" aria-describedby="adminHelpInline">
          <small id="adminHelpInline" class="text-muted">
            You will log in with this email.
          </small>
        </fg-input>
        <div class="footer">
          <hr>
          <div style="float: right;">
            <button class="btn btn-primary" @click="addApp">Save</button>
            <button class="btn btn-reset" @click="resetForm">Cancel</button>
          </div>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      Card
    },
    computed: {
      ...mapGetters([
        'currentUser',
        'isAdmin',
        'currentApp'
      ])
    },
    data () {
      return {
        app: {
          name: '',
          listSize: 50,
          admin: ''
        }
      }
    },
    created () {
      this.chooseBoard()
      this.app.admin = this.currentUser.mail
    },
    updated () {
      this.chooseBoard()
    },
    activated () {
      this.chooseBoard()
    },
    methods: {
      chooseBoard () {
        if (this.isAdmin) {
          this.$store.dispatch('changeApp', this.currentUser.admin[0])
          .then (this.$store.dispatch('setAdminBoard'))
          .then (this.$router.replace(this.$route.query.redirect || '/admin'))
        }
      },
      async addApp () {
        try {
          var url = 'apps/'

          var res = await this.$http.put(url, {
            id: this.app.name,
            admin: this.app.admin,
            listsize: this.app.listSize
          })
          this.notifyVue('App was successfully added. You ahve to log out and log in to take effect.')
          this.resetForm()
        } catch (err) {
          alert(err.message)
        }
      },
      resetForm () {
        this.app.name = ''
        this.app.listSize = 50
        this.admin = this.currentUser
      },
      notifyVue (msg) {
        const notification = {
          template: `<span>${msg}.</span>`
        }
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
<style>

</style>
