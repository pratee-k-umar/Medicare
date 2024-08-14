import Link from "next/link";

export default function Contact({ data }) {
  const handleMarkDone = async () => {
    const isConfirm = confirm("Mark as done..!")
    if(isConfirm) {
      try {
        const res = await fetch(`api/administration/contact/delete/${data[0]._id}`, {
          method: "DELETE"
        })
        if(res.ok) router.refresh()
        alert("Data deleted...")
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <div className="relative overflow-x-auto shadow-lg sm:rounded-lg mt-4">
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
        <tbody className=" py-4">
          {data && data.length > 0 ? (
            data.map((user) => (
              <tr key={user._id}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap"
                >
                  {user.name}
                </th>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.message}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2 w-2/3">
                    <button
                      className="border rounded-lg px-2 py-1 border-red-500 text-red-500 transition-all hover:bg-red-500 hover:text-white"
                      onClick={handleMarkDone}
                    >
                      Done
                    </button>
                    <Link
                      className="border rounded-lg px-2 py-1 border-green-500 text-green-500 transition-all hover:bg-green-500 hover:text-white"
                      href={`mailto:${user.email}`}
                    >
                      Reply
                    </Link>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <p className="m-4">No messages</p>
          )}
        </tbody>
      </table>
    </div>
  );
}
