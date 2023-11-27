import { defineStore } from "pinia";
import { ref } from "vue";
import { createClient } from "@supabase/supabase-js";




export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const token = ref(null);
  const session = ref(null);
  const supaBaseUrl = import.meta.env.SUPABASE_URL;
  const supaBaseAnonKey = import.meta.env.SUPABASE_ANON_KEY;
  const supabase = createClient(supaBaseUrl, supaBaseAnonKey);

  const signUp = async (mail, pwd) => {
    await supabase.auth.signUp(
      {
        email: mail,
        password: pwd,
      });
  };
  
});

