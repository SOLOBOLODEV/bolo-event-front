<template>
  <div>
    <div>
      <label class="block py-1">Mail</label>
      <input type="email" v-model="email"
        class="border w-full py-2 px-2 rounded shadow hover:border-indigo-600 ring-1 ring-inset ring-gray-300 font-mono">
    </div>
    <div>
      <label class="block py-1">Password</label>
      <input type="password" v-model="password"
        class="border w-full py-2 px-2 rounded shadow hover:border-indigo-600 ring-1 ring-inset ring-gray-300 font-mono">
    </div>
    <div class="flex gap-3 pt-3 items-center">
      <button class="border hover:border-indigo-600 px-4 py-2 rounded-lg shadow ring-1 ring-inset ring-gray-300"
        @click="login()">Login</button>
    </div>
  </div>
</template>

<script setup>
import { supabase } from "../../utils/supabase";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const router = useRouter();
const email = ref("");
const password = ref("");


const login = async () => {
  try {
    await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    });
    router.push("/dashboard"); // Redirect à dashboard
  } catch (error) {
    toast.error("Connexion échouée", {
      autoClose: 5000,
    });

    // Display error message to user
  }
};

</script>