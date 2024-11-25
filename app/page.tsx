import Image from 'next/image';
import Link from 'next/link';
import { playwrite } from '@/app/ui/global/fonts';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* Hero Section */}
      <div className="w-full bg-[url('/images/main_header_pic.jpg')] bg-cover bg-center">
        <div className="w-full flex flex-col items-center justify-center px-6 py-16 text-center bg-slate-900/50 text-slate-50">
          <h1 className="text-2xl lg:text-4xl font-bold mb-4">
            <span className={playwrite.className}>RecipeShare</span>
          </h1>
          <p className="text-lg mb-8">
            Discover and share amazing recipes with our community.
          </p>
          <p className="flex flex-row lg:flex-col gap-2 justify-center items-center">
            <Link href="/recipes" className="inline-block bg-mallard-500 text-white-50 px-6 py-3 rounded-md text-lg font-bold hover:text-mallard-600 hover:bg-white-50 transition transition-300">
                Explore Recipes
            </Link>
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center w-full h-auto lg:h-96 my-8 lg:my-16 p-4 gap-4 lg:gap-6">
        {/* Image 1 */}
        <div className='hidden lg:block flex-0 basis-1/2 lg:basis-1/4 h-full lg:h-full'>
          <Image 
            alt="Sandwich" 
            width={640} 
            height={960} 
            src={`/images/sandwich.jpg`} 
            className="object-cover w-full h-full"
          />
        </div>

        {/* Image 2 */}
        <div className='hidden lg:block flex-0 basis-1/2 lg:basis-1/4 h-48 lg:h-full'>
          <Image 
            alt="Squash Salad" 
            width={360} 
            height={514} 
            src={`/images/squash_salad.jpg`} 
            className="object-cover w-full h-full"
          />
        </div>

        {/* Image 3 */}
        <div className="lg:hidden flex-1 w-full h-44">
          <Image
            alt="Taking picture of food"
            width={1920}
            height={1280}
            src={`/images/steve_daniel_picture.jpg`}
            className="object-cover w-full h-full"
          />
        </div>
        
        {/* Content Section */}
        <div className="flex-1 flex flex-col relative text-center text-slate-700 w-full lg:w-auto h-auto p-4 lg:p-6 bg-gray-200">
          {/* Title */}
          <div className="flex-0 mb-4 lg:mb-6">
            <h3 className="text-lg lg:text-xl font-semibold">
              <span className={playwrite.className}>Taste</span> with an account
            </h3>
          </div>
          {/* Description */}
          <div className="flex-1">
            <p className="mb-4 text-sm lg:text-base">
              Sign in to your account to save and share your favorite recipes.
              Dive into a world of deliciousness—share your favorite recipes and discover hidden gems from fellow foodies!
            </p>
          </div>
          {/* Sign In Button */}
          <div className="mt-4 lg:mt-auto">
            <Link href="/login" className="font-bold inline-block bg-mallard-700 text-white-50 px-6 py-3 rounded-md text-lg hover:bg-white-50 hover:text-mallard-700 transition transition-300">
                Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Section */}
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

      {/* Features Section */}
      {/* <div className="container mx-auto px-6 pb-16">
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
      </div> */}
    </div>
  );
}