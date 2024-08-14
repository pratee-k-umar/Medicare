"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Notification from "@/components/Notification";
import Users from "@/components/Users";
import Dashboard from "@/components/Dashboard";
import Contact from "@/components/Contact";

export default function Admin() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [activeButton, setActiveButton] = useState("button1");
  const [doctorForm, setDoctorForm] = useState([]);
  const [users, setUsers] = useState([]);
  const [contact, setContacts] = useState([]);
  const handleClick = (buttonId) => {
    setActiveButton(buttonId);
  };
  useEffect(() => {
    if (status === "loading") setLoading(true);
    else setLoading(false);
  }, [status]);
  useEffect(() => {
    const fetchPendingDoctors = async () => {
      const res = await fetch("/api/administration/notify/doctorform");
      const data = await res.json();
      setDoctorForm(data);
    };
    fetchPendingDoctors();
  }, [session]);
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`/api/administration/users`);
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, [session]);
  useEffect(() => {
    const fetchContact = async () => {
      const res = await fetch("/api/contact");
      const data = await res.json();
      setContacts(data);
    };
    fetchContact();
  }, [session]);
  if(!session) redirect('/')
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="flex gap-4 mx-4">
      <div className="options border rounded-lg flex flex-col items-center gap-8 px-4 py-4 h-full">
        <div className="border rounded-lg shadow-lg px-5 py-5 flex flex-col gap-3 items-center">
          {session?.user.image ? (
            <Image
              src={session?.user.image}
              width={40}
              height={40}
              className="rounded-full"
              alt="profile"
            />
          ) : (
            <AccountCircleIcon
              className="rounded-full"
              width={40}
              height={40}
            />
          )}
          <div className="flex flex-col items-center">
            <h1>{session?.user.name}</h1>
            <p>{session?.user.email}</p>
            <p className="border rounded-lg bg-gray-300 px-2 mt-1">Admin</p>
          </div>
        </div>
        <button
          onClick={() => handleClick("button1")}
          className={`admin-dashboard-options ${
            activeButton === "button1"
              ? "border-l-4 border-blue-500 text-blue-500"
              : ""
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => handleClick("button2")}
          className={`admin-dashboard-options ${
            activeButton === "button2"
              ? "border-l-4 border-blue-500 text-blue-500"
              : ""
          }`}
        >
          Notification
        </button>
        <button
          onClick={() => handleClick("button3")}
          className={`admin-dashboard-options ${
            activeButton === "button3"
              ? "border-l-4 border-blue-500 text-blue-500"
              : ""
          }`}
        >
          Users
        </button>
        <button
          onClick={() => handleClick("button6")}
          className={`admin-dashboard-options ${
            activeButton === "button6"
              ? "border-l-4 border-blue-500 text-blue-500"
              : ""
          }`}
        >
          Contact
        </button>
      </div>
      <div className="w-full flex flex-col gap-2 border rounded-lg">
        <div className={`${activeButton === "button1" ? "block" : "hidden"}`}>
          <h1 className="text-4xl font-semibold m-4">Dashboard</h1>
          <Dashboard />
        </div>
        <div
          className={`${activeButton === "button2" ? "block" : "hidden"} p-3`}
        >
          <h1 className="text-4xl font-semibold">Notifications</h1>
          <div className="list mt-5">
            <Notification data={doctorForm} />
          </div>
        </div>
        <div
          className={`${activeButton === "button3" ? "block" : "hidden"} p-3`}
        >
          <h1 className="text-4xl font-semibold">Users</h1>
          <div>
            <Users data={users} />
          </div>
        </div>
        <div className={`${activeButton === "button6" ? "block" : "hidden"} p-3`}>
          <h1 className="text-4xl font-semibold">Contacts</h1>
          <Contact data={contact} />
        </div>
      </div>
    </div>
  );
}
