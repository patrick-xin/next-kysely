'use client';

import { Button } from "@/components/ui/button"

export default function Home() {
  const handleClick = async () => {
    await fetch('/api/chat',
      {
        method: "POST", headers: {
          "Content-type": "Application/json"
        },
        body: JSON.stringify({ message: "What's largest mammal on earth?" })
      })
  }
  return (
    <div>
      <Button onClick={() => handleClick()}>Click me</Button>
    </div>
  )
}
