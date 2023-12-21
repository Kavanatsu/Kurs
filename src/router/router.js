import {createRouter, createWebHistory} from "vue-router"
import Main from '@/pages/Main'
import Articles from '@/pages/Articles'
import ArticlePage from '@/pages/ArticlePage'
import About from '@/pages/About'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Personal from '@/pages/Personal'

const routes = [
    {
        path:'/',
        component: Main,
    },
    {
        path:'/articles',
        component: Articles,
    },
		{
			path:'/articles/:id',
			component: ArticlePage,
		},
    {
        path:'/about',
        component: About,
    },
		{
			path:'/login',
			component: Login,
		},
		{
			path:'/register',
			component: Register,
		},
		{
			path:'/personal',
			component: Personal,
		},
]

const router = createRouter({
    mode: 'history',
    history: createWebHistory(process.env.BASE_URL),
    routes,
  })

export default router