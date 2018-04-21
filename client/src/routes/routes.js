// Dashboard Layouts
import AdminDashboardLayout from '../components/Dashboard/Layout/AdminDashboardLayout.vue'
import UserDashboardLayout from 'src/components/Dashboard/Layout/UserDashboardLayout.vue'

// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'
import Login from '../components/GeneralViews/Login.vue'
import Register from '../components/GeneralViews/Register.vue'

// Admin pages
import Overview from 'src/components/Dashboard/Views/AdminViews/Overview.vue'
import AdminFeedback from 'src/components/Dashboard/Views/AdminViews/Feedback.vue'
import UserList from 'src/components/Dashboard/Views/AdminViews/UserList.vue'
import Settings from 'src/components/Dashboard/Views/AdminViews/Settings.vue'

// User pages
import Apps from 'src/components/Dashboard/Views/UserViews/Apps.vue'
import UserFeedback from 'src/components/Dashboard/Views/UserViews/Feedback.vue'
import Waitlist from 'src/components/Dashboard/Views/UserViews/Waitlist.vue'
import Invite from 'src/components/Dashboard/Views/UserViews/Invite.vue'

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
        path: 'feedback',
        name: 'See Feedback',
        component: AdminFeedback
      }
    ]
  },
  {
    component: UserDashboardLayout,
    path: '/user',
    redirect: '/user/apps',
    children: [
      {
        path: 'apps',
        name: 'My Apps',
        component: Apps
      },
      {
        path: 'waitlists',
        name: 'Waiting Lists',
        component: Waitlist
      },
      {
        path: 'invites',
        name: 'Invites',
        component: Invite
      },
      {
        path: 'feedback',
        name: 'Give Feedback',
        component: UserFeedback
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
