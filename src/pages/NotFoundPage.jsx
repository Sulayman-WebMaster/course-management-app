import React from 'react';
import { Link } from 'react-router';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-[#FE7743] to-[#FFB56B] text-white px-6">
      <h1 className="text-9xl font-extrabold tracking-widest drop-shadow-lg">404</h1>
      <div className="bg-white text-[#FE7743] px-8 py-4 rounded-lg shadow-lg mt-6 max-w-md text-center">
        <h2 className="text-3xl font-bold mb-2">Oops! Page Not Found</h2>
        <p className="mb-6 text-lg">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-[#FE7743] text-white px-6 py-3 rounded-md font-semibold shadow-md hover:bg-[#e86635] transition"
        >
          Go Home
        </Link>
      </div>
      <svg
        className="mt-12 w-64 h-64 opacity-20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m7.828-2.828a4 4 0 11-5.656-5.656 4 4 0 015.656 5.656z" />
      </svg>
    </div>
  );
};

export default NotFoundPage;
