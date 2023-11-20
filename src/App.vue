<template>
  <header>
    <div>
      <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav> -->
      <BoloConnexion />
    </div>
  </header>

  <RouterView />
</template>


<script setup>
import { RouterLink, RouterView } from "vue-router";
import BoloConnexion from "./components/connexion/BoloConnexion.vue";


</script>