"use client"

import { useRouter } from "next/navigation"

export default function Notification({ data }) {
  const router = useRouter()
  const accept = async () => {
    try {
      const editApproval = await fetch(`api/administration/notify/doctorform/${data[0]._id}`, {
        method: "PATCH",
        body: JSON.stringify({
          isDoctorApproved: "accepted"
        })
      })
      if(editApproval.ok) router.refresh()
    }
    catch(error) {
      console.log(error)
    }
  }
  const reject = async () => {
    const isConfirm = confirm("Are you sure to reject..?")
    if(isConfirm) {
      try {
        const res = await fetch(`api/administration/notify/doctorform/${data[0]._id}`, {
          method: "DELETE"
        })
        if(res.ok) alert("Request rejected..!")
      }
      catch(error) {
        console.log(error)
      }
    }
  }
  return (
    <div
      className="relative overflow-x-auto shadow-lg sm:rounded-lg mt-4"
    >
      <table className="w-full text-left rtl:text-right text-gray-500">
        <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="border-b border-gray-700">
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Message
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="py-4">
          {data && data.length > 0 ?
            data.map((user) => (
              <tr key={user._id}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap"
                >
                  {user.creator.username}
                </th>
                <td className="px-6 py-4">{user.creator.email}</td>
                <td className="px-6 py-4">
                  <p>Requesting for doctor's position...</p>
                  <div className="detail">
                    <p>Details:</p>
                    <div>
                      <div className="flex">
                        <p>Specilization: {user.specilization}</p>
                      </div>
                      <div className="flex">
                        <p>Qualification: {user.qualification}</p>
                      </div>
                      <div className="flex">
                        <p>Experience: {user.experience}</p>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-2 w-2/3">
                    <button className="border rounded-lg px-2 py-1 border-green-500 text-green-500 transition-all hover:bg-green-500 hover:text-white" onClick={accept}>
                      Accept
                    </button>
                    <button className="border rounded-lg px-2 py-1 border-red-500 text-red-500 transition-all hover:bg-red-500 hover:text-white" onClick={reject}>
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <p className="m-4">No notification yet...</p>
            )
          }
        </tbody>
      </table>
    </div>
  );
}