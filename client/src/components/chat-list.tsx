"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

// import { getChats } from "@/lib/data";
// const getData = async () => {
//   const res = await fetch("https://jsonplaceholder.typicode.com/posts" , {cache: "no-store"});
//   if (!res.ok) {
//     throw Error("Something Went Wrong");
//   }
//   return res.json();
// };

export function ChatList() {
  //with API
  // const posts = await getData();

  //without API
  // const chatMessages = await getChats();

  //socket.io

  const socket = useMemo(() => io("http://localhost:4000"), []);
  const [chatMessages, setMessage] = useState("");
  socket.on("connect", () => {
    console.log("Connected");
  });

  useEffect(() => {
    socket.on("messages", (chats) => {
      setMessage(chats);
    });
  }, [socket]);
  return (
    <>
      <ScrollArea className="mt-4 h-[75vh] w-100 rounded-md border">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium leading-none">Chats</h4>
          {Array.isArray(chatMessages) &&
            chatMessages.map((post) => (
              <>
                <div key={post.id} className="text-sm">
                  <p>
                    {post.username} > {post.message}
                  </p>
                </div>
                <Separator className="my-2" />
              </>
            ))}
        </div>
      </ScrollArea>
    </>
  );
}
