import clsx from 'clsx';
import Link from 'next/link';
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid';
import { deleteRecipe } from '@/app/lib/actions';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

// focus-visible:outline-blue-500 active:bg-blue-600
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
      href={`/dashboard/recipes/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteRecipe({ id }: { id: string }) {
  const deleteInvoiceAction = deleteRecipe.bind(null, id); 
  return (
    <form action={deleteInvoiceAction}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}