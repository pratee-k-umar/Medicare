"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";

export default function Avaliable({ data }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const { data: session } = useSession();
  const [id, setId] = useState("1");
  const [avalData, setAvalData] = useState({
    date: "",
    shift: "",
    time: "",
  });
  const [fetchData, setFetchData] = useState([]);
  const [options, setOptions] = useState([]);
  const morningTiming = ["10:00-11:00", "11:00-12:00", "12:00-13:00"];
  const eveningTiming = ["15:00-16:00", "16:00-17:00", "17:00-18:00"];
  useEffect(() => {
    if (avalData.shift === "Morning") setOptions(morningTiming);
    else if (avalData.shift === "Evening") setOptions(eveningTiming);
    else setOptions([]);
  }, [avalData.shift]);
  const handleShiftChange = (e) => {
    setAvalData({ ...avalData, shift: e.target.value });
  };
  const handleAvalibility = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/avaliablity/new", {
        method: "POST",
        body: JSON.stringify({
          user: session?.user.id,
          doctor: data,
          date: avalData.date,
          shift: avalData.shift,
          time: avalData.time,
        }),
      });
      if (res.ok) alert("Data Uploaded...");
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  useEffect(() => {
    const fetchAvaliabilityData = async () => {
      const res = await fetch(`/api/avaliablity/${session?.user.id}`);
      const dayData = await res.json();
      setFetchData(dayData);
    };
    fetchAvaliabilityData();
  }, [session]);
  const deleteOffDay = async () => {
    try {
      const res = await fetch(`/api/avaliablity/${fetchData[0]._id}`, {
        method: "DELETE",
      });
      if (res.ok) alert("The day is deleted...");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const deleteOffDays = () => {
      const currentDate = new Date();
      fetchData.forEach((date) => {
        if (date < currentDate) deleteOffDay(fetchData[0]._id);
      });
    };
    deleteOffDays();
  }, [fetchData]);
  const deleteDateFunction = () => {
    deleteOffDay(fetchData[0]._id)
  }
  return (
    <div className="px-5">
      <div className="w-full flex justify-between">
        <button
          className={`border px-3 py-1 rounded-full text-sm border-blue-500 text-blue-500 transition-all hover:bg-blue-500 hover:text-white ${
            id == 1 ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => setId("1")}
        >
          Set Off Days
        </button>
        <button
          className={`border px-3 py-1 rounded-full text-sm border-blue-500 text-blue-500 transition-all hover:bg-blue-500 hover:text-white ${
            id == 2 ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => setId("2")}
        >
          Off Days
        </button>
      </div>
      <div className="mt-5">
        <div className={id === "1" ? "block" : "hidden"}>
          <p className="text-lg font-semibold">
            Check the days with shift and timing in the calendar when you are
            unavailable.
          </p>
          <form
            action=""
            className="mt-5 flex flex-col gap-5"
            onSubmit={handleAvalibility}
          >
            <div className="date flex justify-between">
              <p>Date:</p>
              <input
                type="date"
                value={avalData.date}
                onChange={(e) =>
                  setAvalData({ ...avalData, date: e.target.value })
                }
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="shifts flex justify-between">
              <p>Shifts:</p>
              <select
                name="shifts"
                id="shifts"
                value={avalData.shift}
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
                value={avalData.time}
                onChange={(e) =>
                  setAvalData({ ...avalData, time: e.target.value })
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
            <button className="border px-4 py-2 rounded-full border-blue-500 text-blue-500 transition-all hover:bg-blue-500 hover:text-white flex mx-auto">
              {submitting ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
        <div className={id === "2" ? "block" : "hidden"}>
          <p className="text-lg font-semibold">Off Days</p>
          <table className="mt-2 w-full text-left rtl:text-right rounded-xl shadow-lg p-2">
            <thead className="text-gray-500">
              <tr className="border-b border-gray-700">
                <th>Date</th>
                <th>Shift</th>
                <th>Time</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className="text-sm text-center">
              {fetchData && fetchData.length > 0 ? (
                fetchData.map((day) => (
                  <tr>
                    <td className="">
                      <p>{day.date}</p>
                    </td>
                    <td>
                      <p>{day.shift}</p>
                    </td>
                    <td>
                      <p>{day.time}</p>
                    </td>
                    <td>
                      <DeleteIcon
                        className="cursor-pointer"
                        onClick={() => deleteDateFunction()}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <p>No off days..!</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
