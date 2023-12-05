<template>
  <div>
    <h1>Dashboard</h1>

    <div>
      <li v-for="event in myEvents" :key="event">
        {{ event }}
        <button @click="deleteEvent(event.event_id)">Supprimer</button>
      </li>
      {{ userId }}
    </div>
  </div>
</template>

<script setup>
import { userSessionStore } from "../stores/userSession";
import { useDataEventStore } from "../stores/dataEvent";
import { supabase } from "../utils/supabase";
import { ref } from "vue";

const userSession = userSessionStore();
const dataEvent = useDataEventStore();
const myEvents = ref([]);
const userId = userSession.getUserId;

const displayMyEvent = async () => {
  await dataEvent.loadEventData();
  myEvents.value = dataEvent.events;
  const eventList = myEvents.value.filter(event => event.organisateur_id === userId);
  myEvents.value = eventList;
};

const deleteEvent = async (id) => {
  console.log(id);
  const userId = await userSession.getUserId;
  console.log(userId);
  await dataEvent.deleteEvent(id, userId);
};

displayMyEvent();



const logout = async () => {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.error(error);
  }
};

</script>