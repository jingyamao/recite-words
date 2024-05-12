import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/Home",
      name: "Home",
      component: () => import('../views/index.vue'),
      children: [
        {
          path: "/home",
          name: "home",
          component: () => import('../views/Home/index.vue'),
        },
        {
          path: "error",
          name: "error",
          component: () => import('../views/error/index.vue'),
        },
        {
          path: "word_book",
          name: "word_book",
          component: () => import('../views/word_book/index.vue')
        },
        {
          path: "word_test",
          name: "word_test",
          component: () => import('../views/word_test/index.vue')
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: () => import('../views/login/index.vue')
    },
  ]
})

export default router
