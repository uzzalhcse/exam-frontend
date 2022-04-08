<template>
  <app-view :title="pageTitle" size="medium">
    <template slot="content">
      <div class="items-center bg-white p-10 rounded">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="month">
              Month
            </label>
            <input id="month" v-model="$v.bill.bill_month.$model" :class="{'border-red-500': $v.bill.bill_month.$error}" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="03">
            <p v-if="!$v.bill.bill_month.required" class="text-red-500 text-xs italic">Month is required</p>
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="year">
              Year
            </label>
            <input id="year" v-model="$v.bill.bill_year.$model" :class="{'border-red-500': $v.bill.bill_year.$error}" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="2022">
            <p v-if="!$v.bill.bill_year.required" class="text-red-500 text-xs italic">Year is required</p>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="amount">
              Amount
            </label>
            <input id="amount" v-model="$v.bill.amount.$model" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="50.56">
            <p v-if="!$v.bill.amount.required" class="text-red-500 text-xs italic">Amount is required</p>
          </div>
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="status">
              Status
            </label>
            <select id="status" v-model="$v.bill.status.$model" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white">
              <option value="due">Due</option>
              <option value="paid">Paid</option>
            </select>
<!--            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Address">-->
            <p v-if="!$v.bill.status.required" class="text-red-500 text-xs italic">Status is required</p>
          </div>
        </div>
        <div class="flex justify-end py-2">
          <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-2 px-4 rounded" type="button" @click="handleSave">
            Save
          </button>
          <button class="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-2 px-4 rounded" type="button" @click="$router.back()">
            Cancel
          </button>
        </div>
      </div>
    </template>
  </app-view>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import Bill from 'Api/Bill'
export default {
  name: 'BillCreateUpdate',
  data() {
    return {
      bill: {
        customer_id: '',
        bill_month: '',
        bill_year: '',
        amount: '',
        status: 'due'
      }
    }
  },
  validations: {
    bill: {
      bill_month: {
        required
      },
      bill_year: {
        required
      },
      amount: {
        required
      },
      status: {
        required
      }
    }
  },
  computed: {
    pageTitle() {
      return this.$route.name === 'BillCreate' ? 'New Bill' : 'Update Bill'
    }
  },
  mounted() {
    if (this.$route.params && this.$route.params.id) {
      this.Show(this.$route.params.id)
    }
    if (this.$route.params && this.$route.params.customer) {
      this.bill.customer_id = this.$route.params.customer
    }
  },
  methods: {
    handleSave() {
      this.$v.$touch()
      if (this.$v.bill.$invalid) {
        return alert('Validation Error')
      } else {
        return this.$route.name === 'BillCreate' ? this.Store() : this.Update()
      }
    },
    Show(id) {
      const container = this.$refs.loadingContainer
      const loader = this.$loading.show({
        container: container || null,
        isFullPage: false
      })
      Bill.show(id).then(r => {
        if (r.code === 200) {
          this.bill = r.data.bill
        }
        loader.hide()
      }).catch(() => {
        loader.hide()
      })
    },
    Store() {
      const container = this.$refs.loadingContainer
      const loader = this.$loading.show({
        container: container || null,
        isFullPage: false
      })
      Bill.store(this.bill).then(r => {
        if (r.code === 200) {
          this.$toast(r.message)
          this.$router.push({ name: 'Bills' })
        }
        loader.hide()
      }).catch(() => {
        loader.hide()
      })
    },
    Update() {
      Bill.update(this.bill).then(r => {
        if (r.code === 200) {
          this.$toast(r.message)
          this.$router.push({ name: 'Bills' })
        }
      })
    }
  }
}
</script>
