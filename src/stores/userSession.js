import { defineStore } from "pinia";


export const userSessionStore = defineStore({
  id: "userSession",
  state: () => ({
    session: null
  }),
  getters: {
    getUserEmail() {
      return this.session.user.email;
    },
    getUserId() {
      return this.session.user.id;
    }
  },
});