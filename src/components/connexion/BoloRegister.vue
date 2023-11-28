<template>
  <div>
    <ul class="text-slate-400">
      <li>Le mot de passe doit être de 8 caractères</li>
      <li>1 lettre minuscule et 1 lettre majuscule</li>
      <li>1 chiffre, et 1 caractère spécial</li>
    </ul>
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
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

let email = ref("");
let password = ref("");
let confirmPassword = ref("");


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
    clear();
    toast.success(
      "Un email de confirmation a été envoyé", {
      autoClose: 10000
    });
  } else {
    clear();
    toast.error("Erreur enregistrement vérifiez bien le mot de passe et votre mail",
    {
      autoClose: 5000,
    });
  }
};

const clear = () => {
  email.value = "";
  password.value = "";
  confirmPassword.value = "";
};

</script>