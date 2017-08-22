import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Set from '@/views/Set'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },{
      path: '/set',
      name: 'Set',
      component: Set
    }

  ]
})
