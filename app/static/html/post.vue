<template>
  <div class="center-form">
    <div class="card">
      <img :src="$upload + post.photo" alt="post photo" class="card-img-top">
      <div class="card-body">
        <div class="mt-3">
          <i class="far fa-heart" v-if="liked"></i>
          {{ likes }}
        </div>
        <p>{{ post.description }}</p>
        
        <div>
          <small>{{ post.created_on }}</small>
        </div>
      </div>
    </div>
  </div>
</template>