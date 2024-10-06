import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '../src/components/LoginForm.vue';
import Home from '../src/components/Home.vue';
import RegisterForm from '../src/components/RegisterForm.vue';
import ForgotPasswordForm from '../src/components/ForgotPasswordForm.vue';
import ResetPasswordForm from '../src/components/ResetPasswordForm.vue';

const routes = [
    { path: '/', name: '', component: LoginForm },
    { path: '/login', name: 'login', component: LoginForm },
    { path: '/register', name: 'register', component: RegisterForm },
    { path: '/forgot-password', name: 'forgot-password', component: ForgotPasswordForm },
    { path: '/reset-password', name: 'reset-password', component: ResetPasswordForm },
    { 
      path: '/home', 
      name: 'home', 
      component: Home, 
      meta: { requiresAuth: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token'); 
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login'); 
  } else {
    next(); 
  }
})

export default router;
