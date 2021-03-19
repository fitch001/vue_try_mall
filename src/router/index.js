import {
  createRouter,
  createWebHistory
} from 'vue-router'

const home = () => import("views/home/home.vue")
const category = () => import("views/category/category.vue")
const shopcart = () => import("views/shopcart/shopcart.vue")
const profile = () => import("views/profile/profile.vue")
const Detail = () => import("views/detail/Detail.vue")


const routes = [{
    path: '',
    redirect: "/home"
  },
  {
    path: '/home',
    component: home
  },
  {
    path: '/category',
    component: category
  },
  {
    path: '/shopcart',
    component: shopcart
  },
  {
    path: '/profile',
    component: profile
  },
  {
    path: '/Detail/:iid',
    component: Detail
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
