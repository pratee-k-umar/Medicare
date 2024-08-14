import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Users() {
  const [docId, setDocId] = useState("");
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchDoctorDetail = async () => {
      try {
        const data = await fetch(`/api/administration/doctor`);
        const res = await data.json();
        setDocId(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDoctorDetail();
  }, []);
  const handleSearch = async (e) => {
    e.preventDefault();
    if(!search) setUsers([])
    const params = new URLSearchParams();
    params.set("q", search);
    router.push(`?${params.toString()}`);
    try {
      const res = await fetch(`/api/administration/users/search/${search}`);
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(users);
  const handleClick = (event) => {
    if (event.key === "Enter") handleSearch(event);
  };
  const deleteDoctorRole = async () => {
    try {
      await fetch(`api/administration/doctor/delete/${docId}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteUsers = async () => {
    const isConfirm = confirm("Are you sure..?");
    if (isConfirm) {
      try {
        if (docId !== "") await deleteDoctorRole();
        const res = await fetch(
          `/api/administration/users/delete/${data[0]._id}`,
          {
            method: "DELETE",
          }
        );
        if (res.ok) router.refresh();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      <form
        className="w-1/2 mx-auto"
        onSubmit={handleSearch}
        onKeyDown={handleClick}
      >
        <div className="relative">
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 text-sm border border-gray-300 rounded-lg"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="admin-user-form-button">
            Search
          </button>
        </div>
      </form>
      <div className="user w-full mx-auto border mt-5 relative overflow-x-auto shadow-lg sm:rounded-lg">
        <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="border-b border-gray-700">
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    {user.username}
                  </th>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2 w-2/3">
                      <button
                        className="border rounded-lg px-2 py-1 border-red-500 text-red-500 transition-all hover:bg-red-500 hover:text-white"
                        onClick={deleteUsers}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))): (
                <p className="p-4">Search Users...</p>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
