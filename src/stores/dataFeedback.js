import { defineStore } from "pinia";
import { supabase } from "../utils/supabase";

export const usedDataFeedbackStore = defineStore({
  id: "dataFeedback",
  state: () => ({
    feedback: null
  }),

  actions: {
    async submitFeedback(feedbackText) {
      try {
        // Vérifier si le contenu du feedback n'est pas vide
        if (feedbackText.value.trim() !== "") {
          // Envoyer le contenu du feedback à la table "feedback"
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
            console.log("Feedback envoyé avec succès !");
            // Réinitialiser le contenu de l'input après l'envoi
            feedbackText.value = "";
          }
        }       
      } catch(error) {
        
      }
    }
  } 
});