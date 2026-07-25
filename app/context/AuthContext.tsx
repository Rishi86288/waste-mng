"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "../lib/firebase"; // अपना पाथ चेक कर लें (जैसे ../lib/firebase)

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Firebase से यूजर के लॉग इन का समय निकाल रहे हैं
        const lastSignInTime = new Date(currentUser.metadata.lastSignInTime || "").getTime();
        const currentTime = Date.now();
        const TWENTY_FOUR_HOURS = 1 * 60 * 1000; // 24 घंटे को मिलीसेकंड्स में बदला

        // अगर लॉग इन को 24 घंटे से ज्यादा हो गए हैं
        if (currentTime - lastSignInTime > TWENTY_FOUR_HOURS) {
          await signOut(auth); // ऑटोमेटिक लॉग आउट
          setUser(null);
        } else {
          setUser(currentUser);
          
          // अगर यूजर 24 घंटे तक टैब ओपन रखता है, तो एग्जैक्ट 24 घंटे पूरे होते ही लॉग आउट कर दे
          const timeRemaining = TWENTY_FOUR_HOURS - (currentTime - lastSignInTime);
          setTimeout(() => {
            signOut(auth);
          }, timeRemaining);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);