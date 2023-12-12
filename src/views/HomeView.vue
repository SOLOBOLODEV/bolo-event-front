<template>
  <BoloConnexion v-if="!userSession.session" />
</template>


<script setup>
import BoloConnexion from "../components/connexion/BoloConnexion.vue";
import { userSessionStore } from "../stores/userSession";

const userSession = userSessionStore();


</script>
