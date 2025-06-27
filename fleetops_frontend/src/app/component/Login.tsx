"use client";
import React from 'react';
import { FcGoogle } from "react-icons/fc";
import { signIn } from 'next-auth/react';
export const Login = () => {
    return (
        <div className='flex flex-col h-full w-full mt-6'>
            <h1 className='text-3xl font-extrabold mb-6'>Welcome Back</h1>
            <p>Don't have an account? <a href="/register">Register</a></p>

            <section className='mt-8'>
                <form>
                    <div className='flex flex-col space-y-2.5'>
                        <input
                            type="email"
                            placeholder='Enter your email'
                            className='border border-gray-600 p-2 py-3 w-full'
                        />
                        <input
                            type="password"
                            placeholder='Enter your password'
                            className='border border-gray-600 p-2 py-3 w-full'
                        />

                        <button className='bg-teal-900 text-white p-2 w-full mt-4'>
                            Log In
                        </button>
                    </div>
                </form>

                <div className='mt-6'>
                    <button className='p-3 border-2 px-10 cursor-pointer flex flex-row gap-2 items-center font-bold text-lg'
                    onClick={() => signIn()}
                    
                    
                    
                    >
                        <FcGoogle className='text-3xl' />
                        Google
                    </button>
                </div>
            </section>
        </div>
    );
};
