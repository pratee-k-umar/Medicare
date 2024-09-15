"use client";

import "@/styles/globals.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function FindDoctor() {
  const router = useRouter();
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRes, setFilteredRes] = useState([]);
  const [hiddenBook, setHiddenBook] = useState(true);
  const [hiddenReport, setHiddenReport] = useState(true);
  const [bookId, setBookId] = useState("id1");
  const parentRef1 = useRef(null);
  const parentRef2 = useRef(null);
  const [doctorId, setDoctorId] = useState("");
  const handleBookingComponent = (docIds) => {
    const [creatorId, docId] = docIds;
    setSelectedDocId(creatorId);
    setDoctorId(docId);
    setHiddenBook(!hiddenBook);
  };
  const handleReportComponent = () => {
    setHiddenReport(!hiddenReport);
  };
  const [selectedDocId, setSelectedDocId] = useState("");
  const [docOffDays, setDocOffDays] = useState([]);
  const [bookData, setBookData] = useState({
    date: "",
    shift: "",
    time: "",
  });
  const [disabledDates, setDisabledDates] = useState([]);
  const [report, setReport] = useState({
    reason: "",
    description: "",
  });
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (parentRef1.current && !parentRef1.current.contains(event.target)) {
        setHiddenBook(true);
      }
      if (parentRef2.current && !parentRef2.current.contains(event.target)) {
        setHiddenReport(true);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [parentRef1, parentRef2]);
  const [options, setOptions] = useState([]);
  const [submitting, setSubmitting] = useState(false);
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
  useEffect(() => {
    if (docOffDays.length > 0) {
      const dates = docOffDays.map((day) => new Date(day.date));
      setDisabledDates(dates);
    }
  }, [docOffDays]);
  const handleBooking = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const booking = await fetch("api/appointments/new", {
        method: "POST",
        body: JSON.stringify({
          doctor: doctorId,
          user: session.user.id,
          date: bookData.date,
          shift: bookData.shift,
          time: bookData.time,
        }),
      });
      if (booking.ok) {
        alert(
          "Your appointment request has been submitted. Please wait for the request approval."
        );
        setHiddenBook(!hiddenBook);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  const handleReport = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const newReport = await fetch("/api/report/new", {
        method: "POST",
        body: JSON.stringify({
          senderEmail: session.user?.email,
          doctorEmail: filteredRes[0].creator.email,
          reason: report.reason,
          description: report.description,
        }),
      });
      if (newReport.ok) {
        alert(
          "Thank you for submitting the report. We'll look into the matter."
        );
        setHiddenReport(!hiddenReport);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  if (!session) redirect("/");
  return (
    <div>
      <div>
        <div
          className={`blur_screen w-full h-full absolute top-0 bg-white bg-opacity-10 backdrop-blur ${
            hiddenBook ? "hidden" : "block"
          }`}
        ></div>
        <div
          className={`blur_screen w-full h-full absolute top-0 bg-white bg-opacity-10 backdrop-blur ${
            hiddenReport ? "hidden" : "block"
          }`}
        ></div>
        <div className="text flex">
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
                            <div
                              className="flex gap-2 cursor-pointer"
                              onClick={handleReportComponent}
                            >
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
                        onClick={() =>
                          handleBookingComponent([user.creator._id, user._id])
                        }
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
        ref={parentRef1}
        className={`${
          hiddenBook ? "hidden" : "block"
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
              onSubmit={handleBooking}
            >
              <div className="date flex justify-between">
                <p>Date:</p>
                <DatePicker
                  selected={bookData.date ? new Date(bookData.date) : null}
                  onChange={(date) => {
                    if (date) {
                      setBookData({
                        ...bookData,
                        date: date.toISOString().split("T")[0],
                      });
                    } else {
                      setBookData({ ...bookData, date: "" });
                    }
                  }}
                  minDate={new Date()}
                  excludeDates={disabledDates}
                  placeholderText="Select a date"
                />
              </div>
              <div className="shifts flex justify-between">
                <p>Shifts:</p>
                <select
                  name="shifts"
                  id="shifts"
                  value={bookData.shift}
                  onChange={handleShiftChange}
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
                  value={bookData.time}
                  onChange={(e) =>
                    setBookData({ ...bookData, time: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  {options &&
                    options.length > 0 &&
                    options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex justify-between">
                <button
                  className="border px-4 py-2 rounded-full border-red-500 text-red-500 transition-all hover:bg-red-500 hover:text-white"
                  onClick={() => setHiddenBook(!hiddenBook)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="border px-4 py-2 rounded-full border-blue-500 text-blue-500 transition-all hover:bg-blue-500 hover:text-white"
                >
                  {submitting ? "Booking..." : "Book"}
                </button>
              </div>
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
      <div
        ref={parentRef2}
        className={`${
          hiddenReport ? "hidden" : "block"
        } p-4 rounded-xl absolute w-1/3 top-1/4 left-1/3 shadow-2xl`}
      >
        <h1 className="text-center font-extrabold text-2xl">Report</h1>
        <p className="text-center">
          Provide us a appropriate reason and description for why are you
          reporting this person and we will look into the matter. Thank You
        </p>
        <form
          action=""
          onSubmit={handleReport}
          className="mt-10 mx-20 flex flex-col gap-5"
        >
          <input
            type="text"
            value={report.reason}
            onChange={(e) => setReport({ ...report, reason: e.target.value })}
            placeholder="Reason*"
          />
          <textarea
            rows="5"
            value={report.description}
            onChange={(e) =>
              setReport({ ...report, description: e.target.value })
            }
            placeholder="Description*"
          ></textarea>
          <div className="mt-4 flex justify-around">
            <button
              className="border px-4 py-2 rounded-full border-red-500 text-red-500 transition-all hover:bg-red-500 hover:text-white"
              onClick={() => setHiddenReport(!hiddenReport)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="border px-4 py-2 rounded-full border-blue-500 text-blue-500 transition-all hover:bg-blue-500 hover:text-white"
            >
              {submitting ? "Reporting..." : "Report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
