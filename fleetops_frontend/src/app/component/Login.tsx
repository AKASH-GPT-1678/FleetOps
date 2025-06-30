"use client";
import React from 'react';
import { FcGoogle } from "react-icons/fc";
import { signIn } from 'next-auth/react';
import { LoginSchema, LoginSchemaType } from './loginzod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
export const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginSchemaType>({

        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
        console.log(data);
    }
    return (
        <div className='flex flex-col h-full w-full mt-6'>
            <h1 className='text-3xl font-extrabold mb-6'>Welcome Back</h1>
            <p>Don't have an account? <a href="/register">Register</a></p>

            <section className='mt-8'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col space-y-2.5'>
                        <input
                            type="email"
                            placeholder='Enter your email'
                            {...register('email')}
                            className='border border-gray-600 p-2 py-3 w-full'
                        />
                        <input
                            type="password"
                            placeholder='Enter your password'
                            {...register('password')}
                            className='border border-gray-600 p-2 py-3 w-full'
                        />

                        <button className='bg-teal-900 text-white p-2 w-full mt-4' type='submit'>
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
