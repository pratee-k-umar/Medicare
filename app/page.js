"use client"

import Container from "@/components/Container";
import "@/styles/globals.css"
import Footer from "@/components/Footer";
import { useSession } from "next-auth/react"
import { useState, useEffect} from "react"
import Loader from "@/components/Loader";

export default function Home() {
  const { status } = useSession()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if(status === "loading") setLoading(true)
    else setLoading(false)
  }, [status])
  if(loading) {
    return (
      <div className="flex flex-row justify-center items-center min-h-screen w-[100hw]">
        <Loader />
      </div>
    )
  }
  return (
    <main className="">
        <Container />
        {/* <Footer /> */}
    </main>
  )
}