"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter()
  return (
    <div className={`${router.pathname === "/" ? "relative" : "absolute"} bottom-0 w-full`}>
      <div
        className="border w-full mt-10"
      >
        <div className="about text-center">
          <Link href="/" className="logo text-2xl font-extrabold">
            MediCare
          </Link>
          <p>Copyright@ 2023 developed by Prateek Kumar. All right reserved.</p>
        </div>
      </div>
    </div>
  );
}
