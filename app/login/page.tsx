"use client";
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // डेटाबेस में लास्ट लॉग इन टाइम अपडेट करने के लिए
  const syncUserToDatabase = async (uid: string, email: string, name: string) => {
    await fetch("/api/user/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid, email, name }),
    });
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      // लॉग इन के बाद डेटाबेस सिंक करना
      await syncUserToDatabase(res.user.uid, res.user.email!, res.user.displayName || "User");
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      // गूगल लॉग इन के बाद डेटाबेस सिंक करना
      await syncUserToDatabase(res.user.uid, res.user.email!, res.user.displayName || "Google User");
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-900 rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <input type="email" placeholder="Email" required className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-green-500 outline-none" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" required className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-green-500 outline-none" onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition">Sign In</button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px bg-gray-200 flex-1"></div>
          <span className="text-sm text-gray-400">OR</span>
          <div className="h-px bg-gray-200 flex-1"></div>
        </div>

        <button onClick={handleGoogleLogin} className="w-full bg-white border border-gray-300 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-50 transition flex justify-center items-center gap-2">
          🌍 Continue with Google
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don&apos;t have an account? <Link href="/signup" className="text-green-600 font-bold">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}