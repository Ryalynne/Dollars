"use server"
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UserList } from "@/components/user-list";
import { ChatList } from "@/components/chat-list";
import { Input } from "@/components/ui/input";
import { postChat } from "../../../../server/src/lib/Controller.js";
import { redirect, useRouter } from "next/navigation";
import { getSession, logout } from "@/lib";
export default async function ChatRoom() {
  const session = await getSession();
  return(
    <>
      <div className="flex flex-col h-screen">
        <div className="flex flex-1 m-2">
          <UserList></UserList>
          <div className="flex flex-col flex-1 p-4 space-y-4">
            <form action={postChat}>
              <Input name="username" value={JSON.stringify(session.rows[0].username)} type="hidden"/>
              <Textarea name="message" placeholder="Enter A message"/>
              <Button variant="secondary" className="self-end mt-5">
                SUBMIT
              </Button>
            </form>
            {/* <p>{JSON.stringify(session.rows[0].username)}</p> */}
            <ChatList></ChatList>
          </div>
        </div>
        <footer className="p-4">&copy; 2024 IT. All rights reserved.</footer>
        <form
        action={async () => {
          "use server";
          await logout();
          redirect("/");
        }}
      >
        <button type="submit">Logout</button>
      </form>
      </div>
    </>
  )
}
