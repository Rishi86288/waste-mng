import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center">
      <h1 className="text-3xl font-bold mb-4 text-green-800">please,कचरे को सही जगह पर लगाएं!</h1>
      <p className="text-gray-600 max-w-md mb-8">
        अपने मोबाइल कैमरे से कचरे की तस्वीर लें, AI द्वारा उसकी पहचान करें, सही डिब्बे का सुझाव पाएं और ग्रीन पॉइंट्स जीतें।
      </p>
      
      <div className="flex gap-4">
        <Link href="/scan" className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700">
          स्कैन करना शुरू करें 📸
        </Link>
        <Link href="/dashboard" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700">
          डैशबोर्ड देखें 📊
        </Link>
      </div>
    </div>
  );
}