"use client";

import Image from "next/image";

export default function UserProfile({
  session,
  deleteUser,
  deleteDoctorRole,
  logOut,
  docInfo,
}) {
  return (
    <div className="text-center mt-8 sm:mx-10 w-full">
      <div className="details flex justify-between items-center mx-2 lg:flex-col lg:gap-20">
        <div className="profile_image flex items-center gap-3 lg:flex-col lg:gap-5">
          <div className="image border w-10 h-10 rounded-full md:w-12 md:h-12">
            <Image
              src={session?.user.image}
              width={50}
              height={50}
              className="rounded-full"
              alt="profile"
            />
          </div>
          <div className="detail text-start lg:text-center">
            <div className="name text-[12px] sm:text-[15px] font-bold">
              <h1>{session?.user?.name}</h1>
            </div>
            <div className="email text-[12px] sm:text-[15px] text-gray-500">
              <p>{session?.user?.email}</p>
            </div>
            <div className="role text-[12px] sm:text-[15px] text-gray-500 mt-1 px-12 py-1">
              {docInfo.isDoctorApproved === "accepted" ? (
                <p className="border rounded-lg bg-gray-300">Doctor</p>
              ) : (
                <p className="border rounded-lg bg-gray-300">Patient</p>
              )}
            </div>
          </div>
        </div>
        <div className="acc_actions flex gap-2 md:gap-4 lg:flex-col">
          <button
            onClick={logOut}
            className="border border-black px-2 py-1 rounded-full text-[11px] sm:text-[16px] sm:px-3 lg:px-10 transition-all hover:bg-black hover:text-white"
          >
            Log out
          </button>
          {docInfo.isDoctorApproved === "accepted" && (
            <button
              onClick={deleteDoctorRole}
              className="border border-red-500 px-2 py-1 rounded-full text-red-500 text-[11px] sm:text-[16px] sm:px-3 lg:px-10 transition-all hover:bg-red-500 hover:text-white"
            >
              Delete Doctor Account
            </button>
          )}
          <button
            onClick={deleteUser}
            className="border border-red-500 px-2 py-1 rounded-full text-red-500 text-[11px] sm:text-[16px] sm:px-3 lg:px-10 transition-all hover:bg-red-500 hover:text-white"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
