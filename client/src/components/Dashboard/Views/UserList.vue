<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <template slot="header">
              <h4 class="card-title">Striped Table with Hover</h4>
              <p class="card-category">Here is a subtitle for this table</p>
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

  export default {
    components: {
      LTable,
      Card
    },
    // Fetches users
    async created() {
      try {
        const response = await this.$http.get(`http://localhost:8080/api/0/apps/Test%20App/users`)
        var data = []
        for (var i in response.data.data) {
          data[data.length] = response.data.data[i].value
        }
        this.table.data = data
        this.table.columns = Object.keys(data[0])
      } catch (e) {
        this.errors.push(e)
      }
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
    }
  }

  const tableHeadings = ['Mail', 'Used Invitations' , 'Free Invitations']


  // import userService from '@/services/userService'
  // export default {
  //   name: 'posts',
  //   data () {
  //     return {
  //       posts: []
  //     }
  //   },
  //   mounted () {
  //     this.getUsers()
  //   },
  //   methods: {
  //     async getUsers () {
  //       const response = await userService.fetchUsers()
  //       this.posts = response.data.data
  //     }
  //   }
  // }

</script>
<style>
</style>
