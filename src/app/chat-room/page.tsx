import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UserList } from "@/components/user-list";
import { ChatList } from "@/components/chat-list";

export default function ChatRoom() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        <UserList></UserList>
        <div className="flex flex-col flex-1 p-4 space-y-4">
          <Textarea />
          <Button variant="secondary" className="self-end">
            SUBMIT
          </Button>
          <ChatList></ChatList>
        </div>
      </div>
      <footer className="p-4">&copy; 2024 IT. All rights reserved.</footer>
    </div>
  );
}
