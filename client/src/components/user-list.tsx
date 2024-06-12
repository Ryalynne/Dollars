import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
// import { getChats } from "@/lib/data";
// const getData = async () => {
//   const res = await fetch("https://jsonplaceholder.typicode.com/posts", {cache: "no-store"});
//   if (!res.ok) {
//     throw Error("Something Went Wrong");
//   }
//   return res.json();
// };
export function UserList() {
  //with API
  // const user = await getData();
  //without API
  // const user = await getChats();

  return (
    <>
      <ScrollArea className="mt-4 h-[90vh] w-48 rounded-md border">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium leading-none">Online</h4>
          {/* {user.map((users) => (
          <>
            <div key={users.id} className="text-sm">
              {users.username}
            </div>
            <Separator className="my-2" />
          </>
        ))} */}
        </div>
      </ScrollArea>
    </>
  );
}
