import Vue from 'vue'
import Layout from '../views/layout'
import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

export const publicRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('Views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('Views/auth/login'),
    hidden: true
  },
  {
    path: '/customer-login',
    component: () => import('Views/auth/login'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('Views/auth/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('Views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('Views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: {
      title: 'Dashboard',
      icon: 'f-home'
    },
    children: [
      {
        path: 'dashboard',
        component: () => import('Views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'h-home', affix: true }
      }
    ]
  },
]
export const privateRoutes = [
  {
    path: '/customers',
    component: Layout,
    redirect: '/customers',
    meta: {
      title: 'Customers',
      icon: 'f-trending-up',
      roles: ['admin']
    },
    children: [
      {
        path: '',
        component: () => import('Views/customers'),
        name: 'Customers',
        meta: { title: 'Customers', icon: 'f-users', affix: true }
      },
      {
        path: '/customer/create',
        component: () => import('Views/customers/createUpdate'),
        name: 'CustomerCreate',
        hidden: true,
        meta: { title: 'Customer Create' }
      },
      {
        path: '/customer/update/:id',
        component: () => import('Views/customers/createUpdate'),
        name: 'CustomerUpdate',
        hidden: true,
        meta: { title: 'Customer Update' }
      }
    ]
  },
  {
    path: '/bills',
    component: Layout,
    redirect: '/bills',
    meta: {
      title: 'Bills',
      icon: 'f-trending-up',
      roles: ['admin']
    },
    children: [
      {
        path: '',
        component: () => import('Views/bills'),
        name: 'Bills',
        meta: { title: 'Bills', icon: 'f-file', affix: true }
      },
      {
        path: '/bill/:customer/create',
        component: () => import('Views/bills/createUpdate'),
        name: 'BillCreate',
        hidden: true,
        meta: { title: 'Bill Create' }
      },
      {
        path: '/bill/update/:id',
        component: () => import('Views/bills/createUpdate'),
        name: 'BillUpdate',
        hidden: true,
        meta: { title: 'Bill Update' }
      }
    ]
  },
  {
    path: '/my-bills',
    component: Layout,
    redirect: '/my-bills',
    meta: {
      title: 'My Bills',
      icon: 'f-trending-up',
      roles: ['customer']
    },
    children: [
      {
        path: '',
        component: () => import('Views/bills/my-bills'),
        name: 'MyBills',
        meta: { title: 'My Bills', icon: 'f-file', affix: true }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
const createRouter = () => new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: publicRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
