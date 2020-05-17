<template>
  <div>
    <div class="bg-light border border-danger rounded text-danger p-2" v-if="errors !== [] && messages == []">
      <ul class="">
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ul>
    </div>

    <div class="border border-success rounded text-success p-2" v-if="messages !== [] && erros == []">
      <ul>
        <li v-for="(message, index) in messages" :key="index">{{ message }}</li>
      </ul>
    </div>
  </div>
</template>