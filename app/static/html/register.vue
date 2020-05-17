<template>
  <div id="register">
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
          <input type="text" class="form-control" name="fname" id="fname">
        </div>
        <div class="form-group">
          <label for="lname">Lastname</label>
          <input type="text" class="form-control" name="lname" id="lname">
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
          <label for="username">Photo</label>
          <input type="file" class="form-control-file" name="username" id="username">
        </div>
        <div class="mt-2">
          <hr>
          <button type="submit" class="btn btn-info btn-lg">Register!</button>
        </div>
        
      </form>
    </div>
  </div>
</template>