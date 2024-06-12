import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UserList } from "@/components/user-list";
import { ChatList } from "@/components/chat-list";
import { Input } from "@/components/ui/input";
import { postChat } from "../../../../server/src/lib/Controller.js";

export default async function ChatRoom() {
  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex flex-1 m-2">
          <UserList></UserList>
          <div className="flex flex-col flex-1 p-4 space-y-4">
            <form action={postChat}>
              <Input name="username" placeholder="Ryan" />
              <Textarea name="message" />
              <Button variant="secondary" className="self-end">
                SUBMIT
              </Button>
            </form>
            <ChatList></ChatList>
          </div>
        </div>
        <footer className="p-4">&copy; 2024 IT. All rights reserved.</footer>
      </div>
    </>
  );
}
