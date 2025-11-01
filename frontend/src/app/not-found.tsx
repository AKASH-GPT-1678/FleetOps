"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // optional if using shadcn UI

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-50 text-gray-800">
      <h1 className="text-5xl font-bold mb-4">404 😅</h1>
      <p className="text-xl mb-2">Yaha kuch nahi hai!</p>
      <p className="text-sm text-gray-500 mb-6">
        Page not found for <strong>myproject</strong>.
      </p>
      <Button
        onClick={() => router.push("/")}
        className="rounded-full px-6 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition"
      >
        Go Back Home
      </Button>
    </div>
  );
}
