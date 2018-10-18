import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/components/home').default,
      children: [
        {
          path: '/menu',
          name: 'menu',
          component: require('@/components/menu').default
        },
        {
          path: '/snippet',
          name: 'snippet',
          component: require('@/components/snippet/index').default
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
