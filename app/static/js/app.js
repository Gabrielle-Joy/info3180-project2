Vue.prototype.$uploads = '/static/uploads/'
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
                  <li class="nav-item" v-if="$root.uid">
                    <a class="nav-link" href="/explore">Explore</a>
                  </li>
                  <li class="nav-item" v-if="$root.uid">
                    <a class="nav-link" :href="'/users/' + $root.uid">My Profile</a>
                  </li>
                  <li class="nav-item" v-if="$root.uid">
                    <a class="nav-link" href="/logout" @click="$root.uid=null">Logout</a>
                  </li>
                  <li class="nav-item" v-if="!$root.uid">
                    <a class="nav-link" href="/login">Login</a>
                  </li>
                </ul>
                </ul>
              </div>
            </nav>
        </header>    
    `,
    data: function() {
      return {
          uid: localStorage.getItem('id')
        // uid: 2
      }
    },
    watch: {
        uid () {
            this.uid = localStorage.getItem('id')
        } 
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
        <div v-if="$root.errors || $root.message">
          <div 
              class="bg-light border border-danger rounded text-danger p-2" 
              v-if="$root.code || $root.errors"
          >
            <p>{{ $root.message }}</p>
            <ul class="">
                <li v-for="(error, index) in $root.errors " :key="index">{{ error }}</li>
            </ul>
          </div>

          <div 
              class="bg-light border border-success rounded text-success p-2" 
              v-else
          >
            <p>{{ $root.message }}</p>
            <ul class="">
                <li v-for="(error, index) in $root.errors " :key="index">{{ error }}</li>
            </ul>
          </div>
        </div>
    </div>
    `,
    data () {
      return {
        errors: [],
        messages: []
      }
    }
});

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
        fetch('/api/users/register', {
            method: "POST",
            body: form,
            headers: {
                'X-CSRFToken': token
            },
            credentials: 'same-origin'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)

            if (!data.errors ) {
              // success
              console.log(data.message)
              this.$root.messages = [data.message]
              router.push({name: 'login'})
            } else {
              // failed register
              this.$root.errors = data.errors
              console.log(data.errors)
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

        if (!res.errors && !res.code) {
            // successful login
            localStorage.setItem('jwt_token', res.token);
            localStorage.setItem('id', res.user_id);
            this.$root.clearMessages()
            this.$root.message = "Successful login"
            router.push({name: 'home'})
        } else {
            // failed login
            this.$root.clearMessages()
            this.$root.errors = res.errors
            this.$root.message = res.message
            console.log("ERRROR")
        }          
      })
    }
  }
});

const Logout = Vue.component('logout', {
  template: `
  <div>Logging out {{ dots }}</div>
  `,
  data () {
      return {dots: '.'}
  },
  mounted () {
    fetch(`/api/auth/logout`, {
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': token,
            'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
        },
        credentials: 'same-origin'
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if (!data.errors) {
            // successful logout
            console.log(data.message) // FEEEEDBAAAACK
            localStorage.removeItem('id')
            localStorage.removeItem('jwt_token')
            this.$root.clearMessages()

            setInterval(() => { this.dots = this.dots + '.'}, 500)
            setTimeout(() => {
              
              router.push({name: 'home'})
            }, 2000);
            
        } else {
            console.error(data.erros)
            router.pop()
        }
    })
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

        <div class="col-md-3">  
          <img 
            :src="$uploads + profile.profile_photo" 
            class="card-img" 
            alt="profile-picture"
          >
        </div>

        <div class="col-md-9 d-flex">
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
                <p>{{ profile.biography }}</p>
              </div>
            </div>
          </div>
          
          <div class="card-body p-5">
            <div class="d-flex mb-5">
              <div class="w-50 text-center">
                <p>{{ postCount }}</p>
                <p class="text-muted">Posts</p>
              </div>

              <div class="w-50 text-center">
                <p>{{ followerCount }}</p>
                <p class="text-muted">Followers</p>
              </div>
            </div>  

            <div>
              <button @click="follow()" class="btn btn-primary btn-block">Follow</button>
            </div>
          </div>
        </div>
      </div>
    </div>

   <!-- posts -->
    <div
      v-for="(row, index) in photorows"
      :key="index"
      class=""
    >
      <div class="card-deck">
        <div v-for="(post, pindex) in row" :key="pindex">
          <div 
            class="card"
            v-if="post"
            @click="viewPost(post)"
          >
            <img 
              class="profile-post"
              :src="$uploads + post.photo" 
              :alt="post.photo"
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
        followers: null,
        following: false,
        rowlen: 3,
        profile: {}
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
        if (this.profile.posts) {
            for (let index = 0; index < this.rows; index++) {
                prows.push([])
                for (let i = 0; i < this.rowlen; i++) {
                prows[index].push(this.profile.posts[(index * this.rowlen) + i])
                }
            }
        }
        return prows
    },
    postCount () {
        return this.profile.posts ? this.profile.posts.length : '?'
    },
    followerCount () {
        return this.followers != null ? this.followers : '?'
    },
    
  },
  methods: {
    follow () {
        if (this.followers !== null) {
            this.followers = this.followers + 1
        }
    },
    getFollowerCount (uid) {
        fetch(`/api/users/${uid}/follow`, {
            method: "GET",  
            headers: {
                'X-CSRFToken': token,
                'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
            },
            credentials: 'same-origin'
        })
        .then(res => {
            return res.json()
        })
        .then(data => {
            console.log(data.followers)
            if (data.followers !== null) {
                this.followers = data.followers
            } else {
                console.log("Error retrieving follower count")
                this.followers = 0
            }
        })
    },
    viewPost (post) {
        router.push({name: 'post', params: {post_id: post.id, post: post}})
    }
  },
  mounted () {
    // fetch profile          
    const uid = this.$route.params.user_id
    console.log(`/api/users/${uid}`)   
    fetch(`/api/users/${uid}`, {
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
        console.log('PROFILE')
        console.log(data)
        this.profile = data
        
    })
    this.getFollowerCount(uid)

  }
});

const NewPost = Vue.component('new-post', {
    template: `
    <div class="center-form">
        <div class="page-header">
        <h3>New Post</h3>
        </div>

        <div class="border border-info p-3 bg-light rounded shadow">
        <form @submit.prevent="make_post()" id="post-form">
            <div class="form-group">
            <label for="post_photo">Photo</label>
            <input type="file" class="form-control-file" name="post_photo" id="post_photo">
            </div>

            <div class="form-group">
            <label for="bio">Description</label>
            <textarea 
                name="bio" id="bio" 
                rows="5" 
                class="form-control" 
                placeholder="Enter a caption/description for your post"
            ></textarea>
            </div>

            <div class="mt-2">
            <button type="submit" class="btn btn-info btn-lg">Post!</button>
            </div>
            
        </form>
        </div>
    </div>
    `,
    data: function () {
        return {}
    },
    methods: {
        make_post () {
            el = document.getElementById('post-form')
            form = new FormData(el)

            // send api request
            const uid = localStorage.getItem('id')
            fetch(`/api/users/${uid}/posts`, {
                method: "POST",
                body: form,
                headers: {
                    'X-CSRFToken': token,
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
                },
                credentials: 'same-origin'
            })
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data)
                if (!data.errors) {
                    // success
                    console.log(data.message) // FEEDBACK
                } else {
                    console.error(data.errors)
                }
                
                router.push({name: 'home'})
            })
        }
    }
});

const Post = Vue.component('post', {
    template: `
    <div class="center-form d-flex justify-content-center">
        <div class="card post-card" v-if="post">
            <img 
              :src="$uploads + post.photo" 
              alt="post photo" 
              class="card-img-top"
            >
            <div class="card-body">
                <div class="mt-3 mb-2">
                    <i @click="like()" class="far fa-heart" v-if="!liked"></i>
                    <i @click="like()" class="fas fa-heart" v-else></i>
                    {{ likes }}
                </div>
                <p>{{ post.description }}</p>
                
                <div>
                    <small class="text-muted">{{ post.created_on }}</small>
                </div>
            </div>
        </div>
    </div>
    `,
    data () {
        return {
            post_id: null,
            post: null,
            likes: null,
            liked: false
        }
    },
    methods: {
        like () {
            const body = JSON.stringify({
                user_id: parseInt(localStorage.getItem('id')),
                post_id: this.post_id
            })
            
            fetch(`/api/posts/${this.post_id}/like`, {
                method: "POST",
                body: body,
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': token,
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
                },
                credentials: 'same-origin'
            })
            .then(res => res.json())
            .then(data => {
                if (!data.errors) {
                    // success
                    console.log(data.message)
                    this.likes = data.likes
                } else {
                    console.error(data.errors)
                }
            })
            this.liked = !this.liked
        }
    },
    mounted () {
        this.post_id = this.$route.params.post_id
        this.post = this.$route.params.post
        fetch(`/api/posts/${this.post_id}/likes`, {
            method: "GET",
            headers: {
                'X-CSRFToken': token,
                'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
            },
            credentials: 'same-origin'
        })
        .then(res => {
            return res.json()
        })
        .then(data => {
            console.log(data)
            this.likes = data.likes
            this.liked = data.liked
        })
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
      {name: 'new-post', path: "/posts/new", component: NewPost},
      {name: 'post', path:"/post/:post_id", component: Post, props: true},

      // This is a catch all route in case none of the above matches
      {path: "*", component: NotFound}
  ]
});

// Instantiate our main Vue Instance
let app = new Vue({
  el: "#app",
  router,
  data: {
    uid: localStorage.getItem('id'),
    code: null,
    message: null,
    errors: null
  },
  methods: {
    clearMessages () {
      this.uid = localStorage.getItem('id'),
      this.code = null,
      this.message = null,
      this.errors = null
    }
  }
});
