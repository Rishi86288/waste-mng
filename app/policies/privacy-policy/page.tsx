export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 min-h-screen">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
      
      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Introduction</h2>
          <p>Welcome to Duvision. We are committed to protecting your personal information and your right to privacy. This policy outlines how we collect, use, and safeguard your data when you use our AI waste segregation and credit distribution app.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Information We Collect</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Personal Information:</strong> Name, email address, and contact details collected during registration.</li>
            <li><strong>Banking & Financial Data:</strong> Bank account details and authorization tokens required strictly for the disbursement of waste credits.</li>
            <li><strong>Usage Data:</strong> Images of waste scanned via our app and metadata related to your deposits in Duvision dustbins.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">3. How We Use Your Data</h2>
          <p>Your data is securely stored and is used exclusively for:</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>Verifying the waste you deposit and calculating your weight-based rewards.</li>
            <li>Processing secure bank payouts via authorized banking channels.</li>
            <li>Improving our AI computer vision models.</li>
          </ul>
          <p className="mt-2 font-semibold">We do not sell your personal or banking data to third parties.</p>
        </section>
      </div>
    </div>
  );
}