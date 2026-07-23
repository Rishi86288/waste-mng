"use client";
import { useState } from "react";

export default function LiveScanPage() {
  const [prediction, setPrediction] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    setPrediction(null);
    setIsScanning(true);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result as string;
      setImagePreview(base64Image); // इमेज का प्रीव्यू दिखाने के लिए

      try {
        const res = await fetch("/api/scan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64Image, userId: "Rishi_Raj" }),
        });

        // अगर API 500 या 404 मारती है (आपके ओरिजिनल कोड का लॉजिक)
        if (!res.ok) {
          setErrorMsg(`सर्वर एरर: ${res.status} - API कनेक्ट नहीं हो पा रही है।`);
          setIsScanning(false);
          return;
        }

        const data = await res.json();

        if (data.success) {
          setPrediction(data);
          setErrorMsg(null); // सफलता पर एरर हटा दो
        } else {
          setErrorMsg(data.message || "डिटेक्शन फेल हो गया।");
        }
      } catch (e: any) {
        console.error("Network error:", e);
        setErrorMsg(`नेटवर्क एरर: बैकएंड से कनेक्ट नहीं हो पाया। (${e.message})`);
      } finally {
        setIsScanning(false);
      }
    };
  };

  return (
    <div className="flex flex-col items-center p-4 max-w-md mx-auto min-h-screen bg-gray-50">
      <h1 className="text-xl font-bold mb-4 text-green-800 tracking-wide">AI Live Scanner</h1>

      {/* लाइव कैमरा व्यू की जगह - फाइल अपलोड व्यू */}
      <div className="relative w-full bg-black rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-800 p-4 flex flex-col items-center justify-center min-h[250px]">
        {imagePreview ? (
          <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg mb-4" />
        ) : (
          <p className="text-gray-300 mb-4 font-medium text-sm">कचरे की फोटो अपलोड करें</p>
        )}
        
        <label className="bg-green-600 text-white px-5 py-2.5 rounded-lg cursor-pointer hover:bg-green-700 text-sm font-semibold transition-all">
          फोटो चुनें
          <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
        </label>
      </div>

      {/* नया: एरर मैसेज डिस्प्ले */}
      {errorMsg && (
        <div className="mt-4 w-full p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
          ⚠️ {errorMsg}
        </div>
      )}

      {/* रियल-टाइम डिटेक्शन रिजल्ट */}
      {prediction ? (
        <div className="animate-in fade-in duration-300 mt-4 w-full p-5 bg-white border-2 border-green-200 rounded-2xl shadow-xl transition-all">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Live Analysis Result</h2>
          
          <div className="flex justify-between items-center border-b pb-3 mb-3">
            <span className="text-2xl font-extrabold text-gray-800 capitalize">{prediction.category}</span>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-black rounded-lg">
              {(prediction.confidence * 100).toFixed(0)}%
            </span>
          </div>
          
          <p className="text-sm text-blue-800 font-semibold bg-blue-50/50 p-3 rounded-lg border border-blue-100">
            💡 {prediction.disposalInstruction}
          </p>
        </div>
      ) : (
        !errorMsg && isScanning && (
          <div className="flex flex-col items-center justify-center py-6 opacity-60">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
            <p className="text-gray-500 text-sm font-medium mt-2">Scanning for waste object...</p>
          </div>
        )
      )}
    </div>
  );
}