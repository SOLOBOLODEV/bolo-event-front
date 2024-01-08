import { defineStore } from "pinia";
import { supabase } from "../utils/supabase";

export const usedDataFeedbackStore = defineStore({
  id: "dataFeedback",
  state: () => ({
    feedback: null
  }),

  actions: {
    async loadFeedbacks(eventId , userSession) {
      try {
      const { data, error } = await supabase
        .from("feedbacks")
        .select("*")
        .eq("event_id", eventId)
        .eq("user_id", userSession)
        .order("feedback_id", { ascending: false });
        console.log(data)
      this.feedback = data;
      } catch (error){
        console.error(error)
      }
    },


    async editFeedback(feedbackId, currentCommentaire) {
      console.log(feedbackId, currentCommentaire);
      if (currentCommentaire !== null) {
        const { data, error } = await supabase
          .from("feedbacks")
          .update({ commentaire: currentCommentaire })
          .eq("feedback_id", feedbackId);
    
        if (error) {
          console.error("Erreur lors de la modification du feedback:", error);
        } else {
          console.log("Feedback modifié avec succès !");
          feedbackText.value = "";
          loadFeedbacks();
        }
      }
    },
    
    async submitFeedback(){
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
        } else {
          console.log("Feedback envoyé avec succès !");
          feedbackText.value = "";
        }
      }
      loadFeedbacks();
    },
  } 
});