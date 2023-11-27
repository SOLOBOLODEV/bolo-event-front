<template>
  <header>
    <div>
      <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav> -->
      <!-- <BoloConnexion /> -->
    </div>
  </header>

  <RouterView />
</template>


<script setup>
import { RouterLink, RouterView } from "vue-router";
import { supabase } from "./utils/supabase";
import { userSessionStore } from "./stores/userSession";

const userSession = userSessionStore();

supabase.auth.onAuthStateChange((event, session) => {
  userSession.session = session;
});



</script>