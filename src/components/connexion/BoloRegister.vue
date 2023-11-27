<template>
  <div>
    <p></p>
  </div>
  <div>
    <label class="block py-1">Mail</label>
    <input type="email" v-model="email" required
      class="border w-full py-2 px-2 rounded shadow hover:border-indigo-600 ring-1 ring-inset ring-gray-300 font-mono">
    <p class="text-sm mt-2 px-2 hidden text-gray-600">Text helper</p>
  </div>
  <div>
    <label class="block py-1">Password</label>
    <input type="password" v-model="password" required
      class="border w-full py-2 px-2 rounded shadow hover:border-indigo-600 ring-1 ring-inset ring-gray-300 font-mono"
      :class="{ 'border-red-300': password !== confirmPassword }">
  </div>
  <div>
    <label class="block py-1">Retype Password</label>
    <input type="password" v-model="confirmPassword" required
      class="border w-full py-2 px-2 rounded shadow hover:border-indigo-600 ring-1 ring-inset ring-gray-300 font-mono"
      :class="{ 'border-red-300': password !== confirmPassword }">

  </div>
  <div class="flex gap-3 pt-3 items-center">
    <button class="border hover:border-indigo-600 px-4 py-2 rounded-lg shadow ring-1 ring-inset ring-gray-300"
      @click="register()">Register</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../../utils/supabase";


const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regex.test(email.value);
};

const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d_]).{8,}$/;
  return regex.test(password.value);
};

const register = async () => {
  const checkEmail = validateEmail(email);
  const checkPwd = validatePassword(password);
  if (checkEmail && checkPwd && password.value === confirmPassword.value) {
    await supabase.auth.signUp(
      {
        email: email.value,
        password: password.value
      }
    );
  }
};

</script>