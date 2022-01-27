import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'

const Login = () => import('@/views/Login')
const Layout = () => import('@/views/Layout')
const Index = () => import('@/views/Index')
const UserManagement = () => import('@/views/UserManagement')
const RoleManagement = () => import('@/views/RoleManagement')
const ArticleManagement = () => import('@/views/ArticleManagement')
const CategoryManagement = () => import('@/views/CategoryManagement')
const TagManagement = () => import('@/views/TagManagement')
const Error = () => import('@/views/Error')

export const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: { title: '登录' },
    },
    {
        path: '/',
        redirect: '/index',
        component: Layout,
        children: [
            {
                path: '/index',
                name: 'index',
                component: Index,
                meta: { title: '首页' },
            },
            {
                path: '/user-management',
                name: 'user-management',
                component: UserManagement,
                meta: { title: '用户管理' },
            },
            {
                path: '/role-management',
                name: 'role-management',
                component: RoleManagement,
                meta: { title: '角色列表' },
            },
            {
                path: '/article-management',
                name: 'article-management',
                component: ArticleManagement,
                meta: { title: '角色列表' },
            },
            {
                path: '/category-management',
                name: 'category-management',
                component: CategoryManagement,
                meta: { title: '角色列表' },
            },
            {
                path: '/tag-management',
                name: 'tag-management',
                component: TagManagement,
                meta: { title: '角色列表' },
            },
        ],
    },
    {
        path: '/:pathMatch(.*)',
        name: 'error',
        component: Error,
        meta: { title: '404' },
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

/**
 * 全局路由守卫
 */
router.beforeEach((to, from, next) => {
    if (store.getters.token) {
        if (to.path === '/login') {
            next('/index')
        } else {
            next()
        }
        next()
    } else {
        if (to.path === '/login') {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
        }
    }
    document.title = to.meta.title
    next()
})

export default router
