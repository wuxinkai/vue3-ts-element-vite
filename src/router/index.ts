import { createRouter, createWebHashHistory, RouteRecordRaw, RouterOptions } from "vue-router";
import Layout from '@/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: Layout,
        redirect: 'index',
        meta: {
            hidden: true
        },
        children: [{
            path: 'index',
            name: 'index',
            meta: {
                title: '首页',
                icon: '',
                keepalive: false
            },
            component: () => import('@/views/bases/index.vue'),
        }, {
            path: '/iconChoose',
            name: 'iconChoose',
            meta: {
                title: '图标选择器',
                icon: '',
                keepalive: false
            },
            component: () => import('@/views/iconChoose/IconChoose.vue'),
        }, {
            path: '/chooseArea',
            name: 'chooseArea',
            meta: {
                title: '三级联动',
                icon: '',
                keepalive: false
            },
            component: () => import('@/views/chooseArea/ChooseArea.vue'),
        }, {
            path: '/trentViews',
            name: 'trentViews',
            meta: {
                title: '趋势标记' ,
                icon: '',
                keepalive: false
            },
            component: () => import('@/views/trent/trentViews.vue'),
        }, {
            path: '/notification',
            name: 'notification',
            meta: {
                title: '趋势标记' ,
                icon: '',
                keepalive: false
            },
            component: () => import('@/views/notification/notification.vue'),
        }, {
            path: '/menu',
            name: 'menu',
            meta: {
                title: '趋势标记' ,
                icon: '',
                keepalive: false
            },
            component: () => import('@/views/menu/menu.vue'),
        }, {
            path: '/progress',
            name: 'progress',
            meta: {
                title: '进度条' ,
                icon: '',
                keepalive: false
            },
            component: () => import('@/views/progress/progress.vue'),
        }]
    }
]


const routerParams: RouterOptions = {
    history: createWebHashHistory(),
    routes,
    scrollBehavior() {
        return { left: 0, top: 0 }
    }
}

const router = createRouter(routerParams)


// 去除重复路由报错的问题
const originalPush = router.push

router.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err)
}

export function resetRouter() {
    const newRouter = createRouter(routerParams)
    router.resolve = newRouter.resolve
}


export default router;