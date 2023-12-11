<template>
  <nav class="navbar flex top-0 w-full bg-white border-b border-gray-200 relative z-10">
    <div class="container mx-auto flex items-center justify-between p-4">
      <div class="flex items-center space-x-4">
        <SbdLogo />
      </div>
      <div class="flex items-center space-x-4">
        <div class="hidden md:flex space-x-4">
          <RouterLink to="/dashboard">Accueil</RouterLink>
          <RouterLink to="/events">Évenement</RouterLink>
          <RouterLink to="/create-event">Create events</RouterLink>
          <button @click="logout()"> Déconnexion </button>
        </div>
        <!-- Ajout d'un bouton pour le menu sur les écrans de taille inférieure à md -->
        <div class="md:hidden">
          <button @click="toggleMobileMenu" class="text-gray-500 hover:text-gray-700">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
      <!-- Menu mobile -->
      <div v-if="showMobileMenu" class="md:hidden absolute top-16 right-0 bg-white border border-gray-200 p-4 space-y-2">
        <RouterLink to="/dashboard" @click="toggleMobileMenu">Accueil</RouterLink>
        <RouterLink to="/events" @click="toggleMobileMenu">Évenement</RouterLink>
        <RouterLink to="/create-event" @click="toggleMobileMenu">Créer Évenement</RouterLink>
        <button @click="logout(); toggleMobileMenu()"> Déconnexion </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { supabase } from "../../utils/supabase";
import SbdLogo from "../icons/SbdLogo.vue";

const showMobileMenu = ref(false);

const logout = async () => {
  try {
    await supabase.auth.signOut();
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};
</script>
