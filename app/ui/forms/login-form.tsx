"use client";

import { ArrowRightIcon, AtSymbolIcon, KeyIcon, ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/global/buttons';
import { GoogleSVG } from '../global/svgs';
import { useFormState } from 'react-dom';
import { authenticate } from '@/app/lib/actions';
import Link from 'next/link';
import { FormSkeleton } from '@/app/ui/skeletons/formSkeletons';

export default function LoginForm() {
  const [error, formAction, isPending] = useFormState(authenticate, undefined);
  
  if (isPending) {
    console.log("Pending...");
    return <FormSkeleton />;
  } 
  return (
    // Prevent mobile screen auto zoom on input focus
    <form action={formAction} className="space-y-3">
        <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8 overflow-hidden">
          <h2 className={`mb-4 text-1xl`}>
            Please log in. <br />
            <Link href="/create" className="text-mallard-600 underline">
              Don&apos;t have an account? Sign up
            </Link>
          </h2>
          <div className="w-full">
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 focus:outline-mallard-500"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                />
                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 focus:outline-mallard-500"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  minLength={6}
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
          <Button 
          type="submit" 
          name="type"
          value="credentials"
          className="group text-white-50 bg-mallard-600 hover:bg-transparent hover:text-mallard-600 hover:border hover:border-mallard-600 mt-4 w-full"
          aria-disabled={isPending}
          >
            Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50 group-hover:text-mallard-600" />
          </Button>
          <input type="hidden" name="authorizationType" value="login" />
          <Button 
          type="submit"
          name="type"
          value="google"
          className="group text-mallard-50 bg-white-600 hover:bg-transparent hover:text-white-600 hover:border hover:border-white-600 mt-4 w-full"
          aria-disabled={isPending}>
            Log in with Google <GoogleSVG classNames="ml-auto h-5 w-5 text-gray-50 group-hover:text-mallard-400" />
          </Button>
          <div className="flex h-8 items-end space-x-1" aria-live="polite">
          {
          error && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{error}</p>
            </>
          )
          }
        </div>
        </div>
    </form>
  );
}