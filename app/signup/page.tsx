"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [name, setName] = useState(""); // नया स्टेट: Full Name के लिए
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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 1. Firebase में अकाउंट बनाना
      const res = await createUserWithEmailAndPassword(auth, email, password);
      
      // 2. Firebase प्रोफाइल में नाम अपडेट करना
      await updateProfile(res.user, { displayName: name });
      
      // 3. PostgreSQL डेटाबेस में असली नाम सेव करना (New User की जगह)
      await syncUserToDatabase(res.user.uid, res.user.email!, name);
      
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      await syncUserToDatabase(res.user.uid, res.user.email!, res.user.displayName || "Google User");
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-900 rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        
        <form onSubmit={handleSignup} className="space-y-4">
          {/* नया Full Name इनपुट फील्ड */}
          <input 
            type="text" 
            placeholder="Full Name" 
            required 
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-green-500 outline-none" 
            onChange={(e) => setName(e.target.value)} 
          />
          <input 
            type="email" 
            placeholder="Email" 
            required 
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-green-500 outline-none" 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            required 
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-green-500 outline-none" 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition">
            Sign Up
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px bg-gray-200 flex-1"></div>
          <span className="text-sm text-gray-400">OR</span>
          <div className="h-px bg-gray-200 flex-1"></div>
        </div>

        <button onClick={handleGoogleSignup} className="w-full bg-white border border-gray-300 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-50 transition flex justify-center items-center gap-2">
          🌍 Continue with Google
        </button>
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account? <Link href="/login" className="text-green-600 font-bold">Sign In</Link>
        </p>
      </div>
    </div>
  );
}