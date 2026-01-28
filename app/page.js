"use client";

import Container from "@/components/Container";
import { useSession } from "next-auth/react";

export default function Home() {
    // Render immediately even while session is loading to avoid blocking first paint.
    // Components can read session via `useSession()` as needed.
    useSession();
    return (
        <main className="">
            <Container />
        </main>
    );
}
