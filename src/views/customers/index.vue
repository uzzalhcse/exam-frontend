<template>
  <app-view size="medium" title="Customers">
    <div slot="option">
      <app-button color="green" icon="h-plus" @click.native="$router.push({ name: 'CustomerCreate'})">New Customer</app-button>
    </div>
    <template slot="content">
      <section class="bg-white">
        <div ref="loadingContainer" class="align-middle inline-block min-w-full overflow-hidden rounded-lg">
          <table class="w-full divide-y divide-gray-200 stripe table-fixed">
            <thead>
              <tr>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-200 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                  Name
                </th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-200 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                  Email
                </th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-200 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                  Address
                </th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-200 text-right text-xs leading-4 font-medium uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="item in customer.data" :key="item.id">
                <td class="px-6 py-2 whitespace-no-wrap">
                  <div class="text-sm leading-5 text-gray-900">{{item.name}}</div>
                </td>
                <td class="px-6 py-2 whitespace-no-wrap">
                  <div class="text-sm leading-5 text-gray-900">{{item.email}}</div>
                </td>
                <td class="px-6 py-2 whitespace-no-wrap">
                  <div class="text-sm leading-5 text-gray-900">{{item.address}}</div>
                </td>
                <td class="px-6 py-2 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                  <button @click="$router.push({name: 'CustomerUpdate', params: { id: item.id }})" class="mx-1 font-bold h-8 w-8 justify-center rounded-full inline-flex items-center bg-green-300 hover:bg-green-400 text-green-800">
                    <svg-icon icon-class="h-pencil-alt"/>
                  </button>
                  <button class="mx-1 font-bold h-8 w-8 justify-center rounded-full inline-flex items-center bg-blue-400 hover:bg-blue-400 text-blue-800" @click="$router.push({name: 'BillCreate', params: { customer: item.id }})">
                    <svg-icon icon-class="h-clipboard-list"/>
                  </button>
                  <button class="mx-1 font-bold h-8 w-8 justify-center rounded-full inline-flex items-center bg-orange-300 hover:bg-orange-400 text-orange-800" @click="handleDelete(item.id)">
                    <svg-icon icon-class="h-trash"/>
                  </button>
                </td>
              </tr>

            <!-- More rows... -->
            </tbody>
          </table>
        </div>
      </section>
      <paginate
        :page-count="customer.last_page"
        :page-range="5"
        :margin-pages="1"
        :click-handler="index"
        :prev-text="'Prev'"
        :next-text="'Next'"
        active-class="bg-teal-300"
        prev-link-class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full outline-none"
        next-link-class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full outline-none"
        container-class="inline-flex items-center float-right mt-5"
        page-link-class="px-2 focus:outline-none"
        page-class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-2 mx-1 rounded-full focus:outline-none">
      </paginate>
    </template>
  </app-view>
</template>

<script>
import Customer from 'Api/Customer'
import AppButton from '@/components/AppButton'

export default {
  name: 'Customer',
  components: { AppButton },
  data() {
    return {
      pageIndex: 0,
      customer: {
        last_page: 10,
        data: []
      }
    }
  },
  created() {
    this.index()
  },
  methods: {
    index(page = 1) {
      this.pageIndex = page
      const container = this.$refs.loadingContainer
      const loader = this.$loading.show({
        container: container || null,
        isFullPage: false
      })
      Customer.index(page).then(r => {
        console.log(r)
        if (r.code === 200) {
          this.customer = r.data.customer
        }
        loader.hide()
      }).catch(e => {
        loader.hide()
      })
    },
    handleDelete(id) {
      if (confirm('This will permanently delete the item. Continue?')) {
        this.deleteCustomer(id)
      } else {
        this.$toast('Delete cancel')
      }
    },
    deleteCustomer(id) {
      Customer.delete(id).then(r => {
        if (r.code === 200) {
          this.$toast(r.message)
          this.index(this.pageIndex)
        }
      })
    }
  }
}
</script>
