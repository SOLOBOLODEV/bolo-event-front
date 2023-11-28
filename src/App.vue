<template>
  <header>
    <div>
      <button @click="testNotify()">Test</button>
    </div>
  </header>

  <RouterView />
</template>


<script setup>
import { RouterLink, RouterView } from "vue-router";
import { supabase } from "./utils/supabase";
import { userSessionStore } from "./stores/userSession";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const userSession = userSessionStore();

supabase.auth.onAuthStateChange((event, session) => {
  userSession.session = session;
});



</script>