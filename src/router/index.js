import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/about',
		name: 'About',
		component: () => import('../views/About.vue')
	},
	{
		path: '/pageone',
		name: 'Pageone',
		component: () => import('../views/Pageone.vue')
	},
	{
		path: '/hello',
		name: 'Hello',
		component: () => import('../views/Hello.vue')
	},
	{
		path: '/classes',
		name: 'Classes',
		component: () => import('../views/Classes.vue')
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('../views/Login.vue')
	},
	{
		path: '/register',
		name: 'Register',
		component: () => import('../views/Register.vue')
	},
	{
		path: '/admin',
		name: 'Admin',
		component: () => import('../views/admin/Admin.vue'),
		children: [{
			path: '/userList',
			name: 'UserList',
			component: () => import('../views/admin/UserList.vue')
		},{
			path: '/scenicList',
			name: 'ScenicList',
			component: () => import('../views/admin/ScenicList.vue')
		},{
			path: '/blogList',
			name: 'BlogList',
			component: () => import('../views/admin/BlogList.vue')
		}]
	},
	{
		path: '/user',
		name: 'User',
		component: () => import('../views/User.vue')
	}
]


const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
