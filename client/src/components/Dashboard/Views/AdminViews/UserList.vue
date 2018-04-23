<template>
  <div class="content">
    <notifications></notifications>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <h4 class="card-title">Users</h4>
              <p class="card-category">Currecntly using your application.</p>
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
                    <button class="btn btn-icon btn-info" @click="handleEdit"><i class="fa fa-edit"></i></button>
                    <button class="btn btn-icon btn-danger" @click="handleDelete"><i class="fa fa-trash"></i></button>
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
            },
            {
              label: 'Used Invitations',
              field: 'used',
              type: 'number',
            },
            {
              label: 'Free Invitations',
              field: 'free',
              type: 'number',
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
        if (mutation.type === 'CHANGEAPP') {
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
          var url = 'http://localhost:8080/api/0/apps/'
                    + encodeURIComponent(appId)
                    +'/users'

          const response = await this.$http.get(url)
          var data = []
          response.data.forEach((user) => {
            data.push(user.value)
          })
          this.table.data = data
        } catch (e) {
          alert(e.message)
        }
      },
      async handleDelete(){
        try {
          var appId = await this.currentApp
          var users = this.getSelected()
          var baseUrl = 'http://localhost:8080/api/0/apps/'
            + encodeURIComponent(appId)
            +'/users/'

          var promises = []
          users.forEach(user => {
            let url = baseUrl + encodeURIComponent(user)
            let promise = this.$http.delete(url)
            promises.push(promise)
          })

          Promise.all(promises)
            .then(this.fetchUsers())
            .then(this.notifyVue('You successfully deleted user(s).'))
        } catch (e) {
          alert(e.message)
        }
      },
      async handleEdit(){
        try {
          var appId = await this.currentApp
          var users = this.getSelected()

          var newInvs = prompt('Enter new number of available invitations for user(s).')
          var baseUrl = 'http://localhost:8080/api/0/apps/'
            + encodeURIComponent(appId)
            +'/users/'
          var urlTail = '/newinvs/' + newInvs

          var promises = []
          users.forEach(user => {
            let url = baseUrl
                      + encodeURIComponent(user)
                      + urlTail
            let promise = this.$http.put(url)
            promises.push(promise)
          })

          Promise.all(promises)
            .then(this.fetchUsers())
            .then(this.notifyVue('Number of invitations was updated.'))
        } catch (e) {
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
<style>
</style>
