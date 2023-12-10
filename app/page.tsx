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
      <svg viewBox="0 0 120 25" className="max-w-[240px] drop-shadow-[0px_0_1rem_blue] mb-4 mr-32 max-sm:hidden"><text x="0" y="20" stroke="white" strokeWidth="0.5" strokeDasharray="10" strokeLinecap="round" className="animate-text-dash" fill="rgba(255,255,255,0.4)">Welcome</text>
      </svg>
      <Button onClick={() => handleClick()}>Click me</Button>
    </div>
  )
}
