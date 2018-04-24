<template>
  <div class="content">
    <div class="container-fluid">
      <card>
        <div slot="header" class="icon-danger">
          <h4 class="title">
            <i class="nc-icon nc-settings-90 text-success"></i>
            &nbsp;Settings
          </h4>
        </div>
        <!-- form -->
        <fg-input class="col-sm-6 col-12" v-model="settings.name" label="Name" disabled="" palceHolder="settings.name" type="text" aria-describedby="nameHelpInline">
          <small id="nameHelpInline" class="text-muted">
            Can not be changed.
          </small>
        </fg-input>
        <fg-input class="col-sm-6 col-12" v-model="settings.listSize" label="Waiting list size" placeholder="List size" value="settings.listSize" type="number" aria-describedby="listHelpInline">
          <small id="listHelpInline" class="text-muted">
            Set new size.<br>If left blank it will be set to 0.
          </small>
        </fg-input>
        <fg-input class="col-sm-6 col-12" v-model="settings.admin" label="Admin" placeholder="Admin email" value="settings.admin" type="mail" aria-describedby="adminHelpInline">
          <small id="adminHelpInline" class="text-muted">
            New mail.
          </small>
        </fg-input>
        <fg-input class="col-sm-6 col-12" v-model="settings.cancel" label="Cancel program" placeholder="Name of app" type="text" aria-describedby="cancelHelpInline">
          <small id="cancelHelpInline" class="text-muted">
            Enter the name of app for which you want cancel the program.
          </small>
        <button class="btn btn-danger" @click="removeApp">Delete</button>
        </fg-input>
        <div class="footer">
          <hr>
          <div style="float: right;">
            <button class="btn btn-primary" @click="saveSettings">Save</button>
            <button class="btn btn-reset" @click="resetSettings">Cancel</button>
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
        'currentApp',
        'currentUser'
      ])
    },
    data () {
      return {
        settings: {
          name: '',
          listSize: 50,
          admin: '',
          cancel: ''
        }
      }
    },
    created () {
      this.$store.subscribe( (mutation, state) => {
        if (mutation.type === 'CHANGEAPP') {
          this.settings.name = this.currentApp
          this.settings.admin = this.currentUser.mail
        }
      })
    },
    mounted () {
      this.settings.name = this.currentApp
      this.settings.admin = this.currentUser.mail
    },
    methods: {
      async saveSettings () {
        try {
          var endpoint = 'apps/' + this.settings.name

          var res = await this.$http.post(endpoint, {
            admin: this.settings.admin,
            listsize: this.settings.listSize
          })
          this.notifyVue('App was successfully updated.', 'success')
        } catch (err) {
          alert(err.message)
        }
      },
      resetSettings () {
        this.settings.listSize = 50
        this.settings.cancel = ''
      },
      async removeApp () {
        if (this.settings.name !== this.settings.cancel) {
          this.notifyVue('Name does not match with current app.', 'danger')
          this.resetSettings()
          return
        }
        try {
          var endpoint = 'apps/' + this.settings.name

          var res = await this.$http.delete(endpoint)
          this.notifyVue('App was successfully deleted. You have to log out and log in to take effect.', 'success')
          this.resetSettings()
        } catch (err) {
          alert(err.message)
        }
      },
      notifyVue(msg, colorType) {
        const notification = {
          template: `<span>${msg}.</span>`
        }
        this.$notify(
          {
            component: notification,
            icon: 'nc-icon nc-check-2',
            type: colorType
          })
      }
    }
  }

</script>
<style lang="scss">

</style>
