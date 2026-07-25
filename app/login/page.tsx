// app/login/page.tsx
"use client";
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase"; // अपना पाथ चेक कर लें
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const syncUserToDatabase = async (uid: string, email: string, name: string) => {
    await fetch("/api/user/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid, email, name }),
    });
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // नया प्रयास करने पर पुराना एरर हटा दें
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      await syncUserToDatabase(res.user.uid, res.user.email!, res.user.displayName || "User");
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        // Firebase के invalid-credential एरर को कैच करके कस्टम मैसेज सेट करना
        if (err.message.includes("auth/invalid-credential") || (err as any).code === "auth/invalid-credential") {
          setError("Incorrect Email or Password. Please enter correct details or 'Continue with Google'.");
        } else {
          // अगर कोई और एरर हो (जैसे नेटवर्क इश्यू)
          setError("An error occurred during login. Please try again.");
        }
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      await syncUserToDatabase(res.user.uid, res.user.email!, res.user.displayName || "Google User");
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      {/* बैकग्राउंड कलर आपके UI के अनुसार सेट किया है */}
      <div className="max-w-md w-full bg-[#0b1a2a] rounded-2xl shadow-lg border border-gray-700 p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">Welcome Back</h2>
        
        {/* एरर मैसेज को लाल रंग में दिखाने के लिए */}
        {error && <p className="text-red-500 text-sm mb-4 text-center font-medium">{error}</p>}
        
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <input 
            type="email" 
            placeholder="Email" 
            required 
            className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-[#162940] text-white focus:ring-2 focus:ring-green-500 outline-none placeholder-gray-400" 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            required 
            className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-[#162940] text-white focus:ring-2 focus:ring-green-500 outline-none placeholder-gray-400" 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button type="submit" className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition">
            Sign In
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px bg-gray-600 flex-1"></div>
          <span className="text-sm text-gray-400">OR</span>
          <div className="h-px bg-gray-600 flex-1"></div>
        </div>

        <button onClick={handleGoogleLogin} className="w-full bg-[#e8f0eb] border border-gray-300 text-gray-800 font-bold py-3 rounded-lg hover:bg-white transition flex justify-center items-center gap-2">
          🌍 Continue with Google
        </button>

        <p className="text-center text-sm text-gray-400 mt-6">
          Don&apos;t have an account? <Link href="/signup" className="text-green-500 font-bold hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}