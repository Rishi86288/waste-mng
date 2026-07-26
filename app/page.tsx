import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center overflow-hidden">
      
      {/* 1. Hero Section */}
      <section className="w-full bg-gradient-tob from-white via-green-50/30 to-white py-12 md:py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 text-left z-10">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 text-xs font-semibold text-green-800 bg-green-100 rounded-full border border-green-200 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
              AI-Powered Waste Management Solution
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 text-gray-900 tracking-tight leading-[1.15]">
              Put Your Trash in the <br className="hidden sm:inline" />
              <span className="text-green-700">Right Place</span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-gray-600 max-w-xl mb-8 leading-relaxed">
              Take a picture of your waste with your mobile camera, let our advanced AI identify it, get the perfect bin suggested, and earn Green Points for saving the planet.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 items-center mb-10">
              <Link 
                href="/scan" 
                className="px-6.5 py-3.5 bg-green-900 text-white font-semibold rounded-xl shadow-lg hover:bg-green-800 transition-all flex items-center gap-2 text-sm"
              >
                Start Scanning 
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812-1.22A2 2 0 0118.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </Link>
              <Link 
                href="/dashboard" 
                className="px-6.5 py-3.5 bg-white text-gray-800 border border-gray-200 font-semibold rounded-xl shadow-sm hover:bg-gray-50 transition-all flex items-center gap-2 text-sm"
              >
                View Dashboard 
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
              </Link>
            </div>

            {/* Community Avatars */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2 overflow-hidden">
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="User" />
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" alt="User" />
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" alt="User" />
                <img className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" alt="User" />
              </div>
              <div className="text-sm text-gray-600">
                <strong className="text-gray-900 font-bold">Join 10K+</strong> eco-warriors <br />
                making a difference
              </div>
            </div>

          </div>

          {/* Right Floating Cards & Graphic representation */}
          <div className="lg:col-span-5 relative flex justify-center items-center mt-8 lg:mt-0">
            <div className="relative w-full max-w-md bg-green-900/10 rounded-3xl p-6 flex flex-col items-center border border-green-200/50">
              
              {/* Phone Mockup visual representation */}
              <div className="w-64 bg-gray-900 rounded-[35px] p-3 shadow-2xl border-4 border-gray-800 mb-4 transform hover:scale-105 transition-transform">
                <div className="bg-black rounded-[25px] overflow-hidden p-3 text-white text-xs">
                  <div className="flex justify-between items-center mb-2 px-1 text-[10px] text-gray-400">
                    <span>9:41</span>
                    <span>🔋</span>
                  </div>
                  <div className="bg-green-800/80 rounded-xl p-3 text-center mb-2">
                    <p className="font-bold text-xs">Scan Waste</p>
                    <p className="text-[9px] text-green-200">identify and dispose responsibly</p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-2 text-center text-[10px] text-green-400 font-semibold">
                    📷 AI Model Active
                  </div>
                </div>
              </div>

              {/* Floating Stat Cards (Right side like image) */}
              <div className="absolute -right-4 sm:-right-8 top-10 bg-white p-3 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3 w-48">
                <div className="p-2 bg-green-100 rounded-xl text-green-600 text-lg">✨</div>
                <div>
                  <p className="text-[10px] text-gray-500 font-medium">AI Accuracy</p>
                  <p className="text-base font-extrabold text-gray-900">90.6%</p>
                </div>
              </div>

              <div className="absolute -right-4 sm:-right-8 top-32 bg-white p-3 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3 w-48">
                <div className="p-2 bg-emerald-100 rounded-xl text-emerald-600 text-lg">🍃</div>
                <div>
                  <p className="text-[10px] text-gray-500 font-medium">CO₂ Saved</p>
                  <p className="text-base font-extrabold text-gray-900">2,450 kg</p>
                </div>
              </div>

              <div className="absolute -right-4 sm:-right-8 top-54 bg-white p-3 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3 w-48">
                <div className="p-2 bg-purple-100 rounded-xl text-purple-600 text-lg">🗑️</div>
                <div>
                  <p className="text-[10px] text-gray-500 font-medium">Waste Scanned</p>
                  <p className="text-base font-extrabold text-gray-900">12,845</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* 2. "Why Duvision?" Features Section */}
      <section className="w-full py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <p className="text-green-700 font-semibold text-sm uppercase tracking-wider mb-2">Why Duvision?</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-12">
            Smarter Waste, Greener Future
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Feature 1 */}
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/55 hover:shadow-xl transition-all text-center group">
              <div className="w-14 h-14 mx-auto mb-5 bg-green-50 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                📸
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">AI Waste Detection</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Upload or capture waste image and our AI identifies it instantly.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/55 hover:shadow-xl transition-all text-center group">
              <div className="w-14 h-14 mx-auto mb-5 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                🗑️
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Right Bin Suggestion</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Get the perfect bin recommendation for proper disposal.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/55 hover:shadow-xl transition-all text-center group">
              <div className="w-14 h-14 mx-auto mb-5 bg-purple-50 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                📍
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Nearby Locations</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Find nearby recycling centers and eco-friendly disposal points.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/55 hover:shadow-xl transition-all text-center group">
              <div className="w-14 h-14 mx-auto mb-5 bg-amber-50 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                🎁
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Earn Green Points</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Recycle right, earn points, unlock rewards and discounts.
              </p>
            </div>

          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-2 mt-8">
           
            <span className="w-full h-2 rounded-full bg-green-600"></span>
        
          </div>

        </div>
      </section>


      {/* 3. Platform Stats Bar */}
      <section className="w-full py-8 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100 p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
          
          <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-2xl text-2xl">♻️</div>
            <div>
              <h4 className="text-2xl font-extrabold text-gray-900">12,845</h4>
              <p className="text-xs text-gray-500 font-medium">Waste Scanned</p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl text-2xl">👥</div>
            <div>
              <h4 className="text-2xl font-extrabold text-gray-900">8,231</h4>
              <p className="text-xs text-gray-500 font-medium">Users Joined</p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl text-2xl">🍃</div>
            <div>
              <h4 className="text-2xl font-extrabold text-gray-900">2,450 kg</h4>
              <p className="text-xs text-gray-500 font-medium">CO₂ Saved</p>
            </div>
          </div>

                    {/* <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl text-2xl">🤝</div>
 <div>
              <h4 className="text-2xl font-extrabold text-gray-900">15</h4>
              <p className="text-xs text-gray-500 font-medium">Partners</p>
            </div> 
          </div>
*/}
        </div>
      </section>


      {/* 4. "Be a Part of the Change" Banner Section ..*/}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative rounded-3xl overflow-hidden bg-gradient-tor from-green-50 to-emerald-100 border border-green-600/60 shadow-lg p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between">
          
          <div className="max-w-xl text-left z-10 mb-8 lg:mb-0">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4">
              Be a Part of the Change
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
              Small steps today, a greener tomorrow. Together, we can build a cleaner and sustainable future.
            </p>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="User" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" alt="User" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" alt="User" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-gray-700">
                Join thousands of users making a difference.
              </span>
            </div>
          </div>

          {/* Plant graphic representation style matching the reference image */}
          <div className="relative z-10 w-full lg:w-auto flex justify-center">
            <div className="bg-white/80 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-white flex items-center gap-4">
              <span className="text-4xl">🌱</span>
              <div>
                <p className="font-bold text-gray-900 text-sm">Sustainable Future</p>
                <p className="text-xs text-green-700 font-medium">Planting seeds for tomorrow</p>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}