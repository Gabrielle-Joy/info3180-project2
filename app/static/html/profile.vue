<template>
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
            <h3 class="card-title text-dark font-weight-bold ">{{ 'Terry' + " " + 'Crews' }}</h3>
            <div class="text-secondary">

              <div class="d-flex align-items-center mb-2">
                <i class="fas fa-map-marker-alt"></i>
                <p class="card-text ml-3">{{ 'tcrews@mail.com' }}</p>
              </div>
              
              <div class="d-flex align-items-center mb-2">
                <i class="far fa-envelope card-text"></i>
                <p class="card-text ml-3">{{ 'Portmore' }}</p>
              </div>

              <div class="d-flex align-items-center">
                <i class="far fa-calendar"></i>
                <p class="card-text ml-3">joined on {{ 'May 18, 2020' }}</p> 
              </div>

              <div class="d-flex align-items-center mt-3">
                <p>{{ 'Bio Here...' }}</p>
              </div>
            </div>
          </div>
          
          <div class="card-body p-5">
            <div class="d-flex mb-5">
              <div class="w-50 text-center">
                <p>{{ posts.length }}</p>
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
</template>