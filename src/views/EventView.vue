<template>
  <div>
    <h1>Events</h1>
    <button @click="syncEvent()">test</button>

    <!-- <BoloDataTable :data="evenements" :columns="columns" /> -->


    <!-- <ul v-for="event in evenements" :key="event">
      {{ event.titre }}
    </ul> -->

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
import BoloDataTable from "../components/BoloDataTable.vue";
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

// { "event_id": 1, "titre": "Rocket league tournoi", "description": "Tournoi Rocket league ", "date": "2023-05-20", "lieu": "Paris", "type_evenement": "tournoi", "organisateur_id": null }


</script>