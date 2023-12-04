<template>
  <div>
    <button @click="togglePopup" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Join Event
    </button>

    <!-- Popup -->
    <div v-if="showPopup" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-8 rounded">
        <!-- Affichage des données de la base de données -->
        <p v-if="eventData">{{ eventData }}</p>
        <p v-else>Loading...</p>

        <button @click="togglePopup" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          Fermer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../../utils/supabase"; // Assurez-vous d'avoir le fichier de configuration supabase

const showPopup = ref(false);
const eventData = ref(null);

const togglePopup = () => {
  showPopup.value = !showPopup.value;
};

const fetchEvenements = async() => {
  return await supabase
    .from("evenements")
    .select("*");
};

onMounted(async () => {
  console.log(fetchEvenements);
  // Fetch all rows from the "evenements" table
  const { data, error } = await fetchEvenements();

  if (error) {
    console.error("Error fetching data from Supabase:", error);
  } else {
    eventData.value = data;
  }
});
</script>
