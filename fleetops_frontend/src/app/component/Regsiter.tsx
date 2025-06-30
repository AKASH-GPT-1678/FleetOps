"use client";
import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { useForm, SubmitHandler } from 'react-hook-form';
import { RegisterSchema, RegisterSchemaType } from './registerzod';
import { zodResolver } from '@hookform/resolvers/zod';

export const Regsiter = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({

        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    });


    const onSubmit: SubmitHandler<RegisterSchemaType> = (data) => {
        console.log(data);

    }
    return (
        <div className='flex flex-col h-full w-full mt-6'>
            <h1 className='text-3xl font-extrabold mb-6'>Create an Account</h1>
            <p>Already have an account ? <a href="/login"> Log In</a></p>



            <section className='mt-8'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col space-y-2.5'>

                        <div className='w-full flex flex-row gap-2'>
                            <div className='w-1/2'>
                                <input
                                    type="text"
                                    placeholder='Enter your name'
                                    {...register('firstName', { required: 'First name is required' })}
                                    className='border border-gray-600 p-2 w-full'
                                />
                                {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName.message}</p>}
                            </div>

                            <div className='w-1/2'>
                                <input
                                    type="text"
                                    placeholder='Enter your last name'
                                    {...register('lastName', { required: 'Last name is required' })}
                                    className='border border-gray-600 p-2 w-full'
                                />
                                {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName.message}</p>}
                            </div>
                        </div>

                        <div>
                            <input
                                type="email"
                                placeholder='Enter your email'
                                {...register("email", { required: "Email is required" })}
                                className='border border-gray-600 p-2 w-full mt-2'
                            />
                            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        <div>
                            <input
                                type="password"
                                placeholder='Enter your password'
                                {...register("password", { required: "Password is required" })}
                                className='border border-gray-600 p-2 w-full mt-2'
                            />
                            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
                        </div>

                        <div>
                            <input
                                type="password"
                                placeholder='Confirm password'
                                {...register("confirmPassword", { required: "Please confirm your password" })}
                                className='border border-gray-600 p-2 w-full mt-2'
                            />
                            {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword.message}</p>}
                        </div>

                        <label htmlFor="role">Want to join as</label>
                        <select className='border border-gray-600 p-3 w-full mt-2 cursor-pointer' {...register("role", { required: "Please select a role" })}>
                            <option value="">Select Role</option>
                            <option value="DRIVER" className='p-5 cursor-pointer'>Driver</option>
                            <option value="MANAGER" className='p-5 cursor-pointer'>Manager</option>
                        </select>
                        {errors.role && <p className="text-red-600 text-sm mt-1">{errors.role.message}</p>}

                        <button className='bg-teal-900 text-white p-2 w-full mt-4'>
                            Register
                        </button>
                    </div>
                </form>

                <div className='mt-6'>
                    <button className='p-3 border-2 px-10 cursor-pointer flex flex-row gap-2 items-center font-bold text-lg'>
                        <FcGoogle className='text-3xl' />Google
                    </button>
                </div>
            </section>

        </div>
    )
}
