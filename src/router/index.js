import { createRouter, createWebHistory } from 'vue-router';
import CustomerList from '@/components/CustomerList.vue';
import CustomerForm from '@/components/CustomerForm.vue';
import CustomerEdit from '@/components/CustomerEdit.vue';
import ArraySumCalculator from '@/components/ArraySumCalculator.vue';
import NotFound from '@/components/NotFound.vue';

const routes = [
  { path: '/', component: CustomerList },
  { path: '/customers', component: CustomerList },
  { path: '/customers/new', component: CustomerForm },
  { path: '/customers/:id/edit', name: 'EditCustomer', component: CustomerEdit },
  { path: '/soal2', component: ArraySumCalculator },
  { path: '/:pathMatch(.*)*', component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;