<template>
  <div class="content">
    <notifications></notifications>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <h4 class="card-title">Waiting list</h4>
              <p class="card-category">Users who applied to waiting list.</p>
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
                  <div slot="table-actions">
                    <button class="btn btn-icon btn-success" @click="handleAdd" data-toggle="tooltip" data-placement="top" title="Add users from waiting list to your app.">
                      <i class="fa fa-plus-circle"></i>
                    </button>
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
  import LTable from 'src/components/UIComponents/Table.vue'
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      LTable,
      Card
    },
    computed: {
      ...mapGetters([
        'currentApp'
      ])
    },
    data () {
      return {
        table: {
          data: [],
          columns: [
            {
              label: 'Email',
              field: 'id',
              filterOptions: {
                enabled: true,
              },
            }
          ]
        },
        notifications: {
          topCenter: true
        }
      }
    },
    created() {
      this.$store.subscribe( (mutation, state) => {
        if (mutation.type === 'CHANGEAPP' || mutation === 'SETADMINBOARD') {
          this.fetchUsers()
        }
      })
    },
    mounted() {
      this.fetchUsers()
    },
    methods: {
      async fetchUsers() {
        try {
          var appId = await this.currentApp
          var endpoint = 'apps/'
                        + encodeURIComponent(appId)
                        +'/waitlist'

          const response = await this.$http.get(endpoint)
          var data = []

          response.data.value.users.forEach((user) => {
            data.push({id: user})
          })
          this.table.data = data
        } catch (e) {
          console.log(e)

          alert(e.message)
        }
      },
      async handleAdd(){
        try {
          var appId = await this.currentApp
          var users = this.getSelected()

          var endpoint = 'apps/'
                        + encodeURIComponent(appId)
                        +'/waitlist/acceptselected'

          this.$http.post(endpoint, {
            users: users
          })
            .then(this.fetchUsers())
            .then(this.notifyVue('Selected users were added.'))
        } catch (e) {
          console.log(e)

          alert(e.message)
        }
      },
      getSelected() {
        var users = []
        this.$refs['userTable'].selectedRows.forEach(user => {
          users.push(user.id)
        })
        return users
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
