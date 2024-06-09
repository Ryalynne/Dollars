import { ModeToggle } from "@/components/ui/ModeToggle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-6">
        <Image
          src="/Logo.png"
          width={250}
          height={250}
          alt="Picture of the DOLLARS"
          className="mx-auto"
        />
        <div className="flex justify-center space-x-4">
          <Input className="w-[250px]" type="password" />
          <ModeToggle />
        </div>
        <div>
          <Link href="chat-room">
            <Button variant="secondary" className="w-auto">
              LOGIN
            </Button>
          </Link>
        </div>
        <div>
          <a href="#faq" className="text-blue-500 underline">
            FAQ
          </a>
          *
          <a href="#chatrules" className="text-blue-500 underline">
            CHAT RULES
          </a>
        </div>
      </div>
    </div>
  );
}
