<template>
  <div>
    <h1>Dashboard</h1>
    <button @click="logout()"> Déconnexion </button>
  </div>
</template>

<script setup>
import { userSessionStore } from "../stores/userSession";
import { supabase } from "../utils/supabase";

const userSession = userSessionStore();

const logout = async () => {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.error(error);
  }
};

</script>