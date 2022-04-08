<template>
  <app-view size="medium" title="My Bills">
    <div slot="option">
      <select v-model="filterBy" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white">
        <option :value="null">Select filter</option>
        <option value="due">Due</option>
        <option value="paid">Paid</option>
      </select>    </div>
    <template slot="content">
      <section class="bg-white">
        <div ref="loadingContainer" class="align-middle inline-block min-w-full overflow-hidden rounded-lg">
          <table class="w-full divide-y divide-gray-200 stripe table-fixed">
            <thead>
              <tr>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-200 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                  Month
                </th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-200 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                  Year
                </th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-200 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                  Amount
                </th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-200 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="item in filteredItems" :key="item.id">
                <td class="px-6 py-2 whitespace-no-wrap">
                  <div class="text-sm leading-5 text-gray-900">{{item.bill_month}}</div>
                </td>
                <td class="px-6 py-2 whitespace-no-wrap">
                  <div class="text-sm leading-5 text-gray-900">{{item.bill_year}}</div>
                </td>
                <td class="px-6 py-2 whitespace-no-wrap">
                  <div class="text-sm leading-5 text-gray-900">{{item.amount}}</div>
                </td>
                <td class="px-6 py-2 whitespace-no-wrap">
                  <div class="text-sm leading-5 text-gray-900">{{item.status}}</div>
                </td>
              </tr>

            <!-- More rows... -->
            </tbody>
          </table>
        </div>
      </section>
      <paginate
        :page-count="bill.last_page"
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
import Bill from 'Api/Bill'
import _ from 'lodash'

export default {
  name: 'Bill',
  data() {
    return {
      pageIndex: 0,
      filterBy: null,
      bill: {
        last_page: 10,
        data: []
      }
    }
  },
  computed: {
    filteredItems() {
      if (this.filterBy) {
        return _.filter(this.bill.data, { status: this.filterBy })
      }
      return this.bill.data
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
      Bill.myBills(page).then(r => {
        if (r.code === 200) {
          this.bill = r.data.bill
        }
        loader.hide()
      }).catch(e => {
        loader.hide()
      })
    }
  }
}
</script>
