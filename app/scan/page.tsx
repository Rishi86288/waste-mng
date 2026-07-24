"use client";
import { useState } from "react";

export default function ScanPage() {
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

    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result as string;

      img.onload = async () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 640;
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

        const base64Image = canvas.toDataURL("image/jpeg", 0.6);
        setImagePreview(base64Image); 

        try {
          const res = await fetch("/api/scan", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: base64Image }),
          });

          const textResponse = await res.text();
          let data;

          try {
            data = JSON.parse(textResponse);
          } catch (parseError) {
            setErrorMsg(`Server Error: ${textResponse.substring(0, 50)}...`);
            setIsScanning(false);
            return;
          }

          if (!res.ok) {
            setErrorMsg(`Backend Error: ${data.error || "Server crash"}`);
            setIsScanning(false);
            return;
          }

          if (data.success) {
            setPrediction(data);
          } else {
            setErrorMsg(data.message || "Detection failed.");
          }
        } catch (e: any) {
          setErrorMsg(`Network Error: ${e.message}`);
        } finally {
          setIsScanning(false);
        }
      };
    };
  };

  return (
    <div className="flex flex-col items-center py-12 px-4 w-full bg-gray-50 min-h-[80vh]">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">AI Waste Scanner</h1>
          <p className="text-gray-500 text-sm mt-1">Upload an image to identify the waste type.</p>
        </div>

        <div className="relative w-full bg-gray-900 rounded-xl overflow-hidden shadow-inner border-2 border-gray-200 p-6 flex flex-col items-center justify-center min-h-/[250px] mb-6">
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="w-full h-48 object-contain rounded-lg mb-4" />
          ) : (
            <div className="text-6xl mb-4 opacity-50">📷</div>
          )}
          
          <label className="bg-green-600 text-white px-6 py-2.5 rounded-lg cursor-pointer hover:bg-green-700 text-sm font-semibold transition-all shadow-md">
            {imagePreview ? "Retake Photo" : "Upload Photo"}
            <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
          </label>
        </div>

        {errorMsg && (
          <div className="w-full p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md text-sm mb-4">
            {errorMsg}
          </div>
        )}

        {prediction ? (
          <div className="animate-in fade-in duration-300 w-full p-5 bg-green-50 border border-green-200 rounded-xl">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Analysis Result</h2>
            <div className="flex justify-between items-center border-b border-green-200 pb-3 mb-3">
              <span className="text-2xl font-extrabold text-green-900 capitalize">{prediction.category}</span>
              <span className="px-3 py-1 bg-green-200 text-green-800 text-sm font-bold rounded-lg">
                {(prediction.confidence * 100).toFixed(0)}% Match
              </span>
            </div>
            <p className="text-sm text-gray-700 font-medium">
              💡 {prediction.disposalInstruction}
            </p>
          </div>
        ) : (
          !errorMsg && isScanning && (
            <div className="flex flex-col items-center justify-center py-6">
              <div className="w-8 h-8 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin"></div>
              <p className="text-gray-500 text-sm font-medium mt-3">Analyzing image with AI...</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}