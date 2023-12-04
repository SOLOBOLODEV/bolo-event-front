<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-br">
    <div class="w-full max-w-lg px-10 py-8 mx-auto bg-white border rounded-lg shadow-2xl">
      <div class="flex items-center justify-between">
        <h1 class="text-lg font-semibold" v-if="login === true"> Login </h1>
        <h1 class="text-lg font-semibold" v-else> Register </h1>

      </div>

      <BoloLogin v-if="login === true" />
      <BoloRegister v-else />
      <div class="relative">
        <button @click="loginSwitch" class="mt-4 mb-8 bg-blue-500 text-white px-4 py-2 rounded-lg absolute -right-0 -bottom-9"
          v-if="login === true">Register</button>
        <button @click="loginSwitch" class="mt-4 mb-8 bg-blue-500 text-white px-4 py-2 rounded-lg absolute -right-0 -bottom-9 " v-else>Login</button>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref } from "vue";
import BoloLogin from "./BoloLogin.vue";
import BoloRegister from "./BoloRegister.vue";

const login = ref(false);

const loginSwitch = () => {
  login.value = !login.value;
};

</script>
