import Avaliable from "./Avaliable";

export default function DocInfo({
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
          <div>Bookings</div>
        </div>
        <div
          className={`bookings mt-5 ${
            activeButton === "button2" ? "" : "hidden"
          }`}
        >
          <Avaliable data={docInfo.userId}/>
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
