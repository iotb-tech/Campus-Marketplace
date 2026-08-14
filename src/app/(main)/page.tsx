
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center gap-4">
      <h1 className="text-3xl font-bold">Academic Exchange</h1>
      <p className="text-gray-600">Welcome to the campus marketplace!</p>
      
      <div className="flex gap-4 mt-4">
        <Link 
          href="/signin" 
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
        >
          Go to Sign In
        </Link>
        <Link 
          href="/signup" 
          className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-xl hover:bg-gray-300 transition-colors"
        >
          Go to Sign Up
        </Link>
      </div>
    </div>
  );
}
