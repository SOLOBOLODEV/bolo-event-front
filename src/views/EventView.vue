<template>
  <div>
    <h1>Events</h1>
    <button @click="syncEvent()">test</button>

    <table>
      <tr>
        <td v-for="column in columns" :key="column">
          {{ column.label }}
        </td>
      </tr>
      <!-- Séparer les 2 lignes en composants différents -->
      <tr>
        <td v-for="event in evenements" :key="event">
          {{ event }}
        </td>
      </tr>
    </table>
  </div>
</template>

  
<script setup>
import { useDataEventStore } from "../stores/dataEvent";

import { ref } from "vue";

const store = useDataEventStore();

const evenements = ref([]);
const columns = [
  { name: "titre", label: "Titre" },
  { name: "lieu", label: "Lieu" },
  { name: "date", label: "Date" },
  { name: "type_evenements", label: "Type" }
];

const syncEvent = async () => {
  store.loadEventData();
  evenements.value = store.events;
  console.log(evenements.value);
};

</script>