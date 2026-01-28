"use client";

import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";

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
    const [selectedDocId, setSelectedDocId] = useState("");
    const [bookData, setBookData] = useState({ date: "", shift: "", time: "" });
    const [options, setOptions] = useState([]);
    const [docOffDays, setDocOffDays] = useState([]);
    const [disabledDates, setDisabledDates] = useState([]);
    const [report, setReport] = useState({ reason: "", description: "" });
    const [submitting, setSubmitting] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const morningTiming = ["10:00-11:00", "11:00-12:00", "12:00-13:00"];
    const eveningTiming = ["15:00-16:00", "16:00-17:00", "17:00-18:00"];

    useEffect(() => {
        if (bookData.shift === "Morning") setOptions(morningTiming);
        else if (bookData.shift === "Evening") setOptions(eveningTiming);
        else setOptions([]);
    }, [bookData.shift]);

    // Do not fetch doctors on mount to avoid showing all results by default.
    // Results will populate only after a user performs a search.

    // Live search: debounce user input and fetch results
    useEffect(() => {
        const q = searchQuery.trim();
        if (!q) {
            setFilteredRes([]);
            setSearchLoading(false);
            return;
        }
        const controller = new AbortController();
        const timer = setTimeout(async () => {
            try {
                setSearchLoading(true);
                const url = `/api/doctor/search?q=${encodeURIComponent(q)}`;
                const res = await fetch(url, { signal: controller.signal });
                const data = await res.json();
                setFilteredRes(data || []);
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.log(err);
                }
            } finally {
                setSearchLoading(false);
            }
        }, 300);
        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [searchQuery]);

    const handleShiftChange = (e) => {
        setBookData({ ...bookData, shift: e.target.value });
    };

    useEffect(() => {
        const fetchOffDays = async () => {
            if (!selectedDocId) return;
            try {
                const res = await fetch(
                    `/api/avaliablity/get/${selectedDocId}`,
                );
                const data = await res.json();
                setDocOffDays(data || []);
            } catch (err) {
                console.log(err);
            }
        };
        fetchOffDays();
    }, [selectedDocId]);

    const handleBooking = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await fetch("/api/appointments/new", {
                method: "POST",
                body: JSON.stringify({
                    userId: selectedDocId,
                    doctor: doctorId,
                    date: bookData.date,
                    shift: bookData.shift,
                    time: bookData.time,
                }),
            });
            alert("Booking submitted");
            setHiddenBook(true);
        } catch (err) {
            console.log(err);
        } finally {
            setSubmitting(false);
        }
    };

    const handleReport = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await fetch("/api/report/new", {
                method: "POST",
                body: JSON.stringify({
                    user: selectedDocId,
                    reason: report.reason,
                    description: report.description,
                }),
            });
            alert("Report submitted");
            setHiddenReport(true);
        } catch (err) {
            console.log(err);
        } finally {
            setSubmitting(false);
        }
    };
    const handleBookingComponent = (docIds) => {
        const [creatorId, docId] = docIds;
        setSelectedDocId(creatorId);
        setDoctorId(docId);
        setHiddenBook(!hiddenBook);
    };
    const handleReportComponent = () => {
        setHiddenReport(!hiddenReport);
    };

    return (
        <div className="p-4">
            <div className="max-w-2xl mx-auto mt-6">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, specialization, or location"
                    className="w-full border rounded-md px-3 py-2"
                />
            </div>

            <div className="doctor-list mt-10 sm:w-2/3 md:w-1/2 mx-auto">
                <h1 className="ml-5 text-3xl font-bold">List</h1>
                <div className="doctor-card-list">
                    {filteredRes && filteredRes.length > 0 ? (
                        filteredRes.map((user) => (
                            <div
                                key={user._id}
                                className="doctor-card mb-4 p-4 sm:p-5 shadow-xl rounded-2xl flex flex-col md:flex-row gap-4 items-start"
                            >
                                <div className="flex items-start gap-4 w-full md:w-2/3">
                                    <div className="avatar flex-shrink-0">
                                        <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden">
                                            <Image
                                                src={user.creator.image}
                                                alt="Doctor profile"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between md:justify-start gap-3">
                                            <h3 className="text-base sm:text-lg font-semibold">
                                                {user.creator.username}
                                            </h3>
                                            <div
                                                className="flex gap-2 items-center cursor-pointer text-sm md:ml-4"
                                                onClick={handleReportComponent}
                                            >
                                                <ReportProblemIcon className="w-5 h-5 text-yellow-500" />
                                                <span className="sr-only">
                                                    Report
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            {user.creator.email}
                                        </p>
                                        <div className="mt-3 md:mt-4">
                                            <button
                                                onClick={() =>
                                                    handleBookingComponent([
                                                        user.creator._id,
                                                        user._id,
                                                    ])
                                                }
                                                className="w-full md:w-auto border rounded-full px-4 py-2 text-blue-500 border-blue-500 transition-all hover:bg-blue-500 hover:text-white"
                                            >
                                                Book
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="details mt-4 md:mt-0 md:ml-6 text-sm text-gray-700 w-full md:w-1/3">
                                    <p className="truncate">{user.location}</p>
                                    <p className="truncate">
                                        {user.specilization}
                                    </p>
                                    <p className="truncate">
                                        {user.qualification}
                                    </p>
                                    <p className="truncate">
                                        {user.experience}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No Doctors found..!</p>
                    )}
                </div>
            </div>
            <div
                ref={parentRef1}
                className={`${hiddenBook ? "hidden" : "fixed"} inset-0 z-50 flex items-center justify-center p-4`}
            >
                <div className="w-full max-w-xl rounded-xl p-6 shadow-2xl">
                    <h1 className="font-semibold text-2xl text-center">
                        Book Appointment
                    </h1>

                    <div className="flex justify-center gap-3 mt-4">
                        <button
                            className={`border px-4 rounded-full py-2 text-blue-500 border-blue-500 transition-all hover:bg-blue-500 hover:text-white ${
                                bookId === "id1" ? "bg-blue-500 text-white" : ""
                            }`}
                            onClick={() => setBookId("id1")}
                        >
                            Booking
                        </button>
                        <button
                            className={`border px-4 rounded-full py-2 text-blue-500 border-blue-500 transition-all hover:bg-blue-500 hover:text-white ${
                                bookId === "id2" ? "bg-blue-500 text-white" : ""
                            }`}
                            onClick={() => setBookId("id2")}
                        >
                            Non-Availability
                        </button>
                    </div>

                    <div className="mt-5">
                        {/* Booking form */}
                        <div
                            className={`${bookId === "id1" ? "block" : "hidden"}`}
                        >
                            <h2 className="text-center text-xl font-semibold">
                                Book Appointment
                            </h2>
                            <form
                                action=""
                                className="mt-5 w-full max-w-md mx-auto flex flex-col gap-4"
                                onSubmit={handleBooking}
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                    <label className="w-full sm:w-1/3">
                                        Date:
                                    </label>
                                    <div className="w-full sm:w-2/3">
                                        <DatePicker
                                            selected={
                                                bookData.date
                                                    ? new Date(bookData.date)
                                                    : null
                                            }
                                            onChange={(date) => {
                                                if (date) {
                                                    setBookData({
                                                        ...bookData,
                                                        date: date
                                                            .toISOString()
                                                            .split("T")[0],
                                                    });
                                                } else {
                                                    setBookData({
                                                        ...bookData,
                                                        date: "",
                                                    });
                                                }
                                            }}
                                            minDate={new Date()}
                                            excludeDates={disabledDates}
                                            placeholderText="Select a date"
                                            className="w-full"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                    <label className="w-full sm:w-1/3">
                                        Shifts:
                                    </label>
                                    <select
                                        name="shifts"
                                        id="shifts"
                                        value={bookData.shift}
                                        onChange={handleShiftChange}
                                        className="w-full sm:w-2/3 border rounded px-2 py-1"
                                    >
                                        <option value="">Select</option>
                                        <option value="Morning">Morning</option>
                                        <option value="Evening">Evening</option>
                                    </select>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                    <label className="w-full sm:w-1/3">
                                        Timings:
                                    </label>
                                    <select
                                        name="timing"
                                        id="timing"
                                        value={bookData.time}
                                        onChange={(e) =>
                                            setBookData({
                                                ...bookData,
                                                time: e.target.value,
                                            })
                                        }
                                        className="w-full sm:w-2/3 border rounded px-2 py-1"
                                    >
                                        <option value="">Select</option>
                                        {options &&
                                            options.length > 0 &&
                                            options.map((option, index) => (
                                                <option
                                                    key={index}
                                                    value={option}
                                                >
                                                    {option}
                                                </option>
                                            ))}
                                    </select>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 justify-center mt-2">
                                    <button
                                        className="w-full sm:w-auto border px-4 py-2 rounded-full border-red-500 text-red-500 transition-all hover:bg-red-500 hover:text-white"
                                        onClick={() => setHiddenBook(true)}
                                        type="button"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="w-full sm:w-auto border px-4 py-2 rounded-full border-blue-500 text-blue-500 transition-all hover:bg-blue-500 hover:text-white"
                                    >
                                        {submitting ? "Booking..." : "Book"}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Non-availability list */}
                        <div
                            className={`${bookId === "id2" ? "block" : "hidden"} mt-5`}
                        >
                            <h2 className="text-center text-xl font-extrabold">
                                Non-Available Days
                            </h2>
                            <p className="text-center mt-2">
                                These are the days when the doctor is not
                                available. You may book appointment other time.
                            </p>
                            <div className="mt-4 overflow-x-auto">
                                <table className="min-w-full text-center rounded-xl shadow-lg">
                                    <thead className="text-gray-500">
                                        <tr className="border-b">
                                            <th className="px-3 py-2">Date</th>
                                            <th className="px-3 py-2">Shift</th>
                                            <th className="px-3 py-2">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {docOffDays && docOffDays.length > 0 ? (
                                            docOffDays.map((day) => (
                                                <tr key={day._id}>
                                                    <td className="px-3 py-2">
                                                        {day.date}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {day.shift}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {day.time}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    className="px-3 py-2"
                                                    colSpan="3"
                                                >
                                                    No off days..!
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                ref={parentRef2}
                className={`${hiddenReport ? "hidden" : "flex"} fixed inset-0 z-50 items-center justify-center bg-black bg-opacity-40 p-4`}
            >
                <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-2xl">
                    <h1 className="text-center font-extrabold text-2xl">
                        Report
                    </h1>
                    <p className="text-center mt-2">
                        Provide us a appropriate reason and description for why
                        are you reporting this person and we will look into the
                        matter. Thank You
                    </p>
                    <form
                        action=""
                        onSubmit={handleReport}
                        className="mt-6 w-full px-2 mx-auto flex flex-col gap-4"
                    >
                        <input
                            type="text"
                            value={report.reason}
                            onChange={(e) =>
                                setReport({ ...report, reason: e.target.value })
                            }
                            placeholder="Reason*"
                            className="w-full"
                        />
                        <textarea
                            rows="5"
                            value={report.description}
                            onChange={(e) =>
                                setReport({
                                    ...report,
                                    description: e.target.value,
                                })
                            }
                            placeholder="Description*"
                            className="w-full"
                        ></textarea>
                        <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                                className="w-full sm:w-auto border px-4 py-2 rounded-full border-red-500 text-red-500 transition-all hover:bg-red-500 hover:text-white"
                                onClick={() => setHiddenReport(true)}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="w-full sm:w-auto border px-4 py-2 rounded-full border-blue-500 text-blue-500 transition-all hover:bg-blue-500 hover:text-white"
                            >
                                {submitting ? "Reporting..." : "Report"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
