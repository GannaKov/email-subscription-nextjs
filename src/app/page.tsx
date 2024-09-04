'use client';
import React, { useState } from 'react';
import { z } from 'zod';
import { toast } from 'sonner';
import { createUser } from '@/lib/actions';
import Modal from '@/components/modal';

const formSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
});
const initialState = {
  errors: {},
};

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <main className="flex min-h-screen flex-col p-6">
      <h1>Home Page</h1>
      <button
        onClick={() => setIsOpen(true)}
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
      >
        Open Modal
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div>
          <h2 className="text-lg font-bold">Modal Title</h2>
          <p>This is a modal</p>
          <button
            onClick={() => setIsOpen(false)}
            className="mt-4 rounded bg-red-500 px-4 py-2 text-white"
          >
            Close
          </button>
        </div>
      </Modal>
      <form action={createUser} className="space-y-3">
        <div className="w-full">
          <div className="mb-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="fullName"
              type="fullName"
              name="fullName"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email address"
              required
            />
          </div>
        </div>
        <button className="mt-4 w-[150px] bg-gray-800 py-2 text-white">
          Submit
        </button>
        {/* <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div> */}
      </form>
    </main>
  );
}
