import { createClient } from "../../../supabase/client";


export default async function Notes() {
  const supabase = createClient();
  const { data: notes } = await supabase.from("user_tbl").select();

  return <pre>{JSON.stringify(notes, null, 2)}</pre>

}