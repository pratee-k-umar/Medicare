"use client";

import "@/styles/globals.css";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
// import DoctorBlog from "@/components/DoctorBlog";
import UserProfile from "@/components/UserProfile";
import DocInfo from "@/components/DocInfo";

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeButton, setActiveButton] = useState("button1");
  const [role, setRole] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState({
    isDoctor: "",
    location: "",
    specilization: "",
    qualification: "",
    experience: "",
  });
  const [docInfo, setDocInfo] = useState({
    userId: "",
    isDoctorApproved: "",
    location: "",
    specilization: "",
    qualification: "",
    experience: "",
    fees: "",
  });
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/user/${session?.user.id}/role`);
      const data = await res.json();
      setRole(data.role);
    };
    if (session?.user.id) fetchUser();
  }, [session]);
  const approveDoctor = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/doctor/new", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          isDoctor: "pending",
          location: doctorInfo.location,
          specilization: doctorInfo.specilization,
          qualification: doctorInfo.qualification,
          experience: doctorInfo.experience,
        }),
      });
      if (res.ok) alert("Your form for doctor role approval has been submitted...");
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  useEffect(() => {
    const info = async () => {
      const res = await fetch(`/api/doctor/${session?.user.id}/info`);
      const data = await res.json();
      if (!data) console.log("No data found..!");
      setDocInfo({
        userId: data[0]._id,
        isDoctorApproved: data[0].isDoctorApproved,
        location: data[0].location,
        specilization: data[0].specilization,
        qualification: data[0].qualification,
        experience: data[0].experience,
        fees: data[0].fees,
      });
    };
    if (session?.user.id) info();
  }, [session]);
  const editDoctorInfo = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`/api/doctor/${docInfo.userId}`, {
        method: "PATCH",
        body: JSON.stringify({
          location: docInfo.location,
          specilization: docInfo.specilization,
          qualification: docInfo.qualification,
          experience: docInfo.experience,
          fees: docInfo.fees,
        }),
      });
      if (res.ok) alert("Your details have been updated...");
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  const handleClick = (buttonId) => {
    setActiveButton(buttonId);
  };
  const logOut = async () => {
    await signOut({
      callbackUrl: "/",
    });
  };
  const deleteDoctorRole = async () => {
    const isConfirm = confirm("Are you sure..?");
    if (isConfirm) {
      try {
        const deleteDoctor = await fetch(`/api/doctor/${docInfo.userId}`, {
          method: "DELETE",
        });
        if (deleteDoctor.ok) router.refresh();
      } catch (error) {
        console.log(error);
      }
    }
  };
  const deleteUser = async () => {
    const isConfirm = confirm("Are you sure..?");
    if (isConfirm) {
      try {
        if(docInfo[0].isDoctorApproved === "accepted") await deleteDoctorRole();
        const res = await fetch(`/api/user/${session?.user?.id}`, {
          method: "DELETE"
        });
        if (res.ok) {
          router.push("/");
          setTimeout(() => {
            router.refresh();
          }, 10);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  if (!session) router.push("/");
  if (status === "loading") {
    return <p className="text-center pt-[330px]">Loading...</p>;
  }
  return (
    <div>
      {/* <div
        className={`z-50 border rounded-xl w-1/2 h-2/3 absolute inset-x-1/4 p-4 shadow-2xl ${
          activeButton === "button3" ? "" : "hidden"
        }`}
      >
        <DoctorBlog session={session} setActiveButton={setActiveButton} />
      </div> */}
      <div
        key={session?.user.id}
        className="mt-10 text-center text-xl sm:text-2xl md:text-3xl lg:text-5xl font-extrabold"
      >
        Profile
      </div>
      <div className="lg:flex lg:w-2/3 xl:w-1/2 mx-auto lg:justify-center">
        <UserProfile
          session={session}
          deleteUser={deleteUser}
          deleteDoctorRole={deleteDoctorRole}
          logOut={logOut}
          docInfo={docInfo}
        />
        <DocInfo
          activeButton={activeButton}
          handleClick={handleClick}
          docInfo={docInfo}
          setDocInfo={setDocInfo}
          editDoctorInfo={editDoctorInfo}
          submitting={submitting}
          approveDoctor={approveDoctor}
          doctorInfo={doctorInfo}
          setDoctorInfo={setDoctorInfo}
        />
      </div>
      <hr className="mt-5 mx-5 sm:mx-10 lg:hidden" />
      <div className="lg:hidden">
        <div
          className={`bookings mt-5 ${
            activeButton === "button1" ? "" : "hidden"
          }`}
        >
          <div>Bookings</div>
        </div>
        <div
          className={`settings mx-10 sm:mx-20 mt-5 ${
            activeButton === "button2" ? "" : "hidden"
          }`}
        >
          <h1 className="text-center font-bold md:text-2xl">
            Apply for Doctor
          </h1>
          <div className="items w-2/3 mx-auto mt-5 flex flex-col gap-2"></div>
        </div>
      </div>
    </div>
  );
}
