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
  
  // प्रोफाइल स्टेट्स
  const [points, setPoints] = useState<number>(0); 
  const [scansCompleted, setScansCompleted] = useState<number>(0);
  const [userRank, setUserRank] = useState<string>("Unranked");
  const [dbName, setDbName] = useState<string>("");
  
  // हब्स स्टेट्स
  const [myHubs, setMyHubs] = useState<HubData[]>([]);
  const [communityHubs, setCommunityHubs] = useState<HubData[]>([]); 
  
  // डिफ़ॉल्ट हब्स (30 रियल इंडियन रीसाइक्लिंग सेंटर्स)
  const [pointsList, setPointsList] = useState<PointLocation[]>([
   /* { id: 1, name: "Dharavi Plastic Recycling Zone", address: "Dharavi, Mumbai, Maharashtra", accepted_types: "Plastic, Polythene" },
    { id: 2, name: "Kurla Scrap Market", address: "Kurla, Mumbai, Maharashtra", accepted_types: "Metal, Auto Scrap, E-Waste" },
    { id: 3, name: "Deonar Waste Management", address: "Deonar, Mumbai, Maharashtra", accepted_types: "General Solid Waste" },
    { id: 4, name: "Malad E-waste Dismantlers", address: "Malad, Mumbai, Maharashtra", accepted_types: "E-Waste, Electronics" },
    { id: 5, name: "Vasai Industrial Recycling", address: "Vasai, Mumbai, Maharashtra", accepted_types: "Mixed Industrial Waste" },
    
    { id: 6, name: "Mayapuri Industrial Area", address: "Mayapuri, New Delhi", accepted_types: "Scrap Metal, Auto Parts" },
    { id: 7, name: "Okhla Waste to Energy", address: "Okhla, New Delhi", accepted_types: "Organic, General Waste" },
    { id: 8, name: "Seelampur E-Waste Hub", address: "Seelampur, New Delhi", accepted_types: "E-Waste, PCB Boards" },
    { id: 9, name: "Bawana Recycling Area", address: "Bawana, New Delhi", accepted_types: "Plastic, Industrial Scrap" },
    { id: 10, name: "Ghazipur Management Site", address: "Ghazipur, New Delhi", accepted_types: "Solid Waste" },
    
    { id: 11, name: "Peenya Industrial Area", address: "Peenya, Bangalore, Karnataka", accepted_types: "Metal, Machinery Scrap" },
    { id: 12, name: "Nayandahalli Plastic Hub", address: "Nayandahalli, Bangalore, Karnataka", accepted_types: "Plastic, Polymers" },
    { id: 13, name: "Bommasandra Recycling", address: "Bommasandra, Bangalore, Karnataka", accepted_types: "Industrial Waste" },
    { id: 14, name: "Whitefield E-Waste Processors", address: "Whitefield, Bangalore, Karnataka", accepted_types: "E-Waste, IT Assets" },
    { id: 15, name: "Kengeri Paper Recycling", address: "Kengeri, Bangalore, Karnataka", accepted_types: "Paper, Cardboard" },
    
    { id: 16, name: "Guindy Industrial Scrap", address: "Guindy, Chennai, Tamil Nadu", accepted_types: "Metal, E-Waste" },
    { id: 17, name: "Ambattur Waste Processing", address: "Ambattur, Chennai, Tamil Nadu", accepted_types: "Auto Parts, Chemical Waste" },
    { id: 18, name: "Perungudi Processing Zone", address: "Perungudi, Chennai, Tamil Nadu", accepted_types: "Solid Waste, Mixed" },
    { id: 19, name: "Pallavaram Management", address: "Pallavaram, Chennai, Tamil Nadu", accepted_types: "General Waste" },
    { id: 20, name: "Manali Industrial Recyclers", address: "Manali, Chennai, Tamil Nadu", accepted_types: "Chemical, Plastics" },
    */
    { id: 21, name: "Naroda Textile Recycling", address: "Naroda, Ahmedabad, Gujarat", accepted_types: "Textile, Fabric Scrap" },
    { id: 22, name: "Vatva GIDC Recycling", address: "Vatva, Ahmedabad, Gujarat", accepted_types: "Chemical, Plastic" },
    { id: 23, name: "Odhav GIDC Metal Hub", address: "Odhav, Ahmedabad, Gujarat", accepted_types: "Metal, Mixed Scrap" },
    { id: 24, name: "Sarkhej Scrap Zone", address: "Sarkhej, Ahmedabad, Gujarat", accepted_types: "Paper, Plastic, Scrap" },
    { id: 25, name: "Pirana Waste Site", address: "Pirana, Ahmedabad, Gujarat", accepted_types: "Solid Waste" },
    /*
    { id: 26, name: "Jeedimetla Industrial Hub ", address: "Jeedimetla, Hyderabad, Telangana", accepted_types: "Chemical, E-Waste" },
    { id: 27, name: "Balanagar Scrap Market", address: "Balanagar, Hyderabad, Telangana", accepted_types: "Metal, Auto Scrap" },
    { id: 28, name: "Cherlapally Plastics", address: "Cherlapally, Hyderabad, Telangana", accepted_types: "Plastic, Mixed Scrap" },
     
    { id: 29, name: "Bhosari MIDC Scrap", address: "Pimpri-Chinchwad, Pune, Maharashtra", accepted_types: "Auto Parts, Metal" },
    { id: 30, name: "Hadapsar Waste Hub", address: "Hadapsar, Pune, Maharashtra", accepted_types: "Mixed Industrial Waste" }
 */    
 ]);

  // --- डेटा फेच करने का फंक्शन (ताकि इसे बार-बार कॉल किया जा सके) ---
  const fetchData = async () => {
    if (!user?.uid) return;

    try {
      // 1. प्रोफाइल डेटा लाओ
      const profileRes = await fetch(`/api/user/profile?uid=${user.uid}`);
      const profileData = await profileRes.json();
      if (profileData.success) {
        setPoints(profileData.profile.green_points);
        setScansCompleted(profileData.profile.scans_completed);
        setUserRank(`#${profileData.rank}`);
        setDbName(profileData.profile.name);
      }

      // 2. यूजर के हब्स लाओ
      const myHubsRes = await fetch(`/api/hubs?uid=${user.uid}`);
      const myHubsData = await myHubsRes.json();
      if (myHubsData.success && myHubsData.hubs) {
        setMyHubs(myHubsData.hubs);
      }

      // 3. ग्लोबल (कम्युनिटी) अप्रूव्ड हब्स लाओ
      const commHubsRes = await fetch(`/api/hubs?status=Approved`);
      const commHubsData = await commHubsRes.json();
      if (commHubsData.success && commHubsData.hubs) {
        setCommunityHubs(commHubsData.hubs);
      }
    } catch (error) {
      console.error("Error fetching live data:", error);
    }
  };

  useEffect(() => {
    // पेज लोड होते ही पहली बार तुरंत डेटा फेच करो
    fetchData();

    // --- POLLING LOGIC (Real-time Feel) ---
    // हर 5 सेकंड (5000 ms) में बैकग्राउंड में नया डेटा लाओ
    // यूजर को पेज रिफ्रेश नहीं करना पड़ेगा, स्टेटस अपने आप बदल जाएगा
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000); 

    // जब यूजर पेज छोड़े, तो टाइमर को बंद कर दो (मेमोरी बचाने के लिए)
    return () => clearInterval(intervalId);
    
  }, [user]);

  const displayName = dbName || user?.displayName || "User";

  // स्टेटस के कलर्स
  const getStatusColor = (status: string) => {
    switch(status) {
      case "Approved": return "bg-green-100 text-green-800 border-green-200";
      case "Declined": return "bg-red-100 text-red-800 border-red-200";
      case "Under Process": return "bg-blue-100 text-blue-800 border-blue-200";
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
              <h3 className="text-xl font-bold text-gray-800"> Recycling Hubs</h3>
              
              {/* यहाँ बदलाव किया गया है - View Map को लिंक बनाया गया है */}
              <Link href="/recycling_centers" className="text-sm text-green-600 font-semibold cursor-pointer hover:underline">
                View Map
              </Link>
              
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
                      <span className={`px-3 py-1 text-xs font-bold rounded-full border transition-colors duration-500 ${getStatusColor(hub.status)}`}>
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