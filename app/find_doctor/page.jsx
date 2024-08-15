"use client";

import "@/styles/globals.css";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

export default function FindDoctor() {
  const router = useRouter();
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRes, setFilteredRes] = useState([]);
  const [hidden, setHidden] = useState(true);
  const [bookId, setBookId] = useState("id1");
  const parentRef = useRef(null);
  const handleHiddenComponent = () => {
    setHidden(!hidden);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (parentRef.current && !parentRef.current.contains(event.target))
        setHidden(true);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [parentRef]);
  const handleSearch = async (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("q", searchQuery);
    router.push(`?${params.toString()}`);
    try {
      const res = await fetch(`/api/doctor/search/${searchQuery}`);
      const data = await res.json();
      setFilteredRes(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleBookId = () => {};
  // if (!session) redirect("/");
  return (
    <div>
      <div>
        <div
          className={`blur_screen w-full h-full absolute top-0 bg-white bg-opacity-10 backdrop-blur ${
            hidden ? "hidden" : "block"
          }`}
        ></div>
        <div className="text flex" ref={parentRef}>
          <p className="mt-5 mx-auto text-xl font-bold sm:text-2xl lg:text-3xl">
            Find a Doctor
          </p>
        </div>
        <div className="flex mt-10 sm:w-2/3 md:w-1/2 mx-auto">
          <form onSubmit={handleSearch} className="search flex mx-auto w-2/3">
            <input
              type="text"
              className="border-b w-full py-2 px-2 border-gray-400 focus:border-b focus:border-transparent focus:outline-none"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="border px-4 border-blue-500 text-blue-500 transition-all hover:bg-blue-500 hover:text-white"
            >
              Search
            </button>
          </form>
        </div>
        <div className="doctor-list mt-10 sm:w-2/3 md:w-1/2 mx-auto">
          <h1 className="ml-5 text-3xl font-bold">List</h1>
          <div className="doctor-card-list">
            {filteredRes && filteredRes.length > 0 ? (
              filteredRes.map((user) => (
                <div className="doctor-card m-5 p-5 shadow-xl rounded-2xl">
                  <div className="flex justify-between">
                    <div className="flex flex-col justify-between">
                      <div className="flex mb-5 gap-2">
                        <Image
                          src={user.creator.image}
                          className="border rounded-full "
                          width={50}
                          height={50}
                        />
                        <div>
                          <div className="flex gap-10">
                            <h3>{user.creator.username}</h3>
                            <div className="flex gap-2">
                              <p>(</p>
                              <p>Report</p>
                              <ReportProblemIcon className="w-6 h-6 text-yellow-500" />
                              <p>)</p>
                            </div>
                          </div>
                          <p>{user.creator.email}</p>
                        </div>
                      </div>
                      <button
                        onClick={handleHiddenComponent}
                        className="border rounded-full px-auto py-2 text-blue-500 border-blue-500 transition-all hover:bg-blue-500 hover:text-white"
                        data-modal-target="default-modal"
                        data-modal-toggle="default-modal"
                      >
                        Book
                      </button>
                    </div>
                    <div className="my-auto">
                      <p>{user.location}</p>
                      <p>{user.specilization}</p>
                      <p>{user.qualification}</p>
                      <p>{user.experience}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No Doctors found..!</p>
            )}
          </div>
        </div>
      </div>
      <div
        className={`${
          hidden ? "hidden" : "block"
        } p-4 rounded-xl absolute w-1/2 top-1/4 left-1/4 shadow-2xl`}
      >
        <h1 className="font-semibold text-xl">Book Appointment</h1>
        <div className="flex justify-around mt-3">
          <button className="border px-4 py-1 rounded-full px-auto py-2 text-blue-500 border-blue-500 transition-all hover:bg-blue-500 hover:text-white">
            Booking
          </button>
          <button className="border px-4 py-1 rounded-full px-auto py-2 text-blue-500 border-blue-500 transition-all hover:bg-blue-500 hover:text-white">
            Non-Avaliablity
          </button>
        </div>
      </div>
    </div>
  );
}
