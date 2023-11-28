<template>
    <div>
      <h1>Events</h1>
      <table>
        <thead>
          <tr>
            <th>Events id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Date</th>
            <th>Place</th>
            <th>Event Type</th>
            <th>Organizer Id</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="evenements in evenements" :key="evenements.event_id">
            <td>{{ evenements.event_id }}</td>
            <td>{{ evenements.titre }}</td>
            <td>{{ evenements.description }}</td>
            <td>{{ evenements.date }}</td>
            <td>{{ evenements.lieu }}</td>
            <td>{{ evenements.type_evenement }}</td>
            <td>{{ evenements.organisateur_id }}</td>
            
            
          </tr>
        </tbody>
      </table>
     
    </div>
  </template>
<script setup>
import { supabase } from "../utils/supabase";
import { ref } from "vue";
const evenements = ref([]);

async function fetchData() {
  try {
    const { data, error } = await supabase
      .from("evenements")
      .select("*");
    if (error) {
      throw error;
    }

    evenements.value = data;
  } catch (error) {
    console.error(error);
  }
}

fetchData();


</script>