"use client"
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { login } from "@/lib";
import { useRouter } from "next/router"; // Import useRouter for redirection

export function Log() {
  // const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    const formData = new FormData(event.currentTarget);
    try {
      await login(formData);
      window.location.href = "/chat-room"; // Redirect upon successful login
    } catch (error) {
      setError("Invalid User"); // Set error message if login fails
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center space-x-4">
        <Input
          className="w-[250px]"
          type="password"
          name="password"
          placeholder="Enter your password"
          required
        />
        <ModeToggle />
      </div>
      <div className="mt-5">
        <Button type="submit" variant="secondary" className="w-auto">
          LOGIN
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </form>
  );
}

