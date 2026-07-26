"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../context/AuthContext";

interface PointLocation {
  id: number;
  name: string;
  address: string;
  accepted_types: string;
}

interface HubData {
  id: number;
  name: string; 
  village_panchayat: string;
  district: string;
  accepted_types: string;
  status: string;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [points, setPoints] = useState<number>(0); 
  const [scansCompleted, setScansCompleted] = useState<number>(0);
  const [userRank, setUserRank] = useState<string>("Unranked");
  const [dbName, setDbName] = useState<string>("");
  
  const [myHubs, setMyHubs] = useState<HubData[]>([]);
  const [communityHubs, setCommunityHubs] = useState<HubData[]>([]); 
  
  const [pointsList, setPointsList] = useState<PointLocation[]>([
    { id: 1, name: "Campus Main Gate Bin", address: "Gate 1, Campus", accepted_types: "Plastic, Paper" },
    { id: 2, name: "Hostel Block A Center", address: "Near Canteen", accepted_types: "E-Waste, Glass" }
  ]);

  useEffect(() => {
    if (user?.uid) {
      fetch(`/api/user/profile?uid=${user.uid}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setPoints(data.profile.green_points);
            setScansCompleted(data.profile.scans_completed);
            setUserRank(`#${data.rank}`);
            setDbName(data.profile.name);
          }
        });

      fetch(`/api/hubs?uid=${user.uid}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.hubs) {
            setMyHubs(data.hubs);
          }
        });
        
      fetch(`/api/hubs?status=Approved`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.hubs) {
            setCommunityHubs(data.hubs);
          }
        });
    }
  }, [user]);

  const displayName = dbName || user?.displayName || "User";

  // --- UPDATED LOGIC FOR STATUS COLORS ---
  const getStatusColor = (status: string) => {
    switch(status) {
      case "Approved": return "bg-green-100 text-green-800 border-green-200";
      case "Declined": return "bg-red-100 text-red-800 border-red-200";
      case "Under Process": return "bg-blue-100 text-blue-800 border-blue-200"; // नया 'Under Process' कलर
      default: return "bg-yellow-100 text-yellow-800 border-yellow-200"; // Pending
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">Welcome back, {displayName}! 👋</h1>
              <p className="text-gray-600 mt-1">Track your environmental impact and rewards.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
              <Link href="/add-hub" className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all text-center">
                Add Recycling Hub
              </Link>
              <Link href="/scan" className="px-6 py-2.5 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all text-center">
                + New Scan
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-l-green-500">
              <p className="text-sm font-semibold text-gray-500 uppercase">Green Points</p>
              <h2 className="text-4xl font-black text-gray-800 mt-1">{points}</h2>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-l-blue-500">
              <p className="text-sm font-semibold text-gray-500 uppercase">Items Scanned</p>
              <h2 className="text-4xl font-black text-gray-800 mt-1">{scansCompleted}</h2>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-l-purple-500">
              <p className="text-sm font-semibold text-gray-500 uppercase">Current Rank</p>
              <h2 className="text-4xl font-black text-gray-800 mt-1">{userRank}</h2>
            </div>
          </div>

          {/* 1. Official/Static Nearby Recycling Hubs */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-10">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h3 className="text-xl font-bold text-gray-800">Nearby Recycling Hubs</h3>
              <span className="text-sm text-green-600 font-semibold cursor-pointer hover:underline">View Map</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pointsList.map((point) => (
                <div key={point.id} className="p-5 bg-gray-50 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-lg text-gray-900 flex items-center gap-2">📍 {point.name}</h4>
                  <p className="text-sm text-gray-600 mt-2 font-medium">{point.address}</p>
                  <div className="mt-4 inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
                    Accepts: {point.accepted_types}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Community Suggested (Approved) Hubs */}
          {communityHubs.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-10">
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Community Suggested Hubs</h3>
                  <p className="text-sm text-gray-500 mt-1">New hubs added & verified by Duvision users.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {communityHubs.map((hub) => (
                  <div key={hub.id} className="p-5 bg-[#f5fdf7] border border-green-200 rounded-xl shadow-sm flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">
                      🌟 Suggested by {hub.name}
                    </div>

                    <div className="mt-2">
                      <h4 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                        🏢 {hub.village_panchayat}, {hub.district}
                      </h4>
                      <p className="text-sm text-gray-600 mt-2">
                        <span className="font-semibold text-gray-800">Accepts:</span> {hub.accepted_types}
                      </p>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <span className="px-3 py-1 text-xs font-bold rounded-full border bg-green-100 text-green-800 border-green-200">
                        ✅ Admin Approved
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Your Added Recycling Hubs (Personal tracking) */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h3 className="text-xl font-bold text-gray-800">Your Added Hub Requests</h3>
            </div>
            
            {myHubs.length === 0 ? (
              <p className="text-gray-500 italic text-center py-4">You haven't submitted any recycling hubs yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myHubs.map((hub) => (
                  <div key={hub.id} className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                        📍 {hub.village_panchayat}, {hub.district}
                      </h4>
                      <p className="text-sm text-gray-600 mt-2">
                        <span className="font-semibold text-gray-800">Accepts:</span> {hub.accepted_types}
                      </p>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusColor(hub.status)}`}>
                        Status: {hub.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
}