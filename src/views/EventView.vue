<template>
  <div>
    <h1>Events</h1>
    <button @click="syncEvent()">test</button>

    {{ evenements }}
  </div>
</template>

  
<script setup>
import { useDataEventStore } from "../stores/dataEvent";
import { ref } from "vue";

const store = useDataEventStore();
const evenements = ref([]);

const syncEvent = async () => {
  store.loadEventData();
  evenements.value = store.events;
};




</script>