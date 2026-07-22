"use client";
import { useState, useRef, useEffect } from "react";

export default function LiveScanPage() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [prediction, setPrediction] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null); // नया: एरर दिखाने के लिए
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const isScanningRef = useRef(false);

  useEffect(() => {
    async function initCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment", width: { ideal: 640 }, height: { ideal: 480 } }
        });
        mediaStreamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasPermission(true);
      } catch (err) {
        console.error("Camera error:", err);
        setHasPermission(false);
      }
    }
    initCamera();

    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // लाइव स्कैनिंग लूप
  useEffect(() => {
    if (!hasPermission) return;

    const intervalId = setInterval(async () => {
      if (!videoRef.current || !canvasRef.current || isScanningRef.current) return;
      
      isScanningRef.current = true;
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // नया फिक्स: इमेज का साइज छोटा करना ताकि API फास्ट चले और क्रैश न हो
      const MAX_WIDTH = 480; 
      const scale = MAX_WIDTH / (video.videoWidth || 640);
      canvas.width = MAX_WIDTH;
      canvas.height = (video.videoHeight || 480) * scale;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const base64Image = canvas.toDataURL("image/jpeg", 0.6); // 60% क्वालिटी से पेलोड छोटा होगा

        try {
          const res = await fetch("/api/scan", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: base64Image, userId: "Rishi_Raj" }),
          });
          
          // अगर API 500 या 404 मारती है
          if (!res.ok) {
            setErrorMsg(`सर्वर एरर: ${res.status} - API कनेक्ट नहीं हो पा रही है।`);
            isScanningRef.current = false;
            return;
          }

          const data = await res.json();
          
          if (data.success) {
            setPrediction(data);
            setErrorMsg(null); // सफलता पर एरर हटा दो
          } else {
            // अगर रोबोफ्लो या बैकएंड से कोई एरर आए
            setPrediction(null);
            setErrorMsg(`API एरर: ${data.message || data.error}`);
          }
        } catch (e: any) {
          console.error("Network error:", e);
          setPrediction(null);
          setErrorMsg(`नेटवर्क एरर: बैकएंड से कनेक्ट नहीं हो पाया। (${e.message})`);
        }
      }
      isScanningRef.current = false;
    }, 2500); 

    return () => clearInterval(intervalId);
  }, [hasPermission]);

  return (
    <div className="flex flex-col items-center p-4 max-w-md mx-auto min-h-screen bg-gray-50">
      <h1 className="text-xl font-bold mb-4 text-green-800 tracking-wide">🤖 AI Live Scanner</h1>

      {/* लाइव कैमरा व्यू */}
      <div className="relative w-full bg-black rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-800">
        <video ref={videoRef} autoPlay playsInline muted className="w-full h-80 object-cover" />
        <canvas ref={canvasRef} className="hidden" />
        <div className="absolute top-3 right-3 flex items-center gap-2 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          Live AI Active
        </div>
      </div>

      {/* नया: एरर मैसेज डिस्प्ले (अगर कुछ भी फेल होता है तो यहाँ दिखेगा  ) */}
      {errorMsg && (
        <div className="mt-4 w-full p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm font-semibold">
          ⚠️ {errorMsg}
        </div>
      )}

      {/* रियल-टाइम डिटेक्शन रिजल्ट */}
      <div className="mt-4 w-full p-5 bg-white border-2 border-green-200 rounded-2xl shadow-xl transition-all duration-300">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Live  Analysis Result</h2>
        
        {prediction ? (
          <div className="animate-in fade-in duration-300">
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
          !errorMsg && (
             <div className="flex flex-col items-center justify-center py-6 opacity-60">
              <div className="w-8 h-8 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin mb-3"></div>
              <p className="text-gray-500 text-sm font-medium">Scanning for waste object...</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}