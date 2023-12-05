import { defineStore } from "pinia";
import { supabase } from "../utils/supabase";

export const useDataEventStore = defineStore({
  id: "dataEvent",
  state:() => ({
    events: null
  }),

  getters: {
    getMyEvents(id) {
      const response = this.events.map(event => {
        let res = [];
        if (event.organisateur_id === id) {
          res.push(event);
        }
        return res;
      });
      return response;
    },
  },

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
    },

    async deleteEvent(id) {
      try{
        await supabase.from("evenements").delete().eq("event_id", id);
      }
      catch (error) {
        console.error(error);
      }
    } 

  }
});