/* util functions */
Vue.prototype.$validData = function(data) {
  return !data.hasOwnProperty('code')
  // return !data.errors && !data.code ? true : false
}

Vue.prototype.$processResponse = function(res) {
  if (res.status === 401) {
    // delete auth varibales
    console.log(res)
    sessionStorage.removeItem('jwt_token')
    sessionStorage.removeItem('id')
    res.json()
    .then(data => {
      let errors = [data.message]
      if (data.errors && data.errors.length > 0) errors.push(data.errors)
      console.log(data)
      this.$root.saveFeedback(message="Please login to continue.", errors=errors, code=data.code)
    })
    router.push({name: 'login'})
    return {'code': -1}
  } else {
    return res.json()
  }
  
}

Vue.prototype.$goTo = function(route, params={}) {
  router.push({name: route, params: params})
}

/* util values */
Vue.prototype.$uploads = '/static/uploads/'

/* Add your Application JavaScript */
Vue.component('app-header', {
    template: `
        <header>
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top nav-point">
              <a class="navbar-brand logo-text" @click="$goTo('home')">
                <img src="../static/images/interface.png" width="30" height="30" class="d-inline-block align-top" alt="mkk"/>
                Photogram
              </a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto nav-point">
                  <li class="nav-item active">
                    <a class="nav-link" @click="$goTo('home')">Home <span class="sr-only">(current)</span></a>
                  </li>
                  <li class="nav-item active" v-if="$root.uid">
                    <a class="nav-link" @click="$goTo('explore')">Explore</a>
                  </li>
                  <li class="nav-item active" v-if="$root.uid">
                    <a class="nav-link" @click="$goTo('profile', {'user_id':$root.uid})">My Profile</a>
                  </li>
                  <li class="nav-item active" v-if="$root.uid">
                    <a class="nav-link" @click="$goTo('logout')">Logout</a>
                  </li>
                  <li class="nav-item active" v-if="!$root.uid">
                    <a class="nav-link" @click="$goTo('login')">Login</a>
                  </li>
                </ul>
                </ul>
              </div>
            </nav>
        </header>    
    `
});

Vue.component('app-footer', {
    template: `
        <footer class="mt-5">
            <div class="container">
                <hr>  
                <p>Photogram. {{ year }} Team Resumate.</p>
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
    <div class="mb-3">
        <div v-if="$root.errors || $root.message">
          <div 
              class="bg-light border border-danger rounded text-danger p-2" 
              v-if="$root.code || $root.errors"
          >
            <p>{{ $root.message }}</p>
            <ul class="" v-if="$root.errors">
                <li v-for="(error, index) in $root.errors " :key="index">{{ error }}</li>
            </ul>
          </div>

          <div 
              class="bg-light border border-success rounded text-success p-2" 
              v-else
          >
            <p>{{ $root.message }}</p>
            <ul class="" v-if="$root.errors">
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
  <div class="row">
    <div class="col-sm-1"></div>
    <div class="col-sm-5">
      <img src="../static/images/dark-labs.jpg" alt="Tahj-Mahj" class="img-fluid rounded"/>
    </div>
    <div class="card home-card col-sm-5">
      <div class="card-body">
        <h5 class="card-title curly">
        <img src="../static/images/interface.png" class="nav-logo d-inline-block align-top" width="30" height="30" alt="Photogram logo"/>
          Photogram
        </h5>
        
        <p class="card-text share">Share photos of your favourite moments with friends, family and the world.</p>
        <div class="reg-log-btn" v-if="!$root.uid">
          <button @click="$goTo('register')" class="btn btns btn-success reg-log-btn">Register</button>
          <button @click="$goTo('login')" class="btn btns btn-primary reg-log-btn">Login</button>
        </div>
        <div class="reg-log-btn" v-else>
          <button @click="$goTo('explore')" class="btn btns btn-success reg-log-btn btn-block">Explore</button>
          <button @click="$goTo('new-post')"class="btn btns btn-primary"><i class="fa-fw fas fa-plus"></i>New Post</button>
        </div>
      </div>
    </div>
    <div class="col-sm-1"></div>
  </div>
  `,
  data: function () {
      return {
      }
  }, methods: {
      redirectToRegister() {
        this.$router.push({ path: '/register' });
      },
      redirectToLogin() {
        this.$router.push({ path: '/login' });
      }
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

        // send api request
        fetch('/api/users/register', {
            method: "POST",
            body: form,
            headers: {
                'X-CSRFToken': token
            },
            credentials: 'same-origin'
        })
        .then(res => this.$processResponse(res))
        .then(data => {
            console.log(data)
            if (this.$validData(data) ) {
              // success
              console.log(data.message)
              this.$root.saveFeedback(message=data.message)
              router.push({name: 'login'})
            } else {
              // failed register
              this.$root.saveFeedback(message=data.message, erros=data.errors, code=data.code)
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
      .then(res => this.$processResponse(res))
      .then(data => {
        console.log(data)
        if (this.$validData(data)) {
            // successful login
            sessionStorage.setItem('jwt_token', data.token);
            sessionStorage.setItem('id', data.user_id);
            console.log(sessionStorage.getItem('jwt_token'));
            console.log(sessionStorage.getItem('id'));
            this.$root.saveFeedback(message="Successful login")
            router.push({name: 'home'})
        } else {
            // failed login
            this.$root.saveFeedback(message=data.message, erros=data.errors, code=data.code)
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
            'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token')
        },
        credentials: 'same-origin'
    })
    .then(res => this.$processResponse(res))
    .then(data => {
        console.log(data)
        if (this.$validData(data)) {
            // successful logout
            this.$root.saveFeedback(message="You are logged out. See you later!")
            sessionStorage.removeItem('jwt_token')
            sessionStorage.removeItem('id')
            setInterval(() => { this.dots = this.dots + '.'}, 10)
            setTimeout(() => {
              router.push({name: 'home'})
            }, 200);
            
        } else {
            console.error(data.erros)
            router.go(-1)
        }
    })
  }
});

const Profile = Vue.component('profile', {
  template: `
  <div>
    <div class="card shadow mb-5">
    
      <div class="row no-gutters p-4" style="width: auto;">

        <div class="col-md-3 bio-box">  
          <img 
            :src="$uploads + profile.profile_photo" 
            class="card-img h-100" 
            alt="profile-picture"
          >
        </div>

        <div class="col-md-9 d-flex pt-2">
          <div class="card-body w-50">
            <h3 class="card-title text-dark font-weight-bold ">{{ fullname }}</h3>
            <div class="text-secondary">

              <div class="d-flex align-items-center mb-2">
                <i class="fa-fw fas fa-map-marker-alt"></i>
                <p class="card-text ml-3">{{ profile.location }}</p>
              </div>
              
              <div class="d-flex align-items-center mb-2">
                <i class="fa-fw far fa-envelope card-text"></i>
                <p class="card-text ml-3">{{ profile.email }}</p>
              </div>

              <div class="d-flex align-items-center">
                <i class="fa-fw far fa-calendar"></i>
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

            <div v-if="!selfFollow">
              <button @click="follow()" class="btn btn-success btn-block" v-if="following">Following</button>
              <button @click="follow()" class="btn btn-primary btn-block" v-else>Follow</button>
            </div>
            <div v-else>
              <button @click="$goTo('new-post')"class="btn btn-primary btn-block"><i class="fa-fw fas fa-plus"></i>New Post</button>
            </div>
          </div>
        </div>
      </div>
    </div>

   <!-- posts -->
    <div
      v-for="(row, index) in photorows"
      :key="index"
      class="mb-4"
    >
      <div class="card-deck">
        <div v-for="(post, pindex) in row" :key="pindex">
          <div 
            class="card clickable"
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
    fullname () {
      return this.profile ? this.profile.firstname + ' ' + this.profile.lastname : ''
    },
    selfFollow () {
      return this.$root.uid == this.$route.params.user_id
    },
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
      const uid = this.$route.params.user_id
      const body = JSON.stringify({user_id: parseInt(this.$root.uid), follower_id: parseInt(uid)})
      console.log(body)
        fetch(`/api/users/${uid}/follow`, {
          method: "POST", 
          body: body,
          headers: {
              'Content-Type' : 'application/json',
              'X-CSRFToken': token,
              'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token')
          },
          credentials: 'same-origin'
        })
        .then(res => this.$processResponse(res))
        .then(data => {
          if (this.$validData(data)) {
            // success
            this.getFollowerCount(uid)
          } else {
            console.log("ERROR")
            this.$root.saveFeedback(message=data.message, erros=data.errors, code=data.code)
          }
        })
    },
    getFollowerCount (uid) {
        fetch(`/api/users/${uid}/follow`, {
            method: "GET",  
            headers: {
                'X-CSRFToken': token,
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token')
            },
            credentials: 'same-origin'
        })
        .then(res => {
            return this.$processResponse(res)
        })
        .then(data => {
            // console.log(data.followers)
            if (data.followers !== null) {
                this.followers = data.followers
                this.following = data.following
            } else {
                console.log("Error retrieving follower count")
                this.followers = 0
            }
        })
    },
    viewPost (post) {
        const uid = this.$route.params.user_id
        router.push({name: 'post', params: {id: post.id}})
    }
  },
  mounted () {
    // fetch profile          
    const uid = this.$route.params.user_id
    // console.log(`/api/users/${uid}`)   
    fetch(`/api/users/${uid}`, {
        method: "GET",
        headers: {
            'X-CSRFToken': token,
            'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token')
        },
        credentials: 'same-origin'
    })
    .then(res => {
        // console.log(res)
        return this.$processResponse(res)
    })
    .then(data => {

      if (this.$validData(data)) {
        //success
        this.profile = data
      } else {
        this.$root.saveFeedback(message=data.message, erros=data.errors, code=data.code)
      }
        
        
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
            const uid = sessionStorage.getItem('id')
            fetch(`/api/users/${uid}/posts`, {
                method: "POST",
                body: form,
                headers: {
                    'X-CSRFToken': token,
                    'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token')
                },
                credentials: 'same-origin'
            })
            .then(res => this.$processResponse(res))
            .then(data => {
                console.log(data)
                if (this.$validData(data)) {
                    // success
                    this.$root.saveFeedback(message=data.message)
                    router.push({name: 'explore'})
                } else {
                    this.$root.saveFeedback(message=data.message, error=data.error, code=data.code)
                }
            })
        }
    }
});

const Post = Vue.component('post', {
    template: `
    <div class="center-form d-flex justify-content-center">
        <div class="card post-card" v-if="post && user">
            <div class="card-header d-flex align-items-center post-header clickable" @click="viewUser()">
                <img
                class="rounded-circle h-100" 
                :src="$uploads + user.profile_photo"
                alt="u"> 
                <span class="ml-2">{{user.username}} </span>
            </div>
            <img 
              :src="$uploads + post.photo" 
              alt="post photo" 
              class="card-img-top profile-photo"
            >
            <div class="card-body">
                <div class="mt-3 mb-2">
                    <i @click="like()" class="far fa-heart clickable" v-if="!post.liked"></i>
                    <i @click="like()" class="fas fa-heart clickable" v-else></i>
                    {{ post.likes }}
                </div>
                <p>{{ post.caption }}</p>
                
                <div>
                    <small class="text-muted">{{ post.created_on }}</small>
                </div>
            </div>
        </div>
    </div>
    `,
    props: ['id', 'postdata'],
    data () {
        return {
            user: null,
            url: 'https://lh3.googleusercontent.com/BRpxymdQTtK2EE1RGf3SbotOBqziMBBXllZxgOTmTbNsVhu_UaZErz5LpiW9SDQiQZ9b6g=s85',
            post: null
        }
    },
    methods: {
        like () {
            const body = JSON.stringify({
                user_id: parseInt(sessionStorage.getItem('id')),
                post_id: this.post.id
            })
            
            fetch(`/api/posts/${this.post.id}/like`, {
                method: "POST",
                body: body,
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': token,
                    'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token')
                },
                credentials: 'same-origin'
            })
            .then(res => this.$processResponse(res))
            .then(data => {
                if (this.$validData(data)) {
                    // success
                    console.log(data.message)
                    this.post.likes = data.likes
                } else {
                    this.$root.saveFeedback(message=data.message, errors=data.errors, code=data.errors)
                    console.error(data.errors)
                }
            })
            this.post.liked = !this.post.liked
        },
        getPost () {
          console.log("POSTTTTTT",this.post_id)
          fetch(`/api/posts/${this.post_id}`, {
              method: "GET",
              headers: {
                  'X-CSRFToken': token,
                  'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token')
              },
              credentials: 'same-origin'
          })
          .then(res => this.$processResponse(res))
          .then(data => {
              if (this.$validData(data)) {
                console.log(data.posts[0])
                this.post = data.posts[0]
                this.getUserInfo()
                console.log(this.post)
              } else {
                this.$root.saveFeedback(message=data.message, errors=data.errors, code=data.errors)
              }            
          })
        },
        getUserInfo () {
          const uid = this.post.user_id
          console.log(uid)
          fetch(`/api/users/${uid}`, {
              method: "GET",
              headers: {
                  'X-CSRFToken': token,
                  'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token')
              },
              credentials: 'same-origin'
          })
          .then(res => this.$processResponse(res))
          .then(data => {
              if (this.$validData(data)) {
                console.log(data)
                this.user = data
              } else {
                this.$root.saveFeedback(message=data.message, errors=data.errors, code=data.errors)
              }            
          })
        },
        viewUser() {
          this.$goTo('profile', {user_id: this.post.user_id})
        }
    },
    mounted () {
        if(this.postdata) {
          this.post = this.postdata
          this.getUserInfo()
        } else {
          console.log(this.$route.params)
          console.log(this.id)
          this.post_id = parseInt(this.id)
          this.getPost()
        } 
    }
});

const Explore = Vue.component('explore', {
  template: `
  <div>
    <div class="d-flex justify-content-center">
      <div v-if="posts" class="mr-3">
        <post v-for="(post, index) in posts" :key="index" :postdata="post"></post>
      </div>
      <div class="d-flex p-5"> 
        <button 
          @click="$goTo('new-post')"
          class="btn btns btn-primary position-fixed"
        >
          <i class="fa-fw fas fa-plus"></i>
          New Post
        </button>
      </div>
    </div>
  </div>
  `,
  data: function () {
      return {
        posts: null
      }
  }, 
  mounted () {

      fetch(`/api/posts`, {
          method: "GET",
          headers: {
              'X-CSRFToken': token,
              'Authorization': 'Bearer ' + sessionStorage.getItem('jwt_token')
          },
          credentials: 'same-origin'
      })
      .then(res => this.$processResponse(res))
      .then(data => {
        if (this.$validData(data)) {
          console.log(data.posts)
          this.posts = data.posts.reverse()
        } else {
          this.$root.saveFeedback(message=data.message, erros=data.errors, code=data.code)
        }
      })
    }
});

const NotFound = Vue.component('not-found', {
  template: `
  <div>
      <div class="not-found">
        <h1>404 - Not Found</h1>
        <h2>This page does not exist</h2>
        <button class="btn btn-dark btn-lg" @click="$goTo('home')">Return Home</button>
      </div>
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
      {name: 'post', path:"/post/:id", component: Post, props: true},

      // This is a catch all route in case none of the above matches
      {name: 'Unknown', path: "*", component: NotFound}
  ]
});

// Instantiate our main Vue Instance as well as global values/methods. ref w/ $root
let app = new Vue({
  el: "#app",
  router,
  data: {
    uid: sessionStorage.getItem('id'),
    code: null,
    message: null,
    errors: null,
    clicks: 0
  },
  methods: {
    clearFeedback () {
      this.saveFeedback()
    },
    saveFeedback (message = null, errors = null, code = null) {
      // this.uid = sessionStorage.getItem('id'),
      this.code = code
      this.message = message
      this.errors = errors
      this.clicks = 0
    }
  },
  watch: {
    $route () {
      this.uid = sessionStorage.getItem('id')
      this.clicks += 1
      if (this.clicks > 1) this.clearFeedback()
    }
  }
});
