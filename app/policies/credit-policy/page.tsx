export default function CreditPolicy() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 min-h-screen">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Credit & Payout Policy</h1>
      
      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">1. The Duvision Reward Model</h2>
          <p>Duvision operates on a circular economy model. When you scan waste and deposit it into a designated Duvision smart dustbin, the waste is subsequently collected by our partner recycling companies. We monetize this collected waste to reward our users.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Calculation of Credits</h2>
          <p>Credits are distributed based on the <strong>verified weight and category</strong> of the waste deposited. After Duvision receives payment from the partner collection company, we retain a nominal platform maintenance fee. The remaining funds are distributed among contributing users proportionally.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Payout Timeline & Conditions</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>7-Day Window:</strong> Your calculated monetary credit will be transferred to your account within <strong>7 days</strong> from the date Duvision receives the funds from the recycling partner.</li>
            <li><strong>Bank Authorization:</strong> Payouts are strictly processed to verified bank accounts. Simple UPI IDs without proper banking authorization will not be accepted. You must complete the bank linking process within the app.</li>
            <li><strong>No Refunds:</strong> As we provide monetary credits for deposited waste, standard e-commerce "refunds" do not apply. All credited amounts are final once processed.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}