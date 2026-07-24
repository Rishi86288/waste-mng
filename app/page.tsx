import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-tob from-green-50 to-white py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto mt-10">
          <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold text-green-800 bg-green-100 rounded-full">
            🚀 Smart Waste Management Solution
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900 tracking-tight leading-tight">
            Put Your Trash in the <span className="text-transparent bg-clip-text bg-gradient-tor from-green-600 to-emerald-400">Right Place</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Take a picture of your waste with your mobile camera, let our advanced AI identify it, get the perfect bin suggested, and earn <strong>Green Points</strong> for saving the planet.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/scan" className="px-8 py-4 bg-green-600 text-white font-bold rounded-xl shadow-lg hover:bg-green-700 hover:shadow-xl transition-all transform hover:-translate-y-1">
              Start Scanning 📸
            </Link>
            <Link href="/dashboard" className="px-8 py-4 bg-white text-gray-800 border-2 border-gray-200 font-bold rounded-xl shadow-sm hover:border-gray-300 hover:bg-gray-50 transition-all">
              View Dashboard 📊
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section (E-Cell Vibe) */}
      <section className="w-full py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Scan</h3>
              <p className="text-gray-600">Upload or click a picture of the waste item using our AI scanner interface.</p>
            </div>
            {/* Feature 2 */}
            <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">AI Segregation</h3>
              <p className="text-gray-600">Our machine learning model instantly identifies the material and right bin.</p>
            </div>
            {/* Feature 3 */}
            <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Earn Rewards</h3>
              <p className="text-gray-600">Dispose correctly at designated spots and earn points for your institute profile.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}