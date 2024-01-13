import { defineStore } from "pinia";
import { supabase } from "../utils/supabase";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";


export const useDataFeedbackStore = defineStore({
  id: "dataFeedback",
  state: () => ({
    feedback: []
  }),
  getters: {
    getFeedbacks() {
      return state.feedback;
    }
  },  

  actions: {
    async loadFeedbacks (userId, eventId) {
      try {
        console.log("salut", userId, eventId);
        const { data, error } = await supabase
          .from("feedbacks")
          .select("*")
          .eq("event_id", eventId)
          .eq("user_id", userId)
          .order("feedback_id", { ascending: false });
          this.feedback = data;
      } catch (error) {
        console.error(error);
      }
    },

    async editFeedback (feedbackId, currentCommentaire) {
      try {
        const { data, error } = await supabase
          .from("feedbacks")
          .update({ commentaire: currentCommentaire })
          .eq("feedback_id", feedbackId);
          toast.success("Feedback édité avec succèss", {
            autoClose: 1000
          });
      } catch (error) {
        toast.error("Erreur lors de l'édition des feedbacks", {
          autoClose: 1000
        });
        console.error(error);
      }
    },

    async deleteFeedback (feedbackId) {
      try {
        const { data, error } = await supabase
          .from("feedbacks")
          .delete()
          .eq("feedback_id", feedbackId);
          toast.success("Feedback supprimé avec succès", {
            autoClose: 1000
         });
      } catch (error) {
        toast.error("Erreur lors de la suppression du feedback", {
          autoClose: 1000
       });
        console.error(error);
      }
    }
  }
});