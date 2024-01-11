import { defineStore } from "pinia";
import { supabase } from "../utils/supabase";

export const useDataFeedbackStore = defineStore({
  id: "dataFeedback",
  state: () => ({
    feedback: []
  }),
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
          console.log(data);
          this.feedback = data;
          console.log(this.feedback);
      } catch (error) {
        console.error(error);
      }
    }
  }
});