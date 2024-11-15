import Image from 'next/image';
import Link from 'next/link';
import { playwrite } from '@/app/ui/global/fonts';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {/* Hero Section */}
      <div className="w-full bg-white ">
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-2xl lg:text-4xl font-bold text-gray-800 mb-4">
            <span className={playwrite.className}>RecipeShare</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Discover and share amazing recipes with our community.
          </p>
          <p className="flex flex-row lg:flex-col gap-2 justify-center items-center">
            <Link href="/login" className="inline-block bg-mallard-500 text-white-50 px-6 py-3 rounded-md text-lg font-medium hover:bg-white-50 hover:text-mallard-500 border hover:border-mallard-500">
                Sign In
            </Link>
            <Link href="/recipes" className="inline-block text-mallard-500 border border-white-200 bg-white-50 px-6 py-3 rounded-md text-lg font-medium hover:bg-mallard-100 hover:text-white-500">
                Explore Recipes
            </Link>
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="flex flex-column items-center justify-center">
                    <Image src="/images/feature1.webp" alt="Feature 1" width={300} height={200} className="mb-4 rounded-md" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Share Your Recipes</h2>
                <p className="text-gray-600">
                    Easily share your favorite recipes with our community and get feedback.
                </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
               <div className='flex flex-column items-center justify-center'>
                   <Image src="/images/feature2.webp" alt="Feature 2" width={300} height={200} className="mb-4 rounded-md" />
                </div> 
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Discover New Recipes</h2>
                <p className="text-gray-600">
                    Explore a wide variety of recipes from different cuisines and cultures.
                </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="w-full bg-mallard-600 text-white-50 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Join RecipeShare Today</h2>
          <p className="text-lg mb-8">
            Sign up now and start sharing and discovering amazing recipes.
          </p>
          <Link href="/create" className="inline-block bg-white-200 text-black px-6 py-3 rounded-md text-lg font-medium hover:bg-gray-100">
              Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}