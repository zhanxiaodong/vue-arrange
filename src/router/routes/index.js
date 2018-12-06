import user from './user'
import account from './account'
import baby from './baby'
import task from './task'
import order from './order'
import help from './help'
import msgCenter from './msg-center'
import trash from './trash'
import ui from './ui'
import appeal from './appeal'
import operation from './operation'

export default [
  ...user,
  ...account,
  ...baby,
  ...task,
  ...order,
  ...help,
  ...msgCenter,
  ...trash,
  ...ui,
  ...appeal,
  ...operation,
  {
    path: '/404',
    name: '404',
    component: () => import('@/pages/404/index.vue')
  },
  {
    path: '*',
    redirect: '/404'
  }
]
