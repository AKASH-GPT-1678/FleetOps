"use client";
import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { RegisterSchema, RegisterSchemaType } from './registerzod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

export const Regsiter = () => {
    const [someError, setSomeError] = React.useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({

        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: 'ROLE_MANAGER'
        }
    });


    const onSubmit: SubmitHandler<RegisterSchemaType> = async (data) => {
        console.log(data);
        const newUser = {
            username: data.firstName + " " + data.lastName,
            email: data.email,
            password: data.password,
            roles: data.role
        };

        const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_BACKEND_URL;
        try {
            const data = await axios.post(`${endpoint}/auth/adduser`, newUser);
            console.log(data);
            setSomeError(false);
            if(data.status == 200){
                window.location.href = '/login';
            }
            return data.data;

        } catch (error) {
            console.error(error);
            setSomeError(true);

        }




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
                            <option value="ROLE_DRIVER" className='p-5 cursor-pointer'>Driver</option>
                            <option value="ROLE_MANAGER" className='p-5 cursor-pointer'>Manager</option>
                        </select>
                        {errors.role && <p className="text-red-600 text-sm mt-1">{errors.role.message}</p>}


                        {someError && <p className='text-red-600 text-sm mt-4'>
                            Something Went Wrong in Registration
                        </p>}

                        <button className='bg-teal-900 text-white p-2 w-full mt-4'>
                            Register
                        </button>
                    </div>
                </form>

                <div className='mt-6'>

                </div>
            </section>

        </div>
    )
};


