"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";

export default function TodoComponent({ user }: { user: User }) {
  const router = useRouter();


  const update = async (user: User) => {
    await fetch(`/api/todo`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: 'completed',
        id: user.id,
      }),
    });
    router.refresh();
  };

  return (
    <li key={user.id} className="space-x-4">
      <input
        onChange={() => update(user)}
        type="checkbox"
        // checked={user.completed}
      />
      {user.name}
    </li>
  );
  
}