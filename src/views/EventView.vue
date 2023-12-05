<template>
  <div>
    <h1>Events</h1>
    <div
      style="display: flex; align-items: center; justify-content: center; z-index: 200; bottom: 0; position: absolute; width: 100%; height: 100%; background-color: hsla(0, 0%, 50%, 25%); backdrop-filter: blur(1px);"
      v-if="showPopup">
      <div
        style="position: relative; width: 80%; aspect-ratio: 16/9; background-color: hsl(0, 0%, 80%); border-radius: 16px; box-shadow: 5px 5px 20px hsl(0, 0%, 20%);">
        <div v-for="event in evenements" :key="event">
          <div v-if="event.event_id == eventId">
            <h2>{{ event.titre }}</h2>
            <p>type : {{ event.type_evenement }}</p>
            <p>{{ event.description }}</p>
            <p>a {{ event.lieu }} le {{ event.date }}</p>
            <button @click="togglePopup(event.event_id)">caca</button>
          </div>
        </div>
      </div>
    </div>

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th v-for="column in columns" :key="column" scope="col" class="px-6 py-3">
              {{ column.label }}
            </th>
            <th>
              En savoir plus
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- Séparer les 2 lignes en composants différents -->
          <tr v-for="event in evenements" :key="event" class="odd:bg-gray-200 even:bg-gray-50 border-b">
            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{{ event.titre != null ?
              event.titre : "non précisé" }}</td>
            <td class="px-6 py-4 text-gray-800">{{ event.lieu != null ? event.lieu : "non précisé" }}</td>
            <td class="px-6 py-4 text-gray-800">{{ event.date != null ? event.date : "non précisé" }}</td>
            <td class="px-6 py-4 text-gray-800">{{ event.type_evenement != null ? event.type_evenement : "non précisé" }}
            </td>
            <td><button @click="togglePopup(event.event_id)">caca</button></td>
            <!-- {{ event }} -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

  
<script setup>
import { useDataEventStore } from "../stores/dataEvent";

import { ref } from "vue";

const store = useDataEventStore();

const evenements = ref([]);
const showPopup = ref(false);
const eventId = ref("");

const columns = [
  { name: "titre", label: "Titre" },
  { name: "lieu", label: "Lieu" },
  { name: "date", label: "Date" },
  { name: "type_evenement", label: "Type" }
];

const togglePopup = (toggledEventId) => {
  showPopup.value = !showPopup.value;
  eventId.value = toggledEventId;
};

const syncEvent = async () => {
  await store.loadEventData();
  evenements.value = store.events;
};

//Display table on load
syncEvent();

</script>