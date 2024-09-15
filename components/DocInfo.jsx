"use client";

import { useState, useEffect } from "react";
import Avaliable from "./Avaliable";

export default function DocInfo({
  session,
  activeButton,
  handleClick,
  docInfo,
  setDocInfo,
  editDoctorInfo,
  submitting,
  approveDoctor,
  doctorInfo,
  setDoctorInfo,
}) {
  const [userBooking, setUserBooking] = useState([]);
  const [doctorBooking, setDoctorBooking] = useState([]);
  const [acceptSubmitting, setAcceptSubmitting] = useState({});
  const [rejectSubmitting, setRejectSubmitting] = useState({});
  const [hoveredData, setHoveredData] = useState(null);
  useEffect(() => {
    const fetchBooking = async () => {
      const fetchData = await fetch(`/api/appointments/get/${session.user.id}`);
      const data = await fetchData.json();
      setUserBooking(data);
    };
    fetchBooking();
  }, []);
  const cancelUserBooking = async () => {
    const isConfirm = confirm("Are you sure you want to cancel..?");
    if (isConfirm) {
      try {
        const deleteAppointment = await fetch(
          `/api/appointments/delete/${userBooking[0]._id}`,
          {
            method: "DELETE",
          }
        );
        if (deleteAppointment.ok)
          alert("Your appointment request has been cancelled...");
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    const fetchDoctorBooking = async () => {
      const fetchData = await fetch(
        `/api/appointments/doctor/get/${session.user.id}`
      );
      const data = await fetchData.json();
      setDoctorBooking(data);
    };
    fetchDoctorBooking();
  }, [session]);
  const acceptDoctorBooking = async (id) => {
    setAcceptSubmitting((prevState) => ({
      ...prevState,
      [id]: true,
    }));
    try {
      const accept = await fetch(
        `/api/appointments/doctor/patch/${doctorBooking[0]._id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            status: "approved"
          }),
        }
      );
      if (accept.ok) alert("The appointment has been accepted...");
    } catch (error) {
      console.log(error);
    } finally {
      setAcceptSubmitting((prevState) => ({
        ...prevState,
        [id]: false,
      }));
    }
  };
  const cancelDoctorBooking = async (id) => {
    setRejectSubmitting((prevState) => ({
      ...prevState,
      [id]: true,
    }));
    try {
      const deleteAppointment = await fetch(
        `/api/appointments/delete/${doctorBooking[0]._id}`,
        {
          method: "DELETE",
        }
      );
      if (deleteAppointment.ok) alert("You rejected the appointment");
    } catch (error) {
      console.log(error);
    } finally {
      setRejectSubmitting((prevState) => ({
        ...prevState,
        [id]: false,
      }));
    }
  };
  const handleMouseEnter = (id) => {
    setHoveredData(id);
  };
  const handleMouseLeave = () => {
    setHoveredData(null);
  };
  return (
    <div className="extra mt-8 w-full">
      <div className="bookings flex justify-around lg:gap-4 lg:justify-start">
        <button
          onClick={() => handleClick("button1")}
          className={`border border-blue-500 px-4 py-1 rounded-xl text-[10px] text-blue-500 lg:text-[14px] transition-all hover:bg-blue-500 hover:text-white ${
            activeButton === "button1" ? "bg-blue-500 text-white" : ""
          }`}
        >
          Bookings
        </button>
        {docInfo.isDoctorApproved === "accepted" && (
          <button
            onClick={() => handleClick("button2")}
            className={`border border-blue-500 px-4 py-1 rounded-xl text-[10px] text-blue-500 lg:text-[14px] transition-all hover:bg-blue-500 hover:text-white ${
              activeButton === "button2" ? "bg-blue-500 text-white" : ""
            }`}
          >
            Avaliability
          </button>
        )}
        <button
          onClick={() => handleClick("button3")}
          className={`border border-blue-500 px-4 py-1 rounded-xl text-[10px] text-blue-500 lg:text-[14px] transition-all hover:bg-blue-500 hover:text-white ${
            activeButton === "button3" ? "bg-blue-500 text-white" : ""
          }`}
        >
          {docInfo.isDoctorApproved === "accepted" ? "Settings" : "Doctor Form"}
        </button>
        {/* {docInfo.isDoctorApproved === "accepted" && (
          <button
            onClick={() => handleClick("button3")}
            className={`border border-blue-500 px-4 py-1 rounded-xl text-[10px] text-blue-500 lg:text-[14px] transition-all hover:bg-blue-500 hover:text-white ${
              activeButton === "button3" ? "bg-blue-500 text-white" : ""
            }`}
            data-modal-target="default-modal"
            data-modal-toggle="default-modal"
          >
            Blogs
          </button>
        )} */}
      </div>
      <div className="lg:block hidden">
        <div
          className={`bookings mt-5 ${
            activeButton === "button1" ? "" : "hidden"
          }`}
        >
          <div className="">
            <h1 className="text-center text-xl font-extrabold">
              Your bookings
            </h1>
            <table className="mt-5 w-full text-center rtl:text-right rounded-xl shadow-lg p-5">
              <thead className="text-gray-500 m-2">
                <tr className="border-b border-gray-700">
                  <th>Date</th>
                  <th>Shift</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              {docInfo.isDoctorApproved === "accepted" ? (
                <tbody className="text-sm">
                  {doctorBooking && doctorBooking.length > 0 ? (
                    doctorBooking.map((day) => (
                      <tr key={day._id} className="border-b-4 pb-2">
                        <td>
                          <p>{day.date}</p>
                        </td>
                        <td>
                          <p>{day.shift}</p>
                        </td>
                        <td>
                          <p>{day.time}</p>
                        </td>
                        <td className="flex flex-col gap-1">
                          <button
                            disabled={day.status === "approved"}
                            className={`border text-[13px] px-1 rounded-full border-green-500 text-green-500 transition-all ${
                              day.status === "approved" ? "hover:bg-green-200" : "hover:text-white hover:bg-green-500"
                            }`}
                            onClick={() => acceptDoctorBooking(day._id)}
                          >
                            {acceptSubmitting[day._id]
                              ? "Accepting..."
                              : "Accept"}
                          </button>
                          <button
                            className={`border text-[13px] px-1 rounded-full border-red-500 text-red-500 transition-all hover:text-white hover:bg-red-500 ${day.status === "approved" ? "hidden" : "block"}`}
                            onClick={() => cancelDoctorBooking(day._id)}
                          >
                            {rejectSubmitting[day._id]
                              ? "Rejecting..."
                              : "Reject"}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">No bookings right now..!</td>
                    </tr>
                  )}
                </tbody>
              ) : (
                <tbody className="text-sm m-3">
                  {userBooking && userBooking.length > 0 ? (
                    userBooking.map((day) => (
                      <tr
                        key={day._id}
                        onMouseEnter={() => handleMouseEnter(day._id)}
                        onMouseLeave={handleMouseLeave}
                        className={`p-4 relative ${
                          day.status === "pending"
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        <td className="">
                          <p>{day.date}</p>
                          {hoveredData === day._id && (
                            <div
                              className="absolute bg-black text-white text-xs p-1 rounded"
                              style={{
                                top: "7px",
                                right: "-110px",
                                transform: "translateX(-50%)",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {day.status === "pending"
                                ? "Pending"
                                : "Accepted"}
                            </div>
                          )}
                        </td>
                        <td>
                          <p>{day.shift}</p>
                        </td>
                        <td>
                          <p>{day.time}</p>
                        </td>
                        <td>
                          <button
                            className="border px-3 py-2 rounded-full border-red-500 text-red-500 transition-all hover:text-white hover:bg-red-500"
                            onClick={cancelUserBooking}
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">No bookings right now..! Stay Safe</td>
                    </tr>
                  )}
                </tbody>
              )}
            </table>
          </div>
        </div>
        <div
          className={`bookings mt-5 ${
            activeButton === "button2" ? "" : "hidden"
          }`}
        >
          <Avaliable data={docInfo.userId} />
        </div>
        <div
          className={`settings mx-10 sm:mx-20 lg:ml-0 lg:mr-0 mt-5 ${
            activeButton === "button3" ? "" : "hidden"
          }`}
        >
          {docInfo.isDoctorApproved === "accepted" ? (
            <div>
              <h1 className="text-center font-bold md:text-2xl lg:text-start">
                Edit your details
              </h1>
              <div className="items w-3/4 mx-auto mt-5 flex flex-col gap-2 lg:ml-0 lg:mr-0">
                <form
                  className="w-full flex flex-col gap-2"
                  onSubmit={editDoctorInfo}
                >
                  <input
                    type="text"
                    className="text-xl"
                    value={docInfo.location}
                    placeholder="Location: {State, District}"
                    onChange={(e) =>
                      setDocInfo({
                        ...docInfo,
                        location: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    className="text-xl"
                    value={docInfo.specilization}
                    placeholder="Specialization"
                    onChange={(e) =>
                      setDocInfo({
                        ...docInfo,
                        specilization: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    className="text-xl"
                    value={docInfo.qualification}
                    placeholder="Qualification"
                    onChange={(e) =>
                      setDocInfo({
                        ...docInfo,
                        qualification: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    className="text-xl"
                    value={docInfo.experience}
                    placeholder="Experience"
                    onChange={(e) =>
                      setDocInfo({
                        ...docInfo,
                        experience: e.target.value,
                      })
                    }
                  />
                  {docInfo.isDoctorApproved === "accepted" && (
                    <input
                      type="text"
                      className="text-xl"
                      value={docInfo.fees}
                      placeholder="Fees per hour (Rs)"
                      onChange={(e) =>
                        setDocInfo({
                          ...docInfo,
                          fees: e.target.value,
                        })
                      }
                    />
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-2 border border-blue-500 rounded-lg text-blue-500 px-3 py-1 transition-all hover:bg-blue-500 hover:text-white flex mx-auto"
                  >
                    {submitting ? "Updating..." : "Update"}
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="text-center font-bold md:text-2xl lg:text-start">
                Apply for Doctor
              </h1>
              <div className="items w-3/4 mx-auto mt-5 flex flex-col gap-2 lg:ml-0 lg:mr-0">
                <form
                  className="w-full flex flex-col gap-2"
                  onSubmit={approveDoctor}
                >
                  <input
                    type="text"
                    className="text-xl"
                    placeholder="Location: {State, District}"
                    onChange={(e) =>
                      setDoctorInfo({
                        ...doctorInfo,
                        location: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    className="text-xl"
                    placeholder="Specialization"
                    onChange={(e) =>
                      setDoctorInfo({
                        ...doctorInfo,
                        specilization: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    className="text-xl"
                    placeholder="Qualification"
                    onChange={(e) =>
                      setDoctorInfo({
                        ...doctorInfo,
                        qualification: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    className="text-xl"
                    placeholder="Experience"
                    onChange={(e) =>
                      setDoctorInfo({
                        ...doctorInfo,
                        experience: e.target.value,
                      })
                    }
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-2 border border-blue-500 rounded-lg text-blue-500 px-3 py-1 transition-all hover:bg-blue-500 hover:text-white flex mx-auto"
                  >
                    {submitting ? "Submitting..." : "Submit"}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
