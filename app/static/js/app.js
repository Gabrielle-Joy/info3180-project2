Vue.prototype.$errors = []
Vue.prototype.$messages = []
Vue.mixin({
    data () {
        return {
            errorList: ['EROORRRRS!!'],
            messageList: []
        }   
    },
    computed: {
        errors () {
            return this.errorList
        },
        messages () {
            return this.messageList
        }
    }
})
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
});

/* Feedback container - container for displaying error/success messages*/
const Feedback = Vue.component('feedback', {
    template: `
    <div>
        <div 
            class="bg-light border border-danger rounded text-danger p-2" 
            v-if="errors.length > 0 && messages.length == 0"
        >
        <ul class="">
            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
        </div>

        <div 
            class="border border-success rounded text-success p-2" 
            v-if="messages.length > 0 && errors.length == 0"
        >
        <ul>
            <li v-for="(message, index) in messages" :key="index">{{ message }}</li>
        </ul>
        </div>
    </div>
    `
})

/* Router Components */
const Home = Vue.component('home', {
  template: `
  <div>
      <h1>Hello there! Welcome to Photogram!</h1>
  </div>
  `,
  data: function () {
      return {};
  }
});

const Register = Vue.component('register', {
  template: `
  <div id="register">
    <slot 
    <div class="page-header text-shadow">
      <h3>Register</h3>
    </div>

    <div class="border border-info p-3 bg-light rounded shadow">
      <form @submit.prevent="register_user()" id="register-form">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" class="form-control" name="username" id="username">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" name="password" id="password">
        </div>
        <div class="form-group">
          <label for="fname">Firstname</label>
          <input type="text" class="form-control" name="first_name" id="fname">
        </div>
        <div class="form-group">
          <label for="lname">Lastname</label>
          <input type="text" class="form-control" name="last_name" id="lname">
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" class="form-control" name="email" id="email">
        </div>
        <div class="form-group">
          <label for="location">Location</label>
          <input type="text" class="form-control" name="location" id="location">
        </div>
        <div class="form-group">
          <label for="bio">Biography</label>
          <textarea     
            name="bio" id="bio" 
            cols="30" rows="10" 
            class="form-control" 
            placeholder="Enter a short piece about yourself"
          ></textarea>
        </div>
        <div class="form-group">
          <label for="profile_photo">Photo</label>
          <input type="file" class="form-control-file" name="profile_photo" id="profile_photo">
        </div>
        <div class="mt-2">
          <hr>
          <button type="submit" class="btn btn-info btn-lg">Register!</button>
        </div>
        
      </form>
    </div>
  </div>
  `,
  data: function () {
      return {}
  },
  methods: {
    register_user () {
        el = document.getElementById('register-form')
        form = new FormData(el)
        // this.errorList = ["KILL"]
        // console.log(this.errors)
        // this.messages = ["SUCCESSSSS!!"]
        // console.log(messages)

        // send api request
        fetch('api/register', {
            method: "POST",
            body: form,
            headers: {
                'X-CSRFToken': token
            },
            credentials: 'same-origin'
        })
        .then(res => {
            return res.json()
        })
        .then(res => {
            console.log(res)
            if(res.status == 201) {
                // successful register
                // messages = [res.message]
                // messages = ["SUCCESSSSS!!"]
                router.push({name: 'login'})
            } else {
                // failed register
                // errors = ["ERROR!!"]
                // errors = [res.errors]
            }
        })
    }
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
