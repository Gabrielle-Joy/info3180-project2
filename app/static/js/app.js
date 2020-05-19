Vue.prototype.$baseurl = 'localhost:8080'
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
                    <a class="nav-link" href="/users/2">My Profile</a>
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
        <footer class="mt-5">
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
        {{errors}}
        <div 
            class="bg-light border border-danger rounded text-danger p-2" 
            v-if="errors.length > 0 && messages.length == 0"
        >
        <ul class="">
            <li v-for="(error, index) in errors " :key="index">{{ error }}</li>
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
    `,
    data () {
      return {
        errors: [],
        messages: []
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
      return {};
  }
});

const Register = Vue.component('register', {
  template: `
  <div class="center-form">
    <div class="page-header">
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
          <label for="profile_picture">Photo</label>
          <input type="file" class="form-control-file" name="profile_picture" id="profile_picture">
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
        // console.log(JSON.stringify(form))

        // send api request
        fetch('api/users/register', {
            method: "POST",
            body: form,
            headers: {
                'X-CSRFToken': token
            },
            credentials: 'same-origin'
        })
        .then(res => {
          console.log(res)
          return res.json() 
        })
        .then(res => {
            console.log(res)

            if (!res.errors) {
              // success
              console.log(res.message)
              router.push({name: 'login'})
            } else {
              // failed register
              console.log(res.errors)
            }
        })
    }
  }
});

const Login = Vue.component('login', {
  template: `
  <div class="center-form">
    <div class="page-header">
      <h3>Login</h3>
    </div>

    <div class="border border-info p-3 bg-light rounded shadow">
      <form @submit.prevent="login_user()" id="login-form">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" class="form-control" name="username" id="username">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" name="password" id="password">
        </div>
        <div class="mt-2">
          <hr>
          <button type="submit" class="btn btn-info btn-lg">Login</button>
        </div>
        
      </form>
    </div>
  </div>
  `,
  data: function () {
      return {}
  },
  methods: {
    login_user () {
      el = document.getElementById('login-form')
      form = new FormData(el)

      // send api request
      fetch('api/auth/login', {
          method: "POST",
          body: form,
          headers: {
              'X-CSRFToken': token
          },
          credentials: 'same-origin'
      })
      .then(res => {
          console.log(res)
          return res.json()
      })
      .then(res => {
        console.log(res)
        if (!res.errors) {
            // successful login
            console.log("Success")
            localStorage.setItem('token', res.token);
            localStorage.setItem('id', res.user_id);
            router.push({name: 'home'})
            console.log(localStorage.getItem('jwt_token'))
        } else {
            // failed login
            console.log(res.errors)
        }          
      })
    }
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

const Profile = Vue.component('profile', {
  template: `
  <div>
    <div class="card shadow mb-5">
    
      <div class="card-top rounded border-primary"></div>

      <div class="row no-gutters p-4" style="width: auto;">

        <div class="col-md-2">
          <img 
            src="https://api.time.com/wp-content/uploads/2017/12/terry-crews-person-of-year-2017-time-magazine-2.jpg" 
            class="card-img" 
            alt="profile-picture"
          >
        </div>

        <div class="col-md-10 d-flex">
          <div class="card-body w-50">
            <h3 class="card-title text-dark font-weight-bold ">{{ profile.fullname }}</h3>
            <div class="text-secondary">

              <div class="d-flex align-items-center mb-2">
                <i class="fas fa-map-marker-alt"></i>
                <p class="card-text ml-3">{{ profile.email }}</p>
              </div>
              
              <div class="d-flex align-items-center mb-2">
                <i class="far fa-envelope card-text"></i>
                <p class="card-text ml-3">{{ profile.location }}</p>
              </div>

              <div class="d-flex align-items-center">
                <i class="far fa-calendar"></i>
                <p class="card-text ml-3">joined on {{ profile.joined_on }}</p> 
              </div>

              <div class="d-flex align-items-center mt-3">
                <p>{{ 'Bio Here...' }}</p>
              </div>
            </div>
          </div>
          
          <div class="card-body p-5">
            <div class="d-flex mb-5">
              <div class="w-50 text-center">
                <p>{{ profile.posts.length }}</p>
                <p class="text-muted">Posts</p>
              </div>

              <div class="w-50 text-center">
                <p>{{ followers }}</p>
                <p class="text-muted">Followers</p>
              </div>
            </div>  

            <div>
              <button class="btn btn-primary btn-block">Follow</button>
            </div>
          </div>
        </div>
      </div>
    </div>

   <!-- posts -->
    <div
      v-for="(row, index) in photorows"
      :key="index"
    >
      <div class="card-deck">
        <div v-for="(post, pindex) in row" :key="pindex">
          <div 
            class="card"
            v-if="post"
          >
            <img 
              class="profile-post"
              :src="post.photo" 
              :alt="'photo'"
            >
          </div>

          <div 
            v-else
            class="card bg-transparent border-0"
          ></div>
        </div> 
      </div>
    </div>
  </div>
  `,
  data: function () {
      return {
        followers: 10,
        rowlen: 3,
        profile: {},
        posts: [
          {
            photo: 'https://pbs.twimg.com/media/Dwv-JlDUUAA-8FK.jpg',
            caption: 'THis is a post about a dog'
          },
          {
            photo: 'https://www.biography.com/.image/t_share/MTE5NDg0MDYwNjkzMjY3OTgz/terry-crews-headshot-600x600jpg.jpg',
            caption: "Headshot I took for my first acting audition"
          }
        ]
      }
  },
  computed: {
    rows () {
        if (this.profile.posts) {
            return Math.floor((this.profile.posts.length - 1) / this.rowlen) + 1
        } else {
            return 0
        }
    },
    photorows () {
      const prows = []
      for (let index = 0; index < this.rows; index++) {
        prows.push([])
        for (let i = 0; i < this.rowlen; i++) {
          prows[index].push(this.profile.posts[(index * this.rowlen) + i])
        }
      }
      return prows
    }
  },
  methods: {
    follow () {
        this.followers = this.followers + 1
    },
    getFollowerCount (uid) {
        fetch(`${this.$baseurl}/api/users/${uid}/follow`, {
            method: "GET",  
            headers: {
                'X-CSRFToken': token,
            },
            credentials: 'same-origin'
        })
        .then(res => {
            return res.json()
        })
        .then(data => {
            console.log(data)
            if (data.followers) {
                this.followers = data.followers
            } else {
                console.log("Error retrieving follower count")
                this.followers = 0
            }
        })
    }
  },
  mounted () {
      // fetch profile          

    const uid = this.$route.params.user_id   
    fetch(`api/users/${uid}`, {
        method: "GET",
        headers: {
            'X-CSRFToken': token,
            'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
        },
        credentials: 'same-origin'
    })
    .then(res => {
        console.log(res)
        return res.json()
    })
    .then(data => {
        this.profile = data
        console.log(this.profile)
    })

    this.getFollowerCount(uid)

  }
});

const Post = Vue.component('post', {
  template: `
  <div class="center-form">
    <div class="page-header">
      <h3>New Post</h3>
    </div>

    <div class="border border-info p-3 bg-light rounded shadow">
      <form @submit.prevent="login_user()" id="post-form">
        <div class="form-group">
          <label for="photo">Photo</label>
          <input type="file" class="form-control-file" name="photo" id="photo">
        </div>

        <div class="form-group">
          <label for="caption">Caption</label>
          <textarea 
            name="caption" id="caption" 
            rows="5" 
            class="form-control" 
            placeholder="Enter a caption for your post"
          ></textarea>
        </div>
        
      </form>
    </div>
  </div>
  `,
  data: function () {
      return {}
  },
  methods: {
    login_user () {
      el = document.getElementById('post-form')
      form = new FormData(el)
      // this.errorList = ["KILL"]
      // console.log(this.errors)
      // this.messages = ["SUCCESSSSS!!"]
      // console.log(messages)

      // send api request
      fetch(`api/users/${user_id}/posts`, {
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
              router.push({name: 'home'})
          } else {
              // failed register
              // errors = ["ERROR!!"]
              // errors = [res.errors]
          }
      })
    }
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
      {name: 'home', path: "/", component: Home},
      {name: 'register', path: "/register", component: Register},
      {name: 'login', path: "/login", component: Login},
      {name: 'logout', path: "/logout", component: Logout},
      {name: 'explore', path: "/explore", component: Explore},
      {name: 'profile', path: "/users/:user_id", component: Profile},
      {name: 'post', path: "/posts/new", component: Post},

      // This is a catch all route in case none of the above matches
      {path: "*", component: NotFound}
  ]
});

// Instantiate our main Vue Instance
let app = new Vue({
  el: "#app",
  router
});
