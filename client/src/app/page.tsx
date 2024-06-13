// pages/index.js
import Image from "next/image";
import {Log} from "@/components/login-form"
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
          <div>
         
          <Log ></Log> 
          </div>
        {/* <form onSubmit={handleSubmit} >
          <div className="flex justify-center space-x-4">
            <Input
              className="w-[250px]"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <ModeToggle />
          </div>
          <div className="mt-5">
            <Button type="submit" variant="secondary" className="w-auto">
              LOGIN
            </Button>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
          </div>
        </form> */}
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
