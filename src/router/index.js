import { createRouter, createWebHistory } from 'vue-router';
import ApplicantsFormView from '@/views/ApplicantsFormView.vue';
import ApplicantsListView from '@/views/ApplicantsListView.vue';
import EditViewForm from '@/components/EditViewForm.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: ApplicantsListView
  },
  {
    path: '/create',
    name: 'applicantsCreate',
    component: ApplicantsFormView
  },
  {
    path: '/view/:id',
    name: 'applicantsView',
    component: EditViewForm
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;