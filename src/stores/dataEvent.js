import { defineStore } from "pinia";
import { supabase } from "../utils/supabase";

export const useDataEventStore = defineStore({
  id: "dataEvent",
  state:() => ({
    events: null,
    participateurCount: 0,
  }),

  actions: {
    async getUserEvents(userId) {
      try {
        const { data, error } = await supabase
          .from("participation")
          .select("*")
          .eq("user_id", userId);
        this.events = data; 
      } catch(error) {
        console.error(error);
      }
    },

    async getEvent(eventId) {
      try {
        const { data, error } = await supabase
          .from("evenements")
          .select("*")
          .eq("event_id", eventId);
        this.events = data; 
      } catch(error) {
        console.error(error);
      }
    },

    async joinEvent(eventId, userId) {
      const { data, error } = await supabase.from("participation").upsert([
          {
            event_id: eventId,
            user_id: userId
          },
        ]);
        if (error) {
          console.error("Erreur lors de la partitipation a l'event:", error);
        }
    },

    async leaveEvent(eventId, userId) {
      try{
        await supabase.from("participation")
        .delete()
        .eq("user_id", userId)
        .eq("event_id", eventId);
      }
      catch (error) {
        console.error(error);
      }
    },

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
    
    async loadEventParticipationCount(event_id) {
      try {
        const { data, error } = await supabase
          .from('participation')
          .select('*')
          .eq('event_id', event_id.value)
        this.participateurCount = data; 
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
            lieu: arg.lieu,
            organisateur_id: id,

          }
        );
      } catch (error) {
        console.error(error);
      }
    },

    async deleteEvent(id, uID) {
      try{
        await supabase.from("evenements")
        .delete()
        .eq("organisateur_id", uID)
        .eq("event_id", id);
      }
      catch (error) {
        console.error(error);
      }
    },

    async updateEvent(arg, uId) {
      try {
        await supabase.from("evenements")
        .update({
          titre: arg.titre,
          description: arg.description,
          lieu: arg.lieu,
          type_evenement: arg.type_evenement,
          date: arg.date
        })
        .eq("event_id", arg.event_id);

      } 
      catch(error) {
        console.error(error);
      }
    }    
  }
});