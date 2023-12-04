<template>
    <div>
      <button @click="togglePopup" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Create Event
      </button>
  
      <!-- Popup -->
      <div v-if="showPopup" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-8 rounded">
          <!-- Formulaire pour créer un événement -->
          <h2 class="text-2xl font-bold mb-4">Créer un événement</h2>
          <form @submit.prevent="createEvent">
            <label for="eventTitle" class="block text-sm font-medium text-gray-700">Titre de l'événement</label>
            <input v-model="eventTitle" type="text" id="eventTitle" name="eventTitle" class="mt-1 p-2 border rounded-md w-full" required>
            <label for="eventDescription" class="block text-sm font-medium text-gray-700">Description de l'événement</label>
            <input v-model="eventDescription" type="text" id="eventDescription" name="eventDescription" class="mt-1 p-2 border rounded-md w-full" required>
            <label for="eventDate" class="block text-sm font-medium text-gray-700">Date de l'événement</label>
            <input v-model="eventDate" type="date" id="eventDate" name="eventDate" class="mt-1 p-2 border rounded-md w-full" required>
            <label for="eventPlace" class="block text-sm font-medium text-gray-700">Lieu de l'événement</label>
            <input v-model="eventPlace" type="text" id="eventPlace" name="eventPlace" class="mt-1 p-2 border rounded-md w-full" required>
            <label for="eventType" class="block text-sm font-medium text-gray-700">Type de l'événement</label>
            <input v-model="eventType" type="text" id="eventType" name="eventType" class="mt-1 p-2 border rounded-md w-full" required>
            <label for="enventOrganisateur" class="block text-sm font-medium text-gray-700">Organisateur de l'événement</label>
            <input v-model="eventOrganisateur" type="text" id="eventOrganisateur" name="eventOrganisateur" class="mt-1 p-2 border rounded-md w-full" required>
  
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
              Créer
            </button>
          </form>
  
          <button @click="togglePopup" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            Fermer
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const showPopup = ref(false);
  const eventTitle = ref("");
  const eventDescription = ref("");
  const eventDate = ref("");
  const eventPlace = ref("");
  const eventType = ref("");
  const eventOrganisateur = ref("");

  
  const togglePopup = () => {
    showPopup.value = !showPopup.value;
  };

  const createEvent = () => {

  // Vous pouvez ajouter ici la logique pour sauvegarder l'événement dans la base de données, etc.

  // Fermer la popup après la création de l'événement
  togglePopup();
};
  </script>
  