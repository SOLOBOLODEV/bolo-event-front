<template>
  <div>
    <h1>Dashboard</h1>
    <div
      style="display: flex; align-items: center; justify-content: center; z-index: 200; bottom: 0; position: absolute; width: 100%; height: 100%; background-color: hsla(0, 0%, 50%, 25%); backdrop-filter: blur(1px);"
      v-if="showPopup">
      <div
        style="position: relative; width: 80%; aspect-ratio: 16/9; background-color: hsl(0, 0%, 80%); border-radius: 16px; box-shadow: 5px 5px 20px hsl(0, 0%, 20%);">
        <div v-for="event in myEvents" :key="event">
          <div v-if="event.event_id == eventId">
            <h2>{{ event.titre }}</h2>
            <p>type : {{ event.type_evenement }}</p>
            <p>{{ event.description }}</p>
            <p>a {{ event.lieu }} le {{ event.date }}</p>
            
            <h3>Commentaires :</h3>
          <ul v-if="event.comments && event.comments.length">
            <li v-for="comment in event.comments" :key="comment.id">{{ comment.commentaire }}</li>
          </ul>
          <p v-else>Pas de commentaires.</p>
            <button @click="togglePopup(event.event_id)">Retour</button>
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
          <tr v-for="event in myEvents" :key="event" class="odd:bg-gray-200 even:bg-gray-50 border-b">
            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{{ event.titre != null ?
              event.titre : "non précisé" }}</td>
            <td class="px-6 py-4 text-gray-800">{{ event.lieu != null ? event.lieu : "non précisé" }}</td>
            <td><button @click="togglePopup(event.event_id)">Plus</button></td>
            <td><button @click="deleteEvent(event.event_id)">Supprimer</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { userSessionStore } from "../stores/userSession";
import { useDataEventStore } from "../stores/dataEvent";
import { supabase } from "../utils/supabase";
import { ref } from "vue";

const store = useDataEventStore();
const evenements = ref([]);
const showPopup = ref(false);
const eventId = ref("");
const userSession = userSessionStore();
const dataEvent = useDataEventStore();
const myEvents = ref([]);
const userId = userSession.getUserId;
const columns = [
  { name: "titre", label: "Vos Evennements" },
  { name: "lieu", label: "Lieu" },
];

const togglePopup = (toggledEventId) => {
  showPopup.value = !showPopup.value;
  eventId.value = toggledEventId;
};

const syncEvent = async () => {
  await store.loadEventData();
  evenements.value = store.events;
};
syncEvent();

const displayMyEvent = async () => {
  await dataEvent.loadEventData();
  myEvents.value = dataEvent.events;
  const eventList = myEvents.value.filter(event => event.organisateur_id === userId);
  myEvents.value = eventList;

  // Parcourir tous les événements pour récupérer les commentaires
  for (const event of myEvents.value) {
    const { data, error } = await supabase
      .from("feedbacks")
      .select("commentaire")
      .eq("event_id", event.event_id);

    if (error) {
      console.error("Erreur lors de la récupération des commentaires depuis Supabase:", error);
    } else {
      event.comments = data;
    }
  }
};

displayMyEvent();

const deleteEvent = async (id) => {
  console.log(id);
  const userId = await userSession.getUserId;
  console.log(userId);
  await dataEvent.deleteEvent(id, userId);
};

const logout = async () => {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.error(error);
  }
};
</script>
