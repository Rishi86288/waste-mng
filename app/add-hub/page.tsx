"use client";
import { useEffect, useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute"; 
import { useAuth } from "../context/AuthContext";

export default function AddHubPage() {
  const { user } = useAuth();
  
  // States for user profile
  const [dbName, setDbName] = useState<string>("");
  const [points, setPoints] = useState<number>(0); 
  const [scansCompleted, setScansCompleted] = useState<number>(0);
  const [userRank, setUserRank] = useState<string>("Unranked");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Form status states
  const [result, setResult] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Waste types states
  const [selectedWastes, setSelectedWastes] = useState<string[]>([]);
  const [customWaste, setCustomWaste] = useState<string>("");

  const wasteOptions = [
    "Paper Waste", "Plastic Waste", "E-Waste", 
    "Recyclable Waste", "Reusable Waste", "Hazardous Waste", "Other"
  ];

  useEffect(() => {
    // 1. Fetching User Data
    if (user?.uid) {
      fetch(`/api/user/profile?uid=${user.uid}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setDbName(data.profile.name);
            setPoints(data.profile.green_points);
            setScansCompleted(data.profile.scans_completed);
            setUserRank(`#${data.rank}`);
          }
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    } else {
        setIsLoading(false); 
    }
    
    // 2. Web3Forms Captcha Script
    const script = document.createElement("script");
    script.src = "https://web3forms.com/client/script.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [user]);

  const displayName = dbName || user?.displayName || "User";
  const emailID = user?.email || "";

  // Checkbox Handler
  const handleCheckboxChange = (option: string) => {
    if (selectedWastes.includes(option)) {
      setSelectedWastes(selectedWastes.filter(item => item !== option));
      if (option === "Other") setCustomWaste(""); 
    } else {
      setSelectedWastes([...selectedWastes, option]);
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedWastes.length === 0) {
      setResult("Error: Please select at least one Waste Type.");
      return;
    }

    setIsSubmitting(true);
    setResult("Sending request...");
    
    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setResult("Error: API Key is missing in .env file.");
      setIsSubmitting(false);
      return;
    }

    // Processing Multiple Waste Types
    let finalTypesArray = selectedWastes.filter(w => w !== "Other"); 
    if (selectedWastes.includes("Other") && customWaste.trim() !== "") {
      finalTypesArray.push(customWaste.trim()); 
    }
    const finalAcceptedTypes = finalTypesArray.join(", "); 

    formData.append("Accepted Waste Types", finalAcceptedTypes);
    formData.append("access_key", accessKey); 
    formData.append("subject", "New Recycling Hub Request - Duvision");

    try {
        // Submit to Web3Forms
        const emailResponse = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });
        const emailData = await emailResponse.json();

        // Submit to Database
        const dbPayload = {
            user_uid: user?.uid,
            name: displayName,
            email: emailID,
            rank: userRank,
            items_scanned: scansCompleted,
            green_points: points,
            contact_number: formData.get("contact_number"),
            village_panchayat: formData.get("village_panchayat"),
            block: formData.get("block"),
            city: formData.get("city"),
            district: formData.get("district"),
            state: formData.get("state"),
            pincode: formData.get("pincode"),
            accepted_types: finalAcceptedTypes 
        };

        const dbResponse = await fetch("/api/hubs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dbPayload)
        });
        const dbData = await dbResponse.json();

        if (emailData.success && dbData.success) {
          setIsSuccess(true);
          setResult("");
          target.reset();
          setSelectedWastes([]); 
          setCustomWaste("");
        } else {
          setResult(emailData.message || "Something went wrong with submission.");
        }
    } catch (error) {
        console.error("Error submitting form", error);
        setResult("Something went wrong. Please try again.");
    } finally {
        setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex justify-center items-start">
        <div className="max-w-3xl w-full bg-white rounded-2xl shadow-md border border-gray-100 p-8">
          
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900">Add a New Recycling Hub ♻️</h1>
            <p className="text-gray-600 mt-2">Help Duvision expand! Submit the details below to propose a new recycling location.</p>
          </div>

          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="w-24 h-24 rounded-full border-4 border-green-500 flex items-center justify-center mb-6">
                  <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
              </div>
              <h2 className="text-3xl font-bold text-green-600 mb-4">Success</h2>
              <p className="text-center text-gray-700 text-lg font-medium max-w-xl leading-relaxed mb-8">
                We will thoroughly review the location you have provided within 30 days. A representative will visit the site to conduct a complete inspection. Once all reviews are finalized, you will be notified via email or message.
              </p>
              <button onClick={() => setIsSuccess(false)} className="text-blue-600 hover:text-blue-800 text-lg font-semibold hover:underline">
                  Go back
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-6">
              
              {/* --- PRE-FILLED USER DATA SECTION --- */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-4">Your Profile Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" name="name" value={displayName} readOnly className="mt-1 w-full p-2.5 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email ID</label>
                    <input type="email" name="email" value={emailID} readOnly className="mt-1 w-full p-2.5 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Current Rank</label>
                    <input type="text" name="rank" value={userRank} readOnly className="mt-1 w-full p-2.5 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Items Scanned</label>
                    <input type="text" name="items_scanned" value={scansCompleted} readOnly className="mt-1 w-full p-2.5 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 cursor-not-allowed" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Green Points</label>
                    <input type="text" name="green_points" value={points} readOnly className="mt-1 w-full p-2.5 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 cursor-not-allowed" />
                  </div>
                </div>
              </div>

              {/* --- HUB DETAILS SECTION --- */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-4 border-b pb-2">Hub Location & Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contact Number *</label>
                    <input type="tel" name="contact_number" required placeholder="Enter your mobile number" className="mt-1 w-full p-2.5 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" />
                  </div>

                  {/* --- Multiple Waste Types Checkboxes --- */}
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Accepted Waste Types * (Select Multiple)</label>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {wasteOptions.map((option) => (
                        <label key={option} className="flex items-center space-x-3 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={selectedWastes.includes(option)}
                            onChange={() => handleCheckboxChange(option)}
                            className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                          />
                          <span className="text-gray-700 font-medium">{option}</span>
                        </label>
                      ))}
                    </div>

                    {/* Custom input for "Other" */}
                    {selectedWastes.includes("Other") && (
                      <div className="mt-4 animate-fade-in-down">
                        <label className="block text-sm font-medium text-gray-700">Specify Custom Waste Type(s) *</label>
                        <input 
                          type="text" 
                          required 
                          value={customWaste}
                          onChange={(e) => setCustomWaste(e.target.value)}
                          placeholder="e.g. Organic Waste, Metals" 
                          className="mt-1 w-full p-2.5 border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
                        />
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Village / Panchayat *</label>
                      <input type="text" name="village_panchayat" required placeholder="Village or Panchayat name" className="mt-1 w-full p-2.5 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Block *</label>
                      <input type="text" name="block" required placeholder="Block name" className="mt-1 w-full p-2.5 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">City (Optional)</label>
                      <input type="text" name="city" placeholder="City name" className="mt-1 w-full p-2.5 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">District *</label>
                      <input type="text" name="district" required placeholder="District" className="mt-1 w-full p-2.5 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">State *</label>
                      <input type="text" name="state" required placeholder="State" className="mt-1 w-full p-2.5 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Pin Code *</label>
                      <input type="text" name="pincode" required placeholder="e.g. 110001" pattern="[0-9]{6}" title="6 digit pin code" className="mt-1 w-full p-2.5 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* --- CAPTCHA & HONEYPOT SECTION (बिलकुल सुरक्षित) --- */}
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />
              <div className="h-captcha mt-2" data-captcha="true"></div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold rounded-lg shadow-md transition-colors duration-200"
              >
                {isSubmitting ? "Submitting..." : "Submit Hub Request"}
              </button>
              
              {/* Error/Sending Message */}
              {result && !isSuccess && (
                <p className="text-center mt-4 text-sm font-semibold text-red-600">{result}</p>
              )}
            </form>
          )}

        </div>
      </div>
    </ProtectedRoute>
  );
}