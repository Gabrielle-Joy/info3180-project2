<template>
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
</template>

