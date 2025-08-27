"use client";
import React from 'react';
import { useUserStore } from './zustand';
import { LoginSchema, LoginSchemaType } from './loginzod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FaEye } from "react-icons/fa";

export const Login = () => {
    const router = useRouter();
    const [someError, setSomeError] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_BACKEND_URL;
    const { register, handleSubmit, formState: { errors } } = useForm<LoginSchemaType>({

        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const setToken = useUserStore((state) => state.setToken);


    const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {

        if (!data.email || !data.password) return;


        try {
            const response = await axios.post(`${endpoint}/auth/login`, data);
            console.log(data);
            console.log(response.data);
            setSomeError(false);
            setToken(response.data.token);
            if (response.data.status == true) {
                router.push("/");

            }
            else {
                setSomeError(true);
            }

            return response.data;
        } catch (error) {
            console.error(error);
            setSomeError(true);

        }

    };
    return (
        <div className='flex flex-col h-full w-full mt-6 mb-20'>

            <h1 className='text-3xl font-extrabold mb-6'>Welcome Back</h1>
            <p>Don't have an account? <a href="/register" className='text-blue-600'>Register</a></p>


            <section className='mt-8'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col space-y-2.5'>
                        <input
                            type="email"
                            placeholder='Enter your email'
                            {...register('email')}
                            className='border border-gray-600 p-2 py-3 w-full'
                        />
                        <div className='relative'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Enter your password'
                                {...register('password')}
                                className='border border-gray-600 p-2 py-3 w-full'
                            />
                            <FaEye className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600' size={20} onClick={() => setShowPassword(!showPassword)} />

                        </div>
                        {someError && <p className='text-red-600 text-sm mt-4 mb-3'>
                            Something Went Wrong in Registration
                        </p>}

                        <button className='bg-teal-900 text-white p-2 w-full mt-4' type='submit'>
                            Log In
                        </button>
                    </div>
                </form>

            </section>
        </div>
    );
};
