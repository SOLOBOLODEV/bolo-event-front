<template>
  <div>
    <h1>Dashboard</h1>

    <div>
      {{ myEvents }}
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

const displayMyEvent = async () => {
  await dataEvent.loadEventData();
  myEvents.value = dataEvent.events;
  myEvents.value.map(event => {
    let res = [];
    if (event.organisateur_id === userSession.getUserId) {
      res.push(event);
    }
    return res;
  });
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