<template>
  <div>
    <div>
      <label class="block py-1">Titre de l'event</label>
      <input type="text" v-model="dataEvent.title"
        class="border w-full py-2 px-2 rounded shadow hover:border-indigo-600 ring-1 ring-inset ring-gray-300 font-mono">
    </div>
    <div>
      <label class="block py-1">Description</label>
      <input type="text" v-model="dataEvent.description"
        class="border w-full py-2 px-2 rounded shadow hover:border-indigo-600 ring-1 ring-inset ring-gray-300 font-mono">
    </div>
    <div>
      <label class="block py-1">Date</label>
      <input type="date" v-model="dataEvent.date"
        class="border w-full py-2 px-2 rounded shadow hover:border-indigo-600 ring-1 ring-inset ring-gray-300 font-mono">
    </div>
    <div>
      <label class="block py-1">Type d'événements</label>
      <input type="text" v-model="dataEvent.eventType"
        class="border w-full py-2 px-2 rounded shadow hover:border-indigo-600 ring-1 ring-inset ring-gray-300 font-mono">
    </div>
    <div class="flex gap-3 pt-3 items-center">
      <button class="border hover:border-indigo-600 px-4 py-2 rounded-lg shadow ring-1 ring-inset ring-gray-300"
        @click="createNewEvent()">Créer l'évènement</button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { userSessionStore } from "../stores/userSession";
import { useDataEventStore } from "../stores/dataEvent";


const dataEvent = reactive({
  title: "",
  description: "",
  date: "",
  eventType: ""
});
const userSession = userSessionStore();
const dataStore = useDataEventStore();
const userId = userSession.getUserId;

const createNewEvent = async () => {
  await dataStore.createEvent(dataEvent, userId);
};

</script>