<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <h4 class="card-title">Users</h4>
              <p class="card-category">Currecntly using your application.</p>
            </template>
            <div class="table-responsive">
              <l-table class="table-hover table-striped"
                       :columns="table.columns"
                       :data="table.data"
                       :headings="table.headings">
              </l-table>
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
          columns: [],
          data: [],
          headings: [...tableHeadings],
          keys: []
        }
      }
    },
    created() {
      this.fetchUsers()
    },
    updated() {
      this.fetchUsers()
    },
    methods: {
      async fetchUsers() {
        try {
          var appId = await this.currentApp
          var url = 'http://localhost:8080/api/0/apps/' + encodeURIComponent(appId) +'/users'

          const response = await this.$http.get(url)
          var data = []
          for (var i in response.data) {
            data[data.length] = response.data[i].value
          }
          this.table.data = data
          this.table.columns = Object.keys(data[0])
        } catch (e) {
          // this.errors.push(e)
          console.log(e)

        }
      }
    }
  }

  const tableHeadings = ['Mail', 'Used Invitations' ,'Free Invitations']
</script>
<style>
</style>
