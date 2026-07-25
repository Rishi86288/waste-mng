export default function TermsAndConditions() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 min-h-screen">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Terms & Conditions</h1>
      
      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Agreement to Terms</h2>
          <p>By registering and using the Duvision platform, you explicitly agree to these Terms and Conditions. You agree to share your personal details, secure banking details, and account information with us for the purpose of credit disbursement.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Data Sharing Consent</h2>
          <p>You acknowledge and consent that sharing your personal and banking data with Duvision is completely voluntary but necessary to receive payouts. You agree that Duvision will securely store and process this data, and you hold no objections to this requirement.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Fair Usage & Fraud Prevention</h2>
          <p>Users must only scan and deposit legitimate waste materials. Any attempt to manipulate the system (e.g., scanning fake images, tampering with the smart dustbin sensors, or inflating weight artificially) will result in immediate account suspension and forfeiture of all pending credits.</p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Payment Authorization</h2>
          <p>Duvision will solely process payments through authorized banking channels. We reserve the right to withhold credits if bank authorization fails or if fraudulent activity is suspected.</p>
        </section>
      </div>
    </div>
  );
}