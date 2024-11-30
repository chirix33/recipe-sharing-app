"use client";

import clsx from 'clsx';
import Link from 'next/link';
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid';
import { deleteRecipe } from '@/app/lib/actions';
import { useState } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'flex h-10 items-center rounded-lg px-4 text-sm font-medium text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 aria-disabled:cursor-not-allowed aria-disabled:opacity-100',
        className,
      )}
    >
      {children}
    </button>
  );
}

export function UpdateRecipe({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/edit/${id}`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}


export function DeleteRecipe({ id }: { id: string }) {
  const deleteInvoiceAction = deleteRecipe.bind(null, id); 
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDelete = () => {
    deleteInvoiceAction();
    setIsDialogOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsDialogOpen(true)}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>

      { isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50" onClick={() => setIsDialogOpen(false)} />
          <div className="bg-white-50 rounded-lg p-6 z-10">
            <h2 className="text-lg font-semibold">Confirm Deletion</h2>
            <p>Are you sure you want to delete this recipe?</p>
            <div className="mt-4 flex justify-end">
              <button
                className="mr-2 rounded-md border p-2 hover:bg-gray-200"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                className="rounded-md border p-2 bg-red-600 text-white-50 hover:bg-red-700"
                onClick={handleDelete}
              >
                Confirm
              </button>
            </div>
        </div>
      </div>
      )}
    </>
  );
}