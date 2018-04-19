import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'
import Login from '../components/GeneralViews/Login.vue'
import Register from '../components/GeneralViews/Register.vue'

// Admin pages
import Overview from 'src/components/Dashboard/Views/Overview.vue'
import Feedback from 'src/components/Dashboard/Views/Feedback.vue'
import UserList from 'src/components/Dashboard/Views/UserList.vue'
import Settings from 'src/components/Dashboard/Views/Settings.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/admin/overview'
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/overview',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'users',
        name: 'Users',
        component: UserList
      },
      {
        path: 'settings',
        name: 'Settings',
        component: Settings
      },
      {
        path: 'Feedback',
        name: 'feedback',
        component: Feedback
      }
    ]
  },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  { string } name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
