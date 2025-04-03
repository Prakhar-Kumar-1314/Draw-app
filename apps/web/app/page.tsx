'use client'

import { useState } from 'react'
import styles from "./page.module.css";
import { useRouter } from 'next/navigation';

export default function Home() {
  const [roomId, setRoomId] = useState("")
  const router = useRouter();

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100vw",
    }}>
      <input style={{padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc"}} value={roomId} onChange={(e) => setRoomId(e.target.value)} type='text' placeholder='Enter room ID' />
      <button style={{padding: "10px", borderRadius: "5px", border: "none", backgroundColor: "#000", color: "#fff"}} onClick={() => router.push(`/room/${roomId}`)}>
        Join room</button>
    </div>
  )
}