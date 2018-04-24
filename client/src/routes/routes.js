// Dashboard Layouts
import AdminDashboardLayout from '../components/Dashboard/Layout/AdminDashboardLayout.vue'
import UserDashboardLayout from 'src/components/Dashboard/Layout/UserDashboardLayout.vue'

// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'
import Login from '../components/GeneralViews/Login.vue'
import Register from '../components/GeneralViews/Register.vue'

// Admin pages
import AdminOverview from 'src/components/Dashboard/Views/AdminViews/Overview.vue'
import UserList from 'src/components/Dashboard/Views/AdminViews/UserList.vue'
import Settings from 'src/components/Dashboard/Views/AdminViews/Settings.vue'
import FirstApp from 'src/components/Dashboard/Views/AdminViews/FirstApp.vue'

// User pages
import Waitlist from 'src/components/Dashboard/Views/UserViews/Waitlist.vue'
import UserOverview from 'src/components/Dashboard/Views/UserViews/Overview.vue'

// Root page for redirecting
import Root from 'src/components/GeneralViews/Root.vue'

const routes = [
  {
    path: '/', // redirect to Admin or User dashboard
    component: Root
  },
  {
    path: '/admin',
    component: AdminDashboardLayout,
    redirect: '/admin/overview',
    children: [
      {
        path: 'overview',
        name: 'Admin Overview',
        component: AdminOverview
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
      }
    ]
  },
  {
    component: UserDashboardLayout,
    path: '/user',
    redirect: '/user/overview',
    children: [
      {
        path: 'waitlists',
        name: 'Waiting Lists',
        component: Waitlist
      },
      {
        path: 'overview',
        name: 'User Overview',
        component: UserOverview
      },
      {
        path: 'firstapp',
        name: 'First App',
        component: FirstApp
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
