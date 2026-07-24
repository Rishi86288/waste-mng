export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-green-700 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">About Duvision</h1>
        <p className="text-green-100 text-lg max-w-2xl mx-auto">
          Revolutionizing waste management through Artificial Intelligence and community engagement.
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Waste segregation is the biggest challenge in modern recycling. Most recyclable materials end up in landfills simply because they are thrown in the wrong bin. Duvision was born out of the necessity to solve this problem at the root level.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We aim to create a smart campus and eventually a smart city where every individual is empowered to make the right ecological choice with just a tap on their mobile phone.
            </p>
          </div>
          <div className="bg-gray-100 rounded-2xl h-64 flex items-center justify-center border-4 border-dashed border-gray-300">
            <span className="text-6xl">🌍</span>
          </div>
        </div>

        {/* How it works detailed */}
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">How Duvision Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-green-50 p-6 rounded-xl border border-green-100">
            <div className="text-3xl mb-3">1️⃣</div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Capture & Upload</h3>
            <p className="text-sm text-gray-600">Simply open the scanner and take a photo of the waste item you want to dispose of.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <div className="text-3xl mb-3">2️⃣</div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">AI Analysis</h3>
            <p className="text-sm text-gray-600">Our machine learning model analyzes the image instantly to identify the material category.</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
            <div className="text-3xl mb-3">3️⃣</div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Smart Segregation</h3>
            <p className="text-sm text-gray-600">The app suggests the correct bin (Dry, Wet, E-Waste) and rewards you with Green Points.</p>
          </div>
        </div>
      </div>
    </div>
  );
}