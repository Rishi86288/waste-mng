"use client";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [points, setPoints] = useState(120); // डमी पॉइंट्स
  const [pointsList, setPointsList] = useState([]);

  useEffect(() => {
    // नजदीकी रीसाइक्लिंग पॉइंट्स फेच करना
    fetch("/api/recycling-points")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setPointsList(data.points);
      });
  }, []);

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">यूजर डैशबोर्ड 📊</h1>
      
      <div className="p-4 bg-green-100 border border-green-300 rounded-lg shadow-sm mb-6">
        <h2 className="text-lg font-semibold text-green-800">आपके कुल ग्रीन पॉइंट्स</h2>
        <p className="text-3xl font-bold text-green-600 mt-1">{points} 🌟</p>
      </div>

      <h3 className="text-lg font-bold mb-3 text-gray-700">न नजदीकी रीसाइक्लिंग सेंटर:</h3>
      <div className="space-y-3">
        {pointsList.map((point: any) => (
          <div key={point.id} className="p-3 bg-white border rounded-lg shadow-sm">
            <h4 className="font-semibold text-blue-700">{point.name}</h4>
            <p className="text-sm text-gray-600">पत्ता: {point.address}</p>
            <p className="text-xs text-green-600 mt-1">स्वीकृत कचरा: {point.accepted_types}</p>
          </div>
        ))}
      </div>
    </div>
  );
}