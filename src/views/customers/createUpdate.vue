<template>
  <app-view :title="pageTitle" size="medium">
    <template slot="content">
      <div class="items-center bg-white p-10 rounded">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="name">
              Name
            </label>
            <input id="name" v-model="$v.user.name.$model" :class="{'border-red-500': $v.user.name.$error}" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Full name">
            <p v-if="!$v.user.name.required" class="text-red-500 text-xs italic">Name is required</p>
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="email">
              Email
            </label>
            <input id="email" v-model="$v.user.email.$model" :class="{'border-red-500': $v.user.email.$error}" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Email">
            <p v-if="!$v.user.email.required" class="text-red-500 text-xs italic">Email is required</p>
            <p v-if="!$v.user.email.email" class="text-red-500 text-xs italic">Please enter a valid email</p>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="address">
              Address
            </label>
            <input id="address" v-model="$v.user.address.$model" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Address">
            <p v-if="!$v.user.address.required" class="text-red-500 text-xs italic">Address is required</p>
          </div>
          <div v-if="pageTitle==='New Customer'" class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="password">
              Password
            </label>
            <input id="password" v-model="$v.user.password.$model" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="password" placeholder="Password">
            <p v-if="!$v.user.password.required" class="text-red-500 text-xs italic">Password is required</p>
            <p v-if="!$v.user.password.minLength" class="text-red-500 text-xs italic">Minimum length is {{ $v.user.password.$params.minLength.min }}</p>
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
import Customer from 'Api/Customer'
import { required, minLength, email, requiredIf } from 'vuelidate/lib/validators'
export default {
  name: 'CustomerCreateUpdate',
  data() {
    return {
      user: {
        name: '',
        email: '',
        address: '',
        password: ''
      }
    }
  },
  validations: {
    user: {
      name: {
        required
      },
      email: {
        required,
        email
      },
      address: {
        required
      },
      password: {
        required: requiredIf(function() {
          return this.$route.name === 'CustomerCreate'
        }),
        minLength: minLength(6)
      }
    }
  },
  computed: {
    pageTitle() {
      return this.$route.name === 'CustomerCreate' ? 'New Customer' : 'Update Customer'
    }
  },
  mounted() {
    if (this.$route.params && this.$route.params.id) {
      this.Show(this.$route.params.id)
    }
  },
  methods: {
    handleSave() {
      this.$v.$touch()
      if (this.$v.user.$invalid) {
        return alert('Validation Error')
      } else {
        return this.$route.name === 'CustomerCreate' ? this.Store() : this.Update()
      }
    },
    Show(id) {
      const container = this.$refs.loadingContainer
      const loader = this.$loading.show({
        container: container || null,
        isFullPage: false
      })
      Customer.show(id).then(r => {
        if (r.code === 200) {
          this.user = r.data.customer
        }
        loader.hide()
      }).catch(() => {
        loader.hide()
      })
    },
    Store() {
      Customer.store(this.user).then(r => {
        if (r.code === 200) {
          this.$toast(r.message)
          this.$router.push({ name: 'Customers' })
        }
      })
    },
    Update() {
      Customer.update(this.user).then(r => {
        if (r.code === 200) {
          this.$toast(r.message)
          this.$router.push({ name: 'Customers' })
        }
      })
    }
  }
}
</script>
