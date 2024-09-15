"use client";

import "@/styles/globals.css";
import Image from "next/image";
import Icon1 from "@/public/images/icon01.png";
import Icon2 from "@/public/images/icon02.png";
import Icon3 from "@/public/images/icon03.png";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import Link from "next/link";
import Footer from "./Footer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Blogs from "./Blogs";
import Doc1 from "@/public/images/doc1.png";
import Doc2 from "@/public/images/doc2.png";
import Doc3 from "@/public/images/doc3.png";

export default function Container() {
  const { data: session } = useSession();
  const router = useRouter();
  const redirection = () => {
    if (session?.user) router.push("/find_doctor");
    else router.push("/sign_in");
  };
  return (
    <div className="mt-10 ">
      <div className="flex flex-wrap justify-around">
        <div className="w-full sm:w-1/2 p-4 m-5">
          <div className="mx-1">
            <p className="text-3xl md:text-5xl lg:text-7xl font-bold">
              We help patients live a healthy, longer life.
            </p>
          </div>
          <div className="mt-10 mx-1">
            <p className="font-semibold text-gray-500">
              Medicine is not only a science; it is also an art. It does not
              consist of compounding pills and plasters; it deals with the very
              processes of life, which must be understood before they may be
              guided. – Paracelsus<br/> Your health is just a click away. Book
              your appointments online and take the first step towards a
              healthier tomorrow.
            </p>
          </div>
        </div>
        <div className="shapeBackground flex">
          <Image
            src={Doc1}
            className="docImage1 border-8 rounded-3xl border-amber-300 shadow-xl shadow-amber-100"
            style={{
              width: "250px",
              height: "auto",
              objectFit: "scale-down",
              marginRight: "-100px",
              marginTop: "40px",
              marginBottom: "20px",
            }}
          />
          <Image
            src={Doc2}
            className="docImage2"
            style={{
              width: "250px",
              height: "auto",
              objectFit: "scale-down",
              marginTop: "150px",
              backgroundColor: "transparent",
              zIndex: "2",
            }}
          />
          <Image
            src={Doc3}
            className="docImage3 border-8 rounded-3xl border-amber-300 shadow-xl shadow-amber-100"
            style={{
              width: "250px",
              height: "auto",
              objectFit: "scale-down",
              marginLeft: "-130px",
              marginBottom: "40px",
            }}
          />
        </div>
      </div>
      <div className="appoint mt-10 flex sm:w-1/2 sm:mx-16 sm:block">
        <button
          onClick={redirection}
          className={`mx-auto border border-blue-500 text-white font-semibold text-xl py-3 px-4 rounded-full bg-blue-500 transition-all ${
            !session
              ? "hover:bg-blue-300 hover:border-blue-300"
              : "hover:bg-white hover:text-blue-500"
          } shadow-xl`}
          disabled={!session}
        >
          Book an Appointment
        </button>
      </div>
      <div className="sm:flex sm:mx-16 sm:mt-10">
        <div className="ml-3 mt-6">
          <p className="text-2xl font-extrabold">30+</p>
          <div className="m-0 rounded-full w-20 h-2 bg-yellow-500"></div>
          <p className="text-gray-500 mt-3 font-bold">Years of experience</p>
        </div>
        <div className="ml-3 mt-6">
          <p className="text-2xl font-extrabold">15+</p>
          <div className="m-0 rounded-full w-20 h-2 bg-purple-500"></div>
          <p className="text-gray-500 mt-3 font-bold">Clinic Locations</p>
        </div>
        <div className="ml-3 mt-6">
          <p className="text-2xl font-extrabold">100%</p>
          <div className="m-0 rounded-full w-20 h-2 bg-green-600"></div>
          <p className="text-gray-500 mt-3 font-bold">Patient Satisfication</p>
        </div>
      </div>
      <div className="mt-10">
        <p className="mx-6 text-xl sm:text2xl md:text-3xl lg:text-4xl font-bold text-center md:w-1/3 md:mx-auto">
          Providing the best medical services
        </p>
      </div>
      <div className="mt-5">
        <p className="mx-4 text-sm text-gray-500 text-center md:w-1/3 md:mx-auto">
          World-class care for everyone. Our health System offers unmatched,
          expert health care.
        </p>
      </div>
      <div className="md:flex md:mt-10 md:justify-between md:mx-48">
        <div className="block">
          <div className="image1 mt-10">
            <Image src={Icon1} className="mx-auto" />
          </div>
          <div className="mt-5">
            <p className="text-center text-2xl font-semibold">Find a doctor</p>
            <Link href="/" className="font-thin flex">
              <ArrowForwardRoundedIcon className="mt-5 mx-auto border border-gray-600 w-10 h-10 rounded-full" />
            </Link>
          </div>
        </div>
        <div className="block">
          <div className="image2 mt-10">
            <Image src={Icon2} className="mx-auto" />
          </div>
          <div className="mt-5">
            <p className="text-center text-2xl font-semibold">
              Find a Location
            </p>
            <Link href="/" className="font-thin flex">
              <ArrowForwardRoundedIcon className="mt-5 mx-auto border border-gray-600 w-10 h-10 rounded-full" />
            </Link>
          </div>
        </div>
        <div className="block">
          <div className="image2 mt-10">
            <Image src={Icon3} className="mx-auto" />
          </div>
          <div className="mt-5">
            <p className="text-center text-2xl font-semibold">
              Book Appointment
            </p>
            <Link href="/" className="font-thin flex">
              <ArrowForwardRoundedIcon className="mt-5 mx-auto border border-gray-600 w-10 h-10 rounded-full" />
            </Link>
          </div>
        </div>
      </div>
      {/* <div className="mt-10">
        <p className="text-center text-xl font-bold sm:text2xl md:text-3xl lg:text-4xl">
          Our Blogs
        </p>
        <p className="text-center mt-5 text-sm mx-10 sm:w-1/2 sm:mx-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
          distinctio dicta ipsum alias consequuntur unde cumque repellat nisi ad
          soluta!
        </p>
      </div>
      <Blogs /> */}
      <div className="mt-4">
        <p className="text-center text-xl font-bold md:text-start md:text-4xl md:w-1/3 md:mx-28">
          Get Virtual Treatment anytime
        </p>
        <div className="list mx-8 mt-3 flex flex-col gap-3 md:w-1/3 md:mx-32">
          <p>1. Schedule the apppointment directly.</p>
          <p>
            2. Search for your physican here, and contact their office directly.
          </p>
          <p>
            3. View our physicans who are accepting new patients, use the online
            scheduling tool to select an appointment time.
          </p>
        </div>
        <div className="appoint mt-10 flex md:w-1/2 md:mx-28 md:block">
          <button
            onClick={redirection}
            className={`mx-auto border border-blue-500  text-white font-semibold text-xl py-3 px-4 rounded-full bg-blue-500 transition-all ${
              !session
                ? "hover:bg-blue-300 hover:border-blue-300"
                : "hover:bg-white hover:text-blue-500"
            } shadow-xl`}
            disabled={!session}
          >
            Book an Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
