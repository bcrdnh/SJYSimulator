import { createRouter, createWebHashHistory } from "vue-router"
import starter from './../components/Starter.vue'
import DefaultDaram from './../components/DefaultDaram.vue'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/starter',
      component: starter
    },
    {
      path: '/defaultDaram',
      component: DefaultDaram
    },
    {
      path: '/SJYStoryEnter',
      component: () => import('../components/SJYStory/SJYStoryEnter.vue')
    },
    {
      path: '/SJYStory',
      component: () => import('../components/SJYStory/SJYStory.vue')
    },
  ]
})
