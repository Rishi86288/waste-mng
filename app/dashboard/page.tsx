"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [points, setPoints] = useState(250); 
  const [scansCompleted, setScansCompleted] = useState(12);
  const [pointsList, setPointsList] = useState([
    { id: 1, name: "Campus Main Gate Bin", address: "Gate 1, Campus", accepted_types: "Plastic, Paper" },
    { id: 2, name: "Hostel Block A Center", address: "Near Canteen", accepted_types: "E-Waste, Glass" }
  ]);

  useEffect(() => {
    // API Call (Uncomment when backend is ready)
    /*
    fetch("/api/recycling-points")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setPointsList(data.points);
      });
    */
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Welcome back, Rishi! 👋</h1>
            <p className="text-gray-600 mt-1">Track your environmental impact and rewards.</p>
          </div>
          <Link href="/scan" className="mt-4 md:mt-0 px-6 py-2.5 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all">
            + New Scan
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between border-l-4 border-l-green-500">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase">Green Points</p>
              <h2 className="text-4xl font-black text-gray-800 mt-1">{points}</h2>
            </div>
            <div className="text-4xl">🌟</div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between border-l-4 border-l-blue-500">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase">Items Scanned</p>
              <h2 className="text-4xl font-black text-gray-800 mt-1">{scansCompleted}</h2>
            </div>
            <div className="text-4xl">📸</div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between border-l-4 border-l-purple-500">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase">Rank</p>
              <h2 className="text-4xl font-black text-gray-800 mt-1">#4</h2>
            </div>
            <div className="text-4xl">🏆</div>
          </div>
        </div>

        {/* Recycling Centers Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h3 className="text-xl font-bold text-gray-800">Nearby Recycling Hubs</h3>
            <span className="text-sm text-green-600 font-semibold cursor-pointer hover:underline">View Map</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pointsList.map((point) => (
              <div key={point.id} className="p-5 bg-gray-50 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                <h4 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                  📍 {point.name}
                </h4>
                <p className="text-sm text-gray-600 mt-2 font-medium">{point.address}</p>
                <div className="mt-4 inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
                  Accepts: {point.accepted_types}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}