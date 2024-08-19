import { createRouter, createWebHistory } from 'vue-router';
import ApplicantsFormView from '@/views/ApplicantsFormView.vue';
import ApplicantsListView from '@/views/ApplicantsListView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: ApplicantsListView
  },
  {
    path: '/applicants/create',
    name: 'applicantsCreate',
    component: ApplicantsFormView
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;