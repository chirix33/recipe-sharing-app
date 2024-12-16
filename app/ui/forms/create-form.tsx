"use client";

import { UserCircleIcon, ArrowRightIcon, AtSymbolIcon, KeyIcon, ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/global/buttons';
import { GoogleSVG } from '../global/svgs';
import { useActionState } from 'react';
import Link from 'next/link';
import { authenticate, validate, FormState } from '@/app/lib/actions';

export default function CreateForm() {
    const initialState: FormState = {errors: {}};
    const [updatedFormState, formAction, isPending] = useActionState(validate, initialState);

    const handleGoogleButtonClick = (e: React.MouseEvent) => {
      // Prevent the form from submitting 
      // and authenticate using Google
      e.preventDefault();
      const data = new FormData();
      data.append('type', 'google');
      authenticate(undefined, data);
    }
    return (
    <form action={formAction} className="space-y-3">
        <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
          <h2 className={`mb-4 text-1xl`}>
            Welcome! Create an account here. <br />
            <Link href="/login" className="text-white-600 underline">
              Click here to login to your account
            </Link>
          </h2>
          <div className="w-full">
          <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="name"
              >
                Name
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 focus:outline-mallard-500"
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                />
                <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
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
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="cpassword"
              >
                Re enter Password
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 focus:outline-mallard-500"
                  id="cPassword"
                  type="password"
                  name="cPassword"
                  placeholder="Re enter password"
                  minLength={6}
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
          <Button 
          type="submit" 
          className="group text-white-50 bg-mallard-600 hover:bg-transparent hover:text-mallard-600 hover:border hover:border-mallard-600 mt-4 w-full"
          
          >
            Sign up <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50 group-hover:text-mallard-600" />
          </Button>
          <input type="hidden" name="authorizationType" value="signup" />
          <Button 
          type="button"
          className="group text-mallard-50 bg-white-600 hover:bg-transparent hover:text-white-600 hover:border hover:border-white-600 mt-4 w-full"
          onClick={handleGoogleButtonClick}
          >
            Sign up with Google <GoogleSVG classNames="ml-auto h-5 w-5 text-gray-50 group-hover:text-mallard-400" />
          </Button>
          <div className="flex h-8 items-end space-x-1" aria-live="polite">
          {
          updatedFormState?.errors?.email && updatedFormState?.errors?.email.map((error, index) =>
            <p key={index} className='flex gap-2'>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <span className="text-sm text-red-500">{error}</span>
            </p>
          )
          }
          {
          updatedFormState?.errors?.password && updatedFormState?.errors?.password.map((error, index) =>
            <p key={index} className='flex gap-2'>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <span className="text-sm text-red-500">{error}</span>
            </p>
          )
          }
          {
          updatedFormState?.errors?.cPassword && updatedFormState?.errors?.cPassword.map((error, index) =>
            <p key={index} className='flex gap-2'>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <span className="text-sm text-red-500">{error}</span>
            </p>
          )
          }
        </div>
        </div>
    </form>
    );
}