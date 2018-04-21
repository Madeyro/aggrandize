<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card>
            <h1 slot="header">Log in</h1>
            <div class="col-xs-12">
                <form class="form-signin" @submit.prevent="login">
                  <div class="alert alert-danger" v-if="error">{{ error }}</div>
                  <div class="row">
                    <fg-input v-model="email" class="form-control" id="inputEmail" label="Email address" placeholder="Email address" type="email" required autofocus>
                    </fg-input>
                  </div>
                  <div class="row">
                    <fg-input v-model="password" class="form-control" id="inputPassword" label="Password" placeholder="Password" type="password" required>
                    </fg-input>
                  </div>
                  <button class="btn btn-primary" type="submit">Log in</button>
                </form>
                <router-link to="/register">
                  <button class="btn btn-info">Create account</button>
                </router-link>
              </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Login',
    components: {
      Card
    },
    data () {
      return {
        email: '',
        password: '',
        error: false
      }
    },
    created () {
      this.checkCurrentLogin()
    },
    updated () {
      this.checkCurrentLogin()
    },
    computed: {
      ...mapGetters([
        'currentUser'
      ])
    },
    methods: {
      checkCurrentLogin () {
        if (this.currentUser) {
          this.$router.replace(this.$route.query.redirect || '/')
        }
      },
      login () {
        this.$http.post('/auth', { mail: this.email, password: this.password })
          .then(request => this.loginSuccessful(request))
          .catch(() => this.loginFailed())
      },
      loginSuccessful (req) {
        if (!req.data.token) {
          this.loginFailed()
          return
        }

        localStorage.token = req.data.token
        this.error = false
        this.$store.dispatch('login')
        this.$router.replace(this.$route.query.redirect || '/')
      },
      loginFailed () {
        this.error = 'Login failed!'
        this.$store.dispatch('logout')
        delete localStorage.token
      }

    }
  }
</script>
<style scoped>
.login-overlay {
  background: #605B56 !important;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.login-wrapper {
  background: #fff;
  width: 70%;
  margin: 12% auto;
  animation: fadein 0.6s;
}
@keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}
.form-signin {
  max-width: 330px;
  padding: 10% 15px;
  margin: 0 auto;
}
.form-signin .form-signin-heading,
.form-signin .checkbox {
  margin-bottom: 10px;
}
.form-signin .checkbox {
  font-weight: normal;
}
.form-signin .form-control {
  position: relative;
  height: auto;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
