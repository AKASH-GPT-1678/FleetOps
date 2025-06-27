import React from 'react'
import { FcGoogle } from "react-icons/fc"
export const Regsiter = () => {
    return (
        <div className='flex flex-col h-full w-full mt-6'>
            <h1 className='text-3xl font-extrabold mb-6'>Create an Account</h1>
            <p>Already have an account ? <a href="/testing"> Log In</a></p>



            <section className='mt-8'>
                <form>
                    <div className='flex flex-col space-y-2.5'>


                        <div className='w-full flex flex-row gap-2'>
                            <input
                                type="text"
                                placeholder='Enter your name'
                                className='border border-gray-600 p-2 w-1/2'
                            />
                            <input
                                type="text"
                                placeholder='Enter your last name'
                                className='border border-gray-600 p-2 w-1/2'
                            />
                        </div>

                        <input
                            type="email"
                            placeholder='Enter your email'
                            className='border border-gray-600 p-2 w-full mt-2'
                        />
                        <input
                            type="password"
                            placeholder='Enter your password'
                            className='border border-gray-600 p-2 w-full mt-2'
                        />
                        <input
                            type="password"
                            placeholder='Confirm password'
                            className='border border-gray-600 p-2 w-full mt-2'
                        />
                        <label htmlFor="role">Want to join as</label>
                        <select className='border border-gray-600 p-3 w-full mt-2 cursor-pointer' name='role'>
                        <option value="Driver" className='p-5 cursor-pointer'>Driver</option>
                        <option value="Manager" className='p-5 cursor-pointer'>Manager</option>
                        </select>

                        <button className='bg-teal-900 text-white p-2 w-full mt-4'>
                            Register
                        </button>

                    </div>

                </form>

                <div className='mt-6'>

              

              <button className='p-3 border-2 px-10 cursor-pointer flex flex-row gap-2 items-center font-bold text-lg
              '>
                
                
                <FcGoogle className='text-3xl' />Google</button>
                  </div>
            </section>
        </div>
    )
}
