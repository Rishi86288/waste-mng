"use client";
import { useState, useRef, useEffect } from "react";

export default function ScanPage() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 1. यूजर से कैमरा परमिशन लेने का कोड
  useEffect(() => {
    async function getCameraPermission() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: "environment" } // पिछला कैमरा चालू करने के लिए
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasPermission(true);
      } catch (error) {
        console.error("Camera permission denied:", error);
        setHasPermission(false);
      }
    }
    getCameraPermission();
  }, []);

  // 2. फोटो कैप्चर करके AI API पर भेजने का फंक्शन
  const captureAndScan = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    setScanning(true);

    const canvas = canvasRef.current;
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const base64Image = canvas.toDataURL("image/jpeg");

      // Next.js API रूट पर इमेज भेजना
      try {
        const response = await fetch("/api/scan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64Image, userId: "user_123" }),
        });
        const data = await response.json();
        setResult(data);
      } catch (err) {
        console.error("Scan failed", err);
      } finally {
        setScanning(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">AI Waste Scanner</h1>

      {hasPermission === false && (
        <p className="text-red-500">कृपया अपने ब्राउज़र सेटिंग्स से कैमरा की परमिशन दें।</p>
      )}

      {/* लाइव कैमरा व्यू */}
      <div className="relative w-full max-w-md bg-black rounded-lg overflow-hidden shadow-lg">
        <video ref={videoRef} autoPlay playsInline className="w-full h-80 object-cover" />
        <canvas ref={canvasRef} className="hidden" />
      </div>

      <button
        onClick={captureAndScan}
        disabled={scanning || !hasPermission}
        className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow-md hover:bg-green-700 disabled:bg-gray-400"
      >
        {scanning ? "एनालिसिस हो रहा है..." : "कचरा स्कैन करें 📸"}
      </button>

      {/* AI रिजल्ट और रीसाइक्लिंग गाइडेंस */}
      {result && (
        <div className="mt-6 w-full max-w-md p-4 bg-white border border-green-200 rounded-lg shadow-sm">
          <h2 className="text-lg font-bold text-green-700">पहचान परिणाम:</h2>
          <p><strong>श्रेणी (Category):</strong> {result.category}</p>
          <p><strong>सटीकता (Confidence):</strong> {(result.confidence * 100).toFixed(1)}%</p>
          <p className="mt-2 text-sm text-blue-600 font-medium">सुझाव: {result.disposalInstruction}</p>
          <p className="mt-1 text-xs text-green-600 font-bold">+ {result.pointsAwarded} ग्रीन पॉइंट्स जोड़े गए!</p>
        </div>
      )}
    </div>
  );
}