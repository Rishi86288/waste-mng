export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Get In Touch</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Have questions about our AI model, want to collaborate, or need support? We'd love to hear from you.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
          
          {/* Contact Info (Left Side) */}
          <div className="w-full md:w-1/3 bg-green-800 p-8 text-white flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-green-100 text-sm mt-1">CIPET IPT, Phase-IV, Vatva GIDC,<br/>Ahmedabad, Gujarat 382445</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl">📧</span>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-green-100 text-sm mt-1">support@cipethub.in</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (Right Side) */}
          <div className="w-full md:w-2/3 p-8">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all" placeholder="How can we help?" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all" placeholder="Write your message here..."></textarea>
              </div>
              <button type="button" className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors shadow-md">
                Send Message
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
}