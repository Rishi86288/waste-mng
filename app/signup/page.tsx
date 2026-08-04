// app/signup/page.tsx
"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase"; // अपना पाथ चेक कर लें
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [name, setName] = useState("");
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
    setError(""); // नया प्रयास करने पर पुराना एरर हटा दें    

    try {
      // 1. Firebase में अकाउंट बनाना
      const res = await createUserWithEmailAndPassword(auth, email, password);
      
      // 2. Firebase प्रोफाइल में नाम अपडेट करना
      await updateProfile(res.user, { displayName: name });
      
      // 3. PostgreSQL डेटाबेस में असली नाम सेव करना
      await syncUserToDatabase(res.user.uid, res.user.email!, name);
      
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        const errorCode = (err as any).code || err.message;
        
        // Firebase के अलग-अलग एरर्स को कैच करके कस्टम मैसेज सेट करना
        if (errorCode.includes("auth/invalid-email")) {
          setError("Invalid email format. Please enter a valid email address.");
        } else if (errorCode.includes("auth/weak-password")) {
          setError("Password is too weak. It must be at least 6 characters long.");
        } else if (errorCode.includes("auth/email-already-in-use")) {
          setError("This email is already registered. Please sign in instead.");
        } else {
          setError("An error occurred during sign up. Please try again.");
        }
      }
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    try {
      const res = await signInWithPopup(auth, googleProvider);
      await syncUserToDatabase(res.user.uid, res.user.email!, res.user.displayName || "Google User");
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        const errorCode = (err as any).code || err.message;
        if (errorCode.includes("auth/popup-closed-by-user")) {
          setError("Google sign-up was canceled.");
        } else {
          setError("An error occurred with Google sign-in. Please try again.");
        }
      }
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      {/* बैकग्राउंड और UI आपके पुराने कोड के अनुसार ही है */}
      <div className="max-w-md w-full bg-gray-900 rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">Create Account</h2>
        
        {/* एरर मैसेज */}
        {error && <p className="text-red-500 text-sm mb-4 text-center font-medium">{error}</p>}
        
        <form onSubmit={handleSignup} className="space-y-4">
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
        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account? <Link href="/login" className="text-green-500 font-bold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}