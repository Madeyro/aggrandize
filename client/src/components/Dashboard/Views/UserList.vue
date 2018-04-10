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
  import axios from 'axios'

  export default {
    components: {
      LTable,
      Card
    },
    // Fetches users
    async created() {
      try {
        const response = await axios.get(`http://localhost:8080/api/0/users`)
        this.table.data = response.data.rows[0].value
        this.table.columns = Object.keys(response.data.rows[0].value[0])
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

</script>
<style>
</style>
