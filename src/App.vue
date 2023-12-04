<template>
  <BoloNavbar v-if="userSession.session" />
  <RouterView />
</template>


<script setup>
import { RouterView } from "vue-router";
import { supabase } from "./utils/supabase";
import { userSessionStore } from "./stores/userSession";
import BoloNavbar from "./components/nav/BoloNavbar.vue";
import BoloJoin from "./components/dialog/BoloJoin.vue";
import BoloCreate from "./components/dialog/BoloCreate.vue";

const userSession = userSessionStore();

supabase.auth.onAuthStateChange((event, session) => {
  userSession.session = session;
});

</script>