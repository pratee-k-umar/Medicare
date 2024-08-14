"use client";

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  Line,
} from "recharts";

export default function Dashboard() {
  // const [stats, setStats] = useState(null);
  // const [selectedDate, setSelectedDate] = useState(new Date());
  // useEffect(() => {
  //   const fetchStats = async (date) => {
  //     const month = date.getMonth() + 1;
  //     const year = date.getFullYear();
  //     const res = await fetch(
  //       `/api/administration/stats?month=${month}&year=${year}`
  //     );
  //     const data = await res.json();
  //     setStats(data);
  //   };
  //   fetchStats(selectedDate);
  // }, [selectedDate]);
  // console.log(stats)
  // const [startDate, setStartDate] = useState(new Date());
  // const handleChange = (date) => {
  //   setStartDate(date);
  //   setSelectedDate(date);
  // };
  // console.log(stats);
  const [totalUsers, setTotalUsers] = useState();
  const [totalDoctor, setTotalDoctor] = useState();
  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await fetch("/api/user");
        const data = await response.json();
        setTotalUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserCount();
  }, []);
  useEffect(() => {
    const fetchDoctorCount = async () => {
      const res = await fetch("/api/doctor/count");
      const data = await res.json();
      setTotalDoctor(data);
    };
    fetchDoctorCount();
  }, []);
  const totalPatients = totalUsers - totalDoctor;
  const data = [
    {
      parameter: "Total Users",
      count: totalUsers,
    },
    {
      parameter: "Total Doctors",
      count: totalDoctor,
    },
    {
      parameter: "Total Patients",
      count: totalPatients,
    },
    {
      parameter: "Bookings",
      count: 1,
    },
  ];
  return (
    <div className="flex mx-8 justify-between">
      <div className="numeric_data grid grid-cols-2 gap-x-12 mt-10">
        <div className="users flex flex-col">
          <h1 className="">Total Users:</h1>
          <p className="text-3xl">{totalUsers}</p>
        </div>
        <div className="doctors flex flex-col">
          <h1 className="">Total Doctors registered:</h1>
          <p className="text-3xl">{totalDoctor}</p>
        </div>
        <div className="patients flex flex-col">
          <h1 className="">Total Patients registered:</h1>
          <p className="text-3xl">{totalPatients}</p>
        </div>
        <div className="bookings flex flex-col">
          <h1 className="">Current Bookings:</h1>
          <p className="text-3xl">1</p>
        </div>
        <div className="bookingPerDay flex flex-col">
          <h1 className="">Bookings per day:</h1>
          <p className="text-3xl">1</p>
        </div>
      </div>
      <div className="graph_data">
        <div className="flex">
          {/* <select className="w-1/4 h-10 pl-3 pr-6 text-base placeholder-gray-600 rounded-lg appearance-none focus:shadow-outline">
            <option value="">Month</option>
            {intervalMonth.map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </select> */}
          {/* <DatePicker
            selected={startDate}
            onChange={handleChange}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            className="z-40"
          /> */}
        </div>
        <AreaChart
          className="z-10"
          width={650}
          height={300}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="parameter" />
          <YAxis />
          <CartesianGrid />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#3b82f6"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Line type="monotone" dataKey="count" stroke="#3b82f6" />
        </AreaChart>
      </div>
    </div>
  );
}
