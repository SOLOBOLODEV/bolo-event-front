<template>
  <nav class="navbar flex top-0 w-full bg-white border-b border-gray-200">
    <div class="container mx-auto flex items-center justify-between p-4">
      <div class="flex items-center space-x-4">
        <a class="navbar-brand">
          <img src="SBD.svg" alt="LOGO" class="h-22 w-22" />
        </a>
      </div>
      <div class="flex items-center space-x-4">
        <div class="hidden md:flex space-x-4">
          <RouterLink to="/dashboard">Accueil</RouterLink>
          <RouterLink to="">Évenement</RouterLink>
          <RouterLink to="">Swag</RouterLink>
          <button @click="logout()"> Déconnexion </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { userSessionStore } from "../../stores/userSession";
import { supabase } from "../../utils/supabase";

const userSession = userSessionStore();

const logout = async () => {
  try {
    await supabase.auth.signOut();
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};

</script>