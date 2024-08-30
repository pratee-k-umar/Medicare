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
  const handleHiddenComponent = (docId) => {
    setSelectedDocId(docId);
    setHidden(!hidden);
  };
  const [selectedDocId, setSelectedDocId] = useState("");
  const [docOffDays, setDocOffDays] = useState([]);
  const [bookData, setBookData] = useState({
    date: "",
    shift: "",
    time: "",
  });
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (parentRef.current && !parentRef.current.contains(event.target))
  //       setHidden(true);
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [parentRef]);
  const [options, setOptions] = useState([]);
  const morningTiming = ["10:00-11:00", "11:00-12:00", "12:00-13:00"];
  const eveningTiming = ["15:00-16:00", "16:00-17:00", "17:00-18:00"];
  useEffect(() => {
    if (bookData.shift === "Morning") setOptions(morningTiming);
    else if (bookData.shift === "Evening") setOptions(eveningTiming);
    else setOptions([]);
  }, [bookData.shift]);
  const handleShiftChange = (e) => {
    setBookData({ ...bookData, shift: e.target.value });
  };
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
  useEffect(() => {
    const fetchOffDays = async () => {
      try {
        const res = await fetch(`api/avaliablity/get/${selectedDocId}`);
        const data = await res.json();
        setDocOffDays(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOffDays();
  }, [selectedDocId]);
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
                        onClick={() => handleHiddenComponent(user.creator._id)}
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
        <h1 className="font-semibold text-2xl text-center">Book Appointment</h1>
        <div className="flex justify-around mt-3">
          <button
            className={`border px-4 py-1 rounded-full px-auto py-2 text-blue-500 border-blue-500 transition-all hover:bg-blue-500 hover:text-white ${
              bookId === "id1" ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => setBookId("id1")}
          >
            Booking
          </button>
          <button
            className={`border px-4 py-1 rounded-full px-auto py-2 text-blue-500 border-blue-500 transition-all hover:bg-blue-500 hover:text-white ${
              bookId === "id2" ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => setBookId("id2")}
          >
            Non-Avaliablity
          </button>
        </div>
        <div>
          <div className={`booking ${bookId === "id1" ? "block" : "hidden"}`}>
            <h1 className="text-center text-xl font-semibold">
              Book Appointment
            </h1>
            <form
              action=""
              className="mt-5 mx-48 flex flex-col gap-5"
              // onSubmit={}
            >
              <div className="date flex justify-between">
                <p>Date:</p>
                <input
                  type="date"
                  // value={avalData.date}
                  // onChange={(e) =>
                  //   setAvalData({ ...avalData, date: e.target.value })
                  // }
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="shifts flex justify-between">
                <p>Shifts:</p>
                <select
                  name="shifts"
                  id="shifts"
                  // value={avalData.shift}
                  // onChange={handleShiftChange}
                >
                  <option value="">Select</option>
                  <option value="Morning">Morning</option>
                  <option value="Evening">Evening</option>
                </select>
              </div>
              <div className="timings flex justify-between">
                <p>Timings:</p>
                <select
                  name="timing"
                  id="timing"
                  // value={avalData.time}
                  // onChange={(e) =>
                  //   setAvalData({ ...avalData, time: e.target.value })
                  // }
                >
                  <option value="">Select</option>
                  {/* {options &&
                    options.length > 0 &&
                    options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))} */}
                </select>
              </div>
              {/* <button className="border px-4 py-2 rounded-full border-blue-500 text-blue-500 transition-all hover:bg-blue-500 hover:text-white flex mx-auto">
                {submitting ? "Updating..." : "Update"}
              </button> */}
            </form>
          </div>
          <div
            className={`non-avaliable ${
              bookId === "id2" ? "block" : "hidden"
            } mt-5`}
          >
            <h1 className="text-center text-xl font-extrabold">
              Non Avaliable Days
            </h1>
            <p className="text-lg text-center mx-5 mt-2">
              These are the days when the doctor is not avaliable. You may book
              appointment other time.
            </p>
            <table className="mt-5 w-full text-center rtl:text-right rounded-xl shadow-lg p-5">
              <thead className="text-gray-500 m-2">
                <tr className="border-b border-gray-700">
                  <th>Date</th>
                  <th>Shift</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody className="text-sm m-3">
                {docOffDays && docOffDays.length > 0 ? (
                  docOffDays.map((day) => (
                    <tr key={day._id}>
                      <td className="">
                        <p>{day.date}</p>
                      </td>
                      <td>
                        <p>{day.shift}</p>
                      </td>
                      <td>
                        <p>{day.time}</p>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No off days..!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
