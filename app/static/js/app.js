/* Add your Application JavaScript */
Vue.component('app-header', {
    template: `
        <header>
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
              <a class="navbar-brand" href="/">
                <img src="../static/images/interface.png" width="30" height="30" class="d-inline-block align-top" alt="mkk"/>
                Photogram
              </a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                  <li class="nav-item active">
                    <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/explore">Explore</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/users/:user_id">My Profile</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/logout">Logout</a>
                  </li>
                </ul>
                </ul>
              </div>
            </nav>
        </header>    
    `,
    data: function() {
      return {};
    }
});

Vue.component('app-footer', {
    template: `
        <footer>
            <div class="container">
                <p>Copyright &copy {{ year }} Flask Inc.</p>
            </div>
        </footer>
    `,
    data: function() {
        return {
            year: (new Date).getFullYear()
        }
    }
})

/* Router Components */
const Home = Vue.component('home', {
  template: `
  <div>
      <h1>Hello there! Welcome to Photogram!</h1>
  </div>
  `,
  data: function () {
      return {}
  }
});

const Register = Vue.component('register', {
  template: `
  <div>
      <h1>Register</h1>
  </div>
  `,
  data: function () {
      return {}
  }
});

const Login = Vue.component('login', {
  template: `
  <div>
      <h1>Login</h1>
  </div>
  `,
  data: function () {
      return {}
  }
});
const Logout = Vue.component('logout', {
  template: `
  <div>
      <h1>Logout: may need sumn special</h1>
  </div>
  `,
  data: function () {
      return {}
  }
});

const Explore = Vue.component('explore', {
  template: `
  <div>
      <h1>Dora di explora!</h1>
  </div>
  `,
  data: function () {
      return {}
  }
});

const User = Vue.component('user', {
  template: `
  <div>
      <h1>User:I will find you</h1>
  </div>
  `,
  data: function () {
      return {}
  }
});

const Post = Vue.component('post', {
  template: `
  <div>
      <h1>Post: time to give out my INFOO</h1>
  </div>
  `,
  data: function () {
      return {}
  }
});

const NotFound = Vue.component('not-found', {
  template: `
  <div>
      <h1>404 - Not Found</h1>
  </div>
  `,
  data: function () {
      return {}
  }
})


// Define Routes
const router = new VueRouter({
  mode: 'history',
  routes: [
      {path: "/", component: Home},
      {path: "/register", component: Register},
      {path: "/login", component: Login},
      {path: "/logout", component: Logout},
      {path: "/explore", component: Explore},
      {path: "/users/:user_id", component: User},
      {path: "/posts/new", component: Post},

      // This is a catch all route in case none of the above matches
      {path: "*", component: NotFound}
  ]
});

// Instantiate our main Vue Instance
let app = new Vue({
  el: "#app",
  router
});
