<template>
  <div class="center-form">
    <div class="page-header text-shadow">
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
          <button type="submit" class="btn btn-info btn-lg">Register!</button>
        </div>
        
      </form>
    </div>
  </div>
</template>

