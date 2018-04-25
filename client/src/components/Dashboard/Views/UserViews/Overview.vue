<template>
  <div class="content">
    <notifications></notifications>
    <div class="container-fluid">

      <div class="row">
        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-primary">
              <i class="nc-icon nc-send text-primary"></i>
            </div>
            <div slot="content">
              <p class="card-category">Sent invites</p>
              <h4 class="card-title">{{ sentInvs }}</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-history"></i> Updated 3 minutes ago
            </div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-success">
              <i class="nc-icon nc-email-83 text-success"></i>
            </div>
            <div slot="content">
              <p class="card-category">Available invites</p>
              <h4 class="card-title">{{ freeInvs }}</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-history"></i> Updated 3 minutes ago
            </div>
          </stats-card>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <card>
            <div slot="header" class="icon-info">
              <h4 class="title">
                <i class="nc-icon nc-notification-70 text-info"></i>
                &nbsp;Invite friend
              </h4>
            </div>
            <!-- form -->
            <fg-input class="col-sm-6 col-12" v-model="invForm.mail" label="Email" placeholder="Email" value="" type="email" aria-describedby="mailHelpInline">
              <small id="mailHelpInline" class="text-muted">
                Invitation will be send to this email.
              </small>
            </fg-input>
            <div class="footer">
              <hr>
              <div style="float: right;">
                <button class="btn btn-primary" @click="sendInv">Send</button>
                <button class="btn btn-reset" @click="clearForm">Clear</button>
              </div>
            </div>
          </card>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <card>
            <template slot="header">
              <h4 class="card-title">Invited users</h4>
              <p class="card-category">You already invited these users.</p>
            </template>
            <div class="table-responsive">
              <div>
                <vue-good-table ref="userTable"
                  :columns="table.columns"
                  :rows="table.data"
                  :search-options="{
                    enabled: true,
                  }"
                  :pagination-options="{
                    enabled: true,
                    perPage: 5,
                  }"
                  :select-options="{
                    enabled: true,
                    selectionInfoClass: 'custom-class',
                    selectionText: 'rows selected',
                    clearSelectionText: 'clear',
                  }"
                  styleClass="vgt-table striped boxed">
                  <div slot="emptystate">
                    Nothing to show :(
                  </div>
                </vue-good-table>
              </div>
            </div>
          </card>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  import ChartCard from 'src/components/UIComponents/Cards/ChartCard.vue'
  import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      Card,
      ChartCard,
      StatsCard
    },
    computed: {
      ...mapGetters([
        'currentApp',
        'currentUser'
      ])
    },
    data () {
      return {
        sentInvs: 0,
        freeInvs: 0,
        invForm : {
          mail: ''
        },
        table: {
          data: [],
          columns: [
            {
              label: 'Email',
              field: 'mail',
              filterOptions: {
                enabled: true,
              },
            }
          ]
        },
      }
    },
    created() {
      this.$store.subscribe( (mutation, state) => {
        if (mutation.type === 'CHANGEAPP' || mutation === 'SETUSERBOARD') {
          this.fetchUsers()
          this.fetchInvStats()
        }
      })
    },
    mounted () {
      this.fetchUsers()
      this.fetchInvStats()
    },
    methods: {
      async fetchUsers () {
        try {
          var endpoint = 'users/'
                        + encodeURIComponent(this.currentUser.mail)
                        +'/sentinvs'

          const response = await this.$http.get(endpoint)

          var data = []
          response.data.forEach((inv) => {

            if (inv.value.app === this.currentApp) {
              data.push({
                "mail": inv.value.recipient
              })
            }
          })
          this.table.data = data
        } catch (e) {
          console.log(e)

          alert(e.message)
        }
      },
      async fetchInvStats () {
        try {
          var endpoint = 'users/'
                        + encodeURIComponent(this.currentUser.mail)

          var res = await this.$http.get(endpoint)
          var user = res.data

          for (let i in user.apps) {
            if (user.apps[i].id === this.currentApp) {
              this.sentInvs = user.apps[i].used_inv
              this.freeInvs = user.apps[i].free_inv
            }
          }
        } catch (err) {
          console.log(err)
        }
      },
      async sendInv () {
        try {
          var endpoint = 'users/'
                        + encodeURIComponent(this.currentUser.mail) + '/'
                        + encodeURIComponent(this.currentApp) + '/'
                        + 'sendinv/'
                        + encodeURIComponent(this.invForm.mail)

          var res = await this.$http.put(endpoint)

          // send this link to mail
          console.log(res.data.url)

          this.clearForm()
          this.fetchInvStats()
          this.fetchUsers()
          this.notifyVue('Invite was sent.')
        } catch (err) {
          console.log(err)
          alert(err.message)
        }
      },
      clearForm () {
        this.invForm.mail = ''
      },
      notifyVue(msg) {
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
