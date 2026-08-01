import {createClient} from "@supabase/supabase-js";

const PROJECT_URL = "https://xvkdlrgihgdvsaswwzbb.supabase.co";
const API_PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2a2RscmdpaGdkdnNhc3d3emJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxNTk1MzEsImV4cCI6MjA5OTczNTUzMX0.oWIS3Kpte-unPK0JgBx06c15TxolY7sXVSiGTrQmxL8";
export const TABLE_IMAGE = "lesPetitsGeantsImage";
export const TABLE_VIDEO= "lesPetitsGeantsVideo";
export const supabase = supabasePublicConnection();

export function supabasePublicConnection() {
  return createClient(PROJECT_URL, API_PUBLIC_KEY);
}

export async function supabaseAuthenticatedConnection(email: string, password: string) {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function logout(){
    await supabase.auth.signOut();
}