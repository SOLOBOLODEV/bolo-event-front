<template>
  <div>
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
            <p>participants : {{ eventParticipationCount }}</p>
            <input v-model="feedbackText" type="text" placeholder="Feedback" class="h-15 mt-3" />
            <!-- Utilisation de mt-4 pour ajouter un espacement en haut -->
            <button @click="submitFeedback"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Envoyer le
              Feedback</button>
            <button @click="join(eventId)"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Rejoindre</button>
            <button @click="togglePopup(eventId)"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Fermer</button>
           <h3>Mes Feedbacks :</h3>
           <div v-for="feedback in feedbacks" :key="feedback.feedback_id">
            <input v-model="feedback.commentaire" type="text" class="h-15 mt-3" />
            <button @click="editFeedback(feedback.feedback_id, feedback.commentaire)">Modifier le Feedback</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs uppercase bg-gray-700 text-gray-400">
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
            <td><button @click="togglePopup(event.event_id)">voir plus</button></td>
            <!-- {{ event }} -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

  
<script setup>
import { useDataEventStore } from "../stores/dataEvent";
import { supabase } from "../utils/supabase";
import { ref } from "vue";
import { userSessionStore } from "../stores/userSession";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const store = useDataEventStore();

const eventParticipationCount = ref(0);
const evenements = ref([]);
const showPopup = ref(false);
const eventId = ref("");
const feedbackText = ref("");
const userSession = userSessionStore();
const feedbacks = ref([]);


const join = async (eventId) => {
  store.joinEvent(eventId, userSession.session.user.id);
  toast.success("Evènement rejoint", {
    autoClose: 5000,
  });
};

const loadFeedbacks = async () => {
  const { data, error } = await supabase
    .from("feedbacks")
    .select("*")
    .eq("event_id", eventId.value)
    .eq("user_id", userSession.session.user.id)
    .order("feedback_id", { ascending: false });
  if (error) {
    console.error("Erreur lors du chargement des feedbacks:", error);
  } else {
    feedbacks.value = data;
  }
};

const editFeedback = async (feedbackId, currentCommentaire) => {
  if (currentCommentaire !== null) {
    const { data, error } = await supabase
      .from("feedbacks")
      .update({ commentaire: currentCommentaire })
      .eq("feedback_id", feedbackId);

    if (error) {
      console.error("Erreur lors de la modification du feedback:", error);
    } else {
      feedbackText.value = "";
      loadFeedbacks();
    }
  }
};

const updateParticipationCount = async (eventId) => {
  await store.loadEventParticipationCount(eventId);
  eventParticipationCount.value = store.participateurCount.length;
};

const submitFeedback = async () => {
  if (feedbackText.value.trim() !== "") {
    const { data, error } = await supabase.from("feedbacks").upsert([
      {
        event_id: eventId.value,
        commentaire: feedbackText.value,
        user_id: userSession.session.user.id,
      },
    ]);
    if (error) {
      console.error("Erreur lors de l'envoi du feedback:", error);
    }
  }
  loadFeedbacks();
};

const columns = [
  { name: "titre", label: "Titre" },
  { name: "lieu", label: "Lieu" },
  { name: "date", label: "Date" },
  { name: "type_evenement", label: "Type" }
];

const togglePopup = async (toggledEventId) => {
  showPopup.value = !showPopup.value;
  eventId.value = toggledEventId;
  await updateParticipationCount(eventId)
  loadFeedbacks();
};

const syncEvent = async () => {
  await store.loadEventData();
  evenements.value = store.events;
};
//Display table on load
syncEvent();

</script>