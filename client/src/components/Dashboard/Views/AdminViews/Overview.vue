<template>
  <div class="content">
    <notifications></notifications>
    <div class="container-fluid">

      <div class="row">
        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-primary">
              <i class="nc-icon nc-single-02 text-primary"></i>
            </div>
            <div slot="content">
              <p class="card-category">Users</p>
              <h4 class="card-title">{{ userCount }}</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-history"></i> Updated 3 minutes ago
            </div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-send text-warning"></i>
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

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-danger">
              <i class="nc-icon nc-watch-time text-danger"></i>
            </div>
            <div slot="content">
              <p class="card-category">Waitling list occupation</p>
              <h4 class="card-title">{{ waitlistOccupied }}</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-history"></i> Updated 3 minutes ago
            </div>
          </stats-card>
        </div>
      </div>

      <div class="row">
        <div class="col-md-7">
          <chart-card :chart-data="lineChart.data"
                      :chart-options="lineChart.options"
                      :responsive-options="lineChart.responsiveOptions">
            <template slot="header">
              <h4 class="card-title">Users Behavior</h4>
              <p class="card-category">24 Hours performance</p>
            </template>
            <template slot="footer">
              <div class="legend">
                <i class="fa fa-circle text-info"></i> Open
                <i class="fa fa-circle text-danger"></i> Click
                <i class="fa fa-circle text-warning"></i> Click Second Time
              </div>
              <hr>
              <div class="stats">
                <i class="fa fa-history"></i> Updated 3 minutes ago
              </div>
            </template>
          </chart-card>
        </div>

        <div class="col-md-5">
          <chart-card :chart-data="pieChart.data" chart-type="Pie">
            <template slot="header">
              <h4 class="card-title">Email Statistics</h4>
              <p class="card-category">Last Campaign Performance</p>
            </template>
            <template slot="footer">
              <div class="legend">
                <i class="fa fa-circle text-info"></i> Open
                <i class="fa fa-circle text-danger"></i> Bounce
                <i class="fa fa-circle text-warning"></i> Unsubscribe
              </div>
              <hr>
              <div class="stats">
                <i class="fa fa-clock-o"></i> Campaign sent 2 days ago
              </div>
            </template>
          </chart-card>
        </div>
      </div>



      <div class="row">
        <div class="col-md-6">
          <card>
            <div slot="header" class="icon-info">
              <h4 class="title">
                <i class="nc-icon nc-app text-info"></i>
                &nbsp;Start new program
              </h4>
            </div>
            <!-- form -->
            <fg-input class="col-sm-6 col-12" v-model="appForm.name" label="Name" placeholder="Name" value="" type="text" aria-describedby="nameHelpInline">
              <small id="nameHelpInline" class="text-muted">
                Must be unique.
              </small>
            </fg-input>
            <fg-input class="col-sm-6 col-12" v-model="appForm.listSize" label="Waitling list size" placeholder="List size" value="50" type="number" aria-describedby="listHelpInline">
              <small id="listHelpInline" class="text-muted">
                Must specify. If left blank it will be set to 0.
              </small>
            </fg-input>
            <div class="footer">
              <hr>
              <div style="float: right;">
                <button class="btn btn-primary" @click="addApp">Submit</button>
                <button class="btn btn-reset" @click="clearAppForm">Clear</button>
              </div>
            </div>
          </card>
        </div>

        <div class="col-md-6">
          <card>
            <div slot="header" class="icon-danger">
              <h4 class="title">
                <i class="nc-icon nc-circle-09 text-danger"></i>
                &nbsp;Add new user
              </h4>
            </div>
            <!-- form -->
            <fg-input class="col-sm-6 col-12" v-model="userForm.mail" label="Email" placeholder="Email" value="" type="mail">
            </fg-input>
            <fg-input class="col-sm-6 col-12" v-model="userForm.invs" label="Available invitations" placeholder="Number of invitations" value="10" type="number" aria-describedby="invHelpInline">
              <small id="invHelpInline" class="text-muted">
                Optional.<br>If left blank it will be set to 0.
              </small>
            </fg-input>
            <div class="footer">
              <hr>
              <div style="float: right;">
                <button class="btn btn-primary" @click="addUser">Submit</button>
                <button class="btn btn-reset" @click="clearUserForm">Clear</button>
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
        pieChart: {
          data: {
            labels: ['40%', '20%', '40%'],
            series: [40, 20, 40]
          }
        },
        lineChart: {
          data: {
            labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
            series: [
              [287, 385, 490, 492, 554, 586, 698, 695],
              [67, 152, 143, 240, 287, 335, 435, 437],
              [23, 113, 67, 108, 190, 239, 307, 308]
            ]
          },
          options: {
            low: 0,
            high: 800,
            showArea: false,
            height: '245px',
            axisX: {
              showGrid: false
            },
            lineSmooth: true,
            showLine: true,
            showPoint: true,
            fullWidth: true,
            chartPadding: {
              right: 50
            }
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              axisX: {
                labelInterpolationFnc (value) {
                  return value[0]
                }
              }
            }]
          ]
        },
        userCount: 0,
        sentInvs: 0,
        freeInvs: 0,
        waitlistOccupied: 0,
        appForm: {
          name: '',
          listSize: 50
        },
        userForm: {
          mail: '',
          invs: 10
        }
      }
    },
    created () {
      this.$store.subscribe( async (mutation, state) => {
        if (mutation.type === 'CHANGEAPP' || mutation.type === 'SETADMINBOARD') {
          this.fetchUserCount()
          this.fetchSentInvs()
          this.fetchFreeInvs()
          this.fetchListOccupation()
          }
      })
    },
    mounted () {
      this.fetchUserCount()
      this.fetchSentInvs()
      this.fetchFreeInvs()
      this.fetchListOccupation()
    },
    methods: {
      async fetchUserCount () {
        try {
          var appId = await this.currentApp

          var endpoint = 'apps/'
                    + encodeURIComponent(appId)
                    +'/users/count'

          const res = await this.$http.get(endpoint)
          this.userCount = res.data
        } catch (err) {
          console.log(err)
        }
      },
      async fetchSentInvs () {
        try {
          var appId = await this.currentApp
          var endpoint = 'apps/'
                    + encodeURIComponent(appId)
                    +'/invs/sent'

          const res = await this.$http.get(endpoint)
          this.sentInvs = res.data
        } catch (err) {
          console.log(err)
        }
      },
      async fetchFreeInvs () {
        try {
          var appId = await this.currentApp
          var endpoint = 'apps/'
                    + encodeURIComponent(appId)
                    +'/invs/available'

          const res = await this.$http.get(endpoint)
          this.freeInvs = res.data
        } catch (err) {
          console.log(err)
        }
      },
      async fetchListOccupation () {
        try {
          var appId = await this.currentApp
          var endpoint = 'apps/'
                    + encodeURIComponent(appId)
                    +'/waitlist/'

          var occupied = await this.$http.get(endpoint + 'occupied')
          var size = await this.$http.get(endpoint + 'size')
          if (occupied === 0) {
            this.waitlistOccupied = 0
          } else {
            this.waitlistOccupied = +((occupied.data * 100) / size.data).toFixed(2) + ' %'
          }
        } catch (err) {
          console.log(err)
        }
      },
      async addApp () {
        try {
          var appId = await this.currentApp
          var user = this.currentUser
          var endpoint = 'apps/'

          var res = await this.$http.put(endpoint, {
            id: this.appForm.name,
            admin: user.mail,
            listsize: this.appForm.listSize
          })
          this.notifyVue('App was successfully added.')
          this.clearAppForm()
        } catch (err) {
          console.log(err)

          alert(err.message)
        }
      },
      clearAppForm () {
        this.appForm.name = ''
        this.appForm.listSize = 50
      },
      async addUser () {
                try {
          var appId = await this.currentApp
          var endpoint = 'apps/'
                    + encodeURIComponent(appId)
                    + '/users/'
                    + this.userForm.mail

        var res = await this.$http.put(endpoint, {
          listsize: this.appForm.listSize
        })
        this.notifyVue('User was successfully added.')
        this.clearUserForm()
        } catch (err) {
          console.log(err)
        }
      },
      clearUserForm () {
        this.userForm.mail = ''
        this.userForm.invs = 10
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
