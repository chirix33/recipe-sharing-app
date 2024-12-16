"use client";
import Link from 'next/link';

const ErrorPage: React.FC = () => {
  const login = "/login";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Sign-In Error</h1>
        <p className="text-gray-700 mb-6">
          Oops! Something went wrong while trying to sign you in. Please check your credentials and try again.
        </p>
        <p className="text-gray-700 mb-6">
          Possible reason for this error might be <b>using Google Sign In when you already have an account with the same email address</b>.
        </p>
        <Link
          href={login}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Retry Sign-In
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;