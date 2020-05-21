<template>
  <div class="center-form d-flex justify-content-center">
    <div class="p-4">
      <div>
          <div class="rounded-circle">
             <img 
              :src="'https://www.google.com/url?sa=i&url=https%3A%2F%2Fskylum.com%2Fhow-to%2Fhow-to-photoshop-someone-into-picture&psig=AOvVaw0GXD0Xsu-Bh_iVa_eg8LOr&ust=1590121872473000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCICyot2PxOkCFQAAAAAdAAAAABAY'"
              alt="u"> 
          </div>
          <i class="fas fa-user"></i>
          <p @click="user()"> post.user </p>
      </div>
      <div class="card post-card" v-if="post">
          <img 
            :src="$uploads + post.photo" 
            alt="post photo" 
            class="card-img-top"
          >
          <div class="card-body">
              <div class="mt-3 mb-2">
                  <i @click="like()" class="far fa-heart clickable" v-if="!liked"></i>
                  <i @click="like()" class="fas fa-heart clickable" v-else></i>
                  {{ likes }}
              </div>
              <p>{{ post.description }}</p>
              
              <div>
                  <small class="text-muted">{{ post.created_on }}</small>
              </div>
          </div>
      </div>
    </div>
    </div>
</template>