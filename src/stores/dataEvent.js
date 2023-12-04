import { defineStore } from "pinia";
import { supabase } from "../utils/supabase";

export const useDataEventStore = defineStore({
  id: "dataEvent",
  state:() => ({
    events: null
  }),

  actions: {
    async loadEventData() {
      try {
        const { data, error } = await supabase
          .from("evenements")
          .select("*");
        this.events = data; 
      } catch(error) {
        console.error(error);
      }
    },
    
    async createEvent(arg, id) {
      try {
        await supabase.from("evenements").insert(
          {
            titre: arg.title, 
            description: arg.description,
            date: arg.date,
            type_evenement: arg.eventType,
            organisateur_id: id
          }
        );
      } catch (error) {
        console.error(error);
      }
    }
  }
});