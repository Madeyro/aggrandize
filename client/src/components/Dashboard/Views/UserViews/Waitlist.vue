<template>
<div class="content">
  <notifications></notifications>
  <div class="container-fluid">
    <card>
      <template slot="header">
        <h4 class="card-title">Waiting list</h4>
        <p class="card-category">Add yourself to waiting list.</p>
      </template>
      <div class="table-responsive">
        <div>
          <vue-good-table ref="listTable"
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
              <button class="btn btn-icon btn-info" @click="handleSelected('add')" data-toggle="tooltip" data-placement="top" title="Add me to waiting list">
                <i class="nc-icon nc-tap-01">
              </i></button>
              <button class="btn btn-icon btn-danger" @click="handleSelected('remove')" data-toggle="tooltip" data-placement="top" title="Remove me from waiting list">
                <i class="nc-icon nc-simple-remove"></i>
                </button>
            </div>
          </vue-good-table>
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
        'currentUser'
      ])
    },
    data () {
      return {
        table: {
          data: [],
          columns: [
            {
              label: 'App',
              field: 'name',
              type: 'text',
              filterOptions: {
                enabled: true,
              },
            },
            {
              label: 'Free space',
              field: 'freeSlots',
              type: 'number',
            },
            {
              label: 'Applied',
              field: 'applied',
              type: 'boolean',
            }
          ]
        },
      }
    },
    created () {
      this.fetchListOccupation()
    },
    methods: {
      async fetchListOccupation () {
        try {
          var url = 'users/' + this.currentUser.mail + '/waitlists/'

          var res = await this.$http.get(url)
          this.table.data = res.data
        } catch (err) {
          console.log(err)
        }
      },
      handleSelected(action) {
        try {
          var lists = this.getSelected()

          var endpoint = 'apps/'
          var urlTail = '/waitlist/'
                        + encodeURIComponent(this.currentUser.mail)

          var promises = []
          lists.forEach(list => {
            let url = endpoint
                      + encodeURIComponent(list)
                      + urlTail
            let promise
            if (action === 'add') {
              promise = this.$http.put(url)
            } else {
              promise = this.$http.delete(url)
            }
            promises.push(promise)
          })

          let msg
          if (action === 'add') {
            msg = 'You have been added where it was possible.'
          } else {
            msg = 'You have been removed from selected lists.'
          }

          Promise.all(promises)
            .then(this.fetchListOccupation())
            .then(this.notifyVue(msg))
        } catch (e) {
          console.log(e)

          alert(e.message)
        }
      },
      getSelected() {
        var lists = []
        this.$refs['listTable'].selectedRows.forEach(list => {
          lists.push(list.name)
        })
        return lists
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
