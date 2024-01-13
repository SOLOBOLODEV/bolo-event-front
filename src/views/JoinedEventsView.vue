<template>
<div>
  <div class="flex items-center justify-center absolute bottom-0 w-full h-full bg-black bg-opacity-25 backdrop-blur z-50" v-if="showPopup">
    <div class="relative w-4/5 bg-gray-300 rounded-xl shadow-lg aspect-w-16 aspect-h-9">
      <div v-for="event in evenements" :key="event">
        <BoloCard v-if="event.event_id === eventId" 
          :title="event.titre"        
          :second-title="event.type_evenement">
            <template #header-right>
              <button class="m-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4" @click="togglePopup(eventId)">
                <span class="mdi mdi-close"></span>
              </button>
            </template>
            <template #description>
              <p class="m-2 text-base ">{{ event.description }}</p>
              <p class="m-2 text-base">Lieu : {{ event.lieu }} </p>
              <p class="m-2 text-base">Date : {{ event.date }}</p>
              <p class="m-2 text-base">Participants : {{ eventParticipationCount }}</p>
            </template>
            <template #detail>
              <input v-model="feedbackText" type="text" placeholder="Feedback" class="m-2 h-9 mt-3 rounded" />
              <button @click="submitFeedback" class="m-3 text-slate-500 hover:text-slate-700 font-bold py-2 px-4 rounded mt-4">
                <span class="mdi mdi-send"></span>
              </button>
              <h3 class="m-2">Mes Feedbacks :</h3>
              <div v-for="feedback in feedbacks" :key="feedback.feedback_id">
                <input v-model="feedback.commentaire" type="text" class="m-2 h-9 mt-3 rounded" :disabled="!isEditing" />
                <button @click="isEditing = !isEditing" class="text-slate-500 hover:text-slate-700 font-bold py-2 px-4 rounded mt-4">  
                  <span class="mdi" :class="isEditing ? 'mdi-close' : 'mdi-pencil'"></span>
                </button>
                <button class="text-slate-500 hover:text-slate-700 font-bold py-2 px-4 rounded mt-4"
                  @click="dataFeedback.editFeedback(feedback.feedback_id, feedback.commentaire)"
                  :disabled="!isEditing"> 
                    <span class="mdi mdi-send"></span>
                  </button>
                <button class="text-slate-500 hover:text-slate-700 font-bold py-2 px-4 rounded" @click="deleteFeedback(feedback.feedback_id)">
                  <span class="mdi mdi-delete"></span>
                </button>
                </div>
              </template>
          <template #footer> 
          <div class="flex justify-end ">
            <button @click="leave(eventId)" class="m-3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 mr-4">
              Quitter l'évènement
            </button>
          </div>
        </template>
        </BoloCard>
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
        <tr v-for="event in evenements" :key="event" class="odd:bg-gray-200 even:bg-gray-50 border-b">
          <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{{ event.titre != null ? event.titre : "non précisé" }}</td>
          <td class="px-6 py-4 text-gray-800">{{ event.lieu != null ? event.lieu : "non précisé" }}</td>
          <td class="px-6 py-4 text-gray-800">{{ event.date != null ? event.date : "non précisé" }}</td>
          <td class="px-6 py-4 text-gray-800">{{ event.type_evenement != null ? event.type_evenement : "non précisé" }} </td>
          <td><button @click="togglePopup(event.event_id)">voir plus</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script setup>
import { useDataEventStore } from "../stores/dataEvent";
import { supabase } from "../utils/supabase";
import { ref, computed } from "vue";
import { userSessionStore } from "../stores/userSession";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useDataFeedbackStore } from "../stores/dataFeedback";
import BoloCard from "../components/card/BoloCard.vue";

const store = useDataEventStore();

const evenements = ref([]);
const showPopup = ref(false);
const eventId = ref("");
const feedbackText = ref("");
const userSession = userSessionStore();
const dataFeedback = useDataFeedbackStore();
const feedbacks = ref([]);
// const feedbacks = computed(() => dataFeedback.getFeedbacks);

const isEditing = ref(false);



const leave = async (eventId) => {
  store.leaveEvent(eventId, userSession.session.user.id);
  toast.success("Evènement quitté", {
    autoClose: 5000,
  });
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
    console.log(data);
    if (error) {
      console.error("Erreur lors de l'envoi du feedback:", error);
    } else {
      feedbackText.value = "";
    }
  }
};



const columns = [
  { name: "titre", label: "Titre" },
  { name: "lieu", label: "Lieu" },
  { name: "date", label: "Date" },
  { name: "type_evenement", label: "Type" }
];

const togglePopup =  async (toggledEventId) => {
  showPopup.value = !showPopup.value;
  eventId.value = toggledEventId;
  await dataFeedback.loadFeedbacks(userSession.session.user.id, eventId.value);
  feedbacks.value = dataFeedback.feedback;
};


const deleteFeedback = async (id) => {
  await dataFeedback.deleteFeedback(id);
  await dataFeedback.loadFeedbacks(userSession.session.user.id, eventId.value);
  feedbacks.value = dataFeedback.feedback;
};

const syncEvent = async () => {
  const eventIds = [];
  await store.getUserEvents(userSession.session.user.id);
  for (const event in store.events) {
    const eventId = store.events[event]["event_id"];
    eventIds.push(eventId);
  };

  for (let eventId in eventIds) {
    eventId = eventIds[eventId];
    await store.getEvent(eventId);
    evenements.value.push(store.events[0]);
  }
};

//Display table on load
syncEvent();

</script>