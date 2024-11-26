import Image from 'next/image';
import Link from 'next/link';
import { playwrite } from '@/app/ui/global/fonts';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* Hero */}
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

      {/* About */}
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
        <div className="flex-1 flex flex-col relative text-center text-slate-700 w-full lg:w-auto h-full p-4 lg:p-6 bg-gray-200">
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

      {/* Parallax Image */}
      <div className="w-full bg-[url('/images/parallax_image.jpg')] bg-contain lg:bg-cover lg:bg-fixed bg-center h-48 lg:h-96">
        <div className="w-full h-full flex flex-col items-center justify-center px-6 py-16 text-center bg-slate-900/50 text-slate-50">
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-mallard-600 text-white-50 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Join RecipeShare Today</h2>
          <p className="text-lg mb-8">
            Sign up now and start sharing and discovering amazing recipes.
          </p>
          <Link href="/create" className="inline-block bg-white-200 text-black px-6 py-3 rounded-md text-lg font-medium hover:bg-gray-100">
              Sign Up
          </Link>
        </div>
      </footer>

    </div>
  );
}