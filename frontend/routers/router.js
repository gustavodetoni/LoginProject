import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '../src/components/LoginForm.vue'
import Home from '../src/components/Home.vue'

const routes =[
    { path: '/login', component: LoginForm },
    { path: '/home', component: Home }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;