import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Index from '../views/index/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: Index,
    meta: {
      title: 'template'
    }
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.afterEach((to, from) => {
	if (to.meta) {
		document.title =(to.meta.title as string)
	}
});

export default router
