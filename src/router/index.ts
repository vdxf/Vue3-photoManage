import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: () => import('../views/main/MainView.vue'),
      children: [
        {
          path: 'home',
          name: 'HomeView',
          component: () => import('../views/home/HomeView.vue'),
          meta: { title: '主页' }
        },
        {
          path: 'main',
          name: 'UserView',
          component: () => import('../views/user/UserView.vue'),
          meta: { title: '我的' }
        }
      ]
    },
    {
      path: '/search',
      name: 'Search',
      component: () => import('@/views/home/SearchView.vue'),
      meta: { title: '搜索' }
    },
    {
      path: '/register',
      name: 'RegisterView',
      component: () => import('../views/auth/RegisterView.vue'),
      meta: { title: '注册' }
    },
    {
      path: '/retrieve',
      name: 'RetrievePassword',
      component: () => import('@/views/auth/RetrievePassword.vue'),
      meta: { title: '忘记密码' }
    },
    {
      path: '/login',
      name: 'LoginView',
      component: () => import('../views/auth/LoginView.vue'),
      meta: { title: '登录' }
    },
    {
      path: '/usercenter',
      name: 'UserCenter',
      redirect: '/usercenter/userhomeview',
      component: () => import('../views/user/UserCenter.vue'),
      meta: { title: '个人中心' },
      children: [
        {
          path: 'userhomeview',
          name: 'UserHomeview',
          component: () => import('@/views/user/UserHomeview.vue'),
          meta: { title: '个人中心主页' }
        },
        {
          path: 'usertrand',
          name: 'Trand',
          component: () => import('@/views/user/UserTrand.vue'),
          meta: { title: '个人中心动态' }
        },
        {
          path: 'usercollect',
          name: 'Collect',
          component: () => import('@/views/user/UserCollect.vue'),
          meta: { title: '个人中心收藏' }
        }
      ]
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('@/views/user/UserProfile.vue'),
      meta: { title: '编辑资料' }
    },
    {
      path: '/imagecreate',
      name: 'ImageCreate',
      component: () => import('../views/image/ImageCreate.vue'),
      meta: { title: '创建相片' }
    },
    {
      path: '/imagedetail',
      name: 'ImageDetail',
      component: () => import('../views/image/ImageDetail.vue'),
      meta: { title: '相片详情' }
    },
    {
      path: '/friend',
      name: 'FriendView',
      component: () => import('@/views/relation/FriendView.vue'),
      meta: { title: '我的好友' },
      children: [
        {
          path: 'follow',
          name: 'Follow',
          component: () => import('@/views/relation/FollowView.vue'),
          meta: { title: '我的关注' }
        },
        {
          path: 'fans',
          name: 'Fans',
          component: () => import('@/views/relation/FansView.vue'),
          meta: { title: '我的粉丝' }
        }
      ]
    },
    {
      path: '/setup',
      name: 'SetupView',
      component: () => import('@/views/setup/SetupView.vue'),
      meta: { title: '设置' }
    },
    {
      path: '/agreement',
      name: 'AgreementView',
      component: () => import('@/views/setup/AgreementView.vue'),
      meta: { title: '用户协议' }
    },
    {
      path: '/privacy',
      name: 'PrivacyView',
      component: () => import('@/views/setup/PrivacyView.vue'),
      meta: { title: '隐私政策' }
    },
    {
      path: '/help',
      name: 'HelpView',
      component: () => import('@/views/setup/HelpView.vue'),
      meta: { title: '查看帮助' }
    },
    {
      path: '/:pathMatch(.*)',
      name: 'error',
      component: () => import('@/views/NotFount.vue'),
      meta: { title: '404' }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = window.localStorage.getItem('token')

  if (token) {
    if (to.path === '/login') {
      // 已登录
      next('/')
    } else {
      next()
    }
  } else {
    // 未登录
    if (
      to.path !== '/home' &&
      to.path !== '/main' &&
      to.path !== '/login' &&
      to.path !== '/register' &&
      to.path !== '/retrieve' &&
      to.path !== '/privacy' &&
      to.path !== '/help' &&
      to.path !== '/agreement'
    ) {
      if (to.path === '/register') {
        next('/register')
      }
      next('/login')
    } else {
      next()
    }
  }
})
router.afterEach((to, from) => {
  const { title } = to.meta || {}
  document.title = title || '立减金'
})

export default router
