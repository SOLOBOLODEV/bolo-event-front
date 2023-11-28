<template>
  <header>
    <div>
        <!-- <RouterLink to="/">Home</RouterLink> -->
        <BoloNavbar v-if="userSession.session" />
      <!-- <BoloConnexion /> -->
    </div>
  </header>

  <RouterView />
</template>


<script setup>
import { RouterLink, RouterView } from "vue-router";
import { supabase } from "./utils/supabase";
import { userSessionStore } from "./stores/userSession";
import BoloNavbar from "./components/nav/BoloNavbar.vue";

const userSession = userSessionStore();

supabase.auth.onAuthStateChange((event, session) => {
  userSession.session = session;
  console.log("caca", userSession.session);
});



</script>