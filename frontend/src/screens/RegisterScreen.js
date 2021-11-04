import React, {useState, useEffect} from 'react';

function RegisterScreen() {
    return (
        <div className="bg-gray-900 h-screen">
            <div className="min-h-full flex items-center justify-center pb-36 px-6 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <i className="fas fa-mountain mx-auto h-auto w-auto text-green-600 text-6xl"></i>
                        <h2 className="mt-6 text-center text-4xl font-extrabold text-yellow-300">Register an account</h2>
                        <p className="mt-2 text-center text-md text-gray-600">
                            <a href="/login" className="font-medium text-green-600 hover:text-green-500">
                                Already have an account? Login here
                            </a>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" action="/register" method="POST">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="pb-2">
                                <label htmlFor="first-name" className="sr-only">
                                    First name
                                </label>
                                <input id="first-name" name="firstName" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 text-lg" placeholder="First name"
                                />
                            </div>
                            <div className="pb-10">
                                <label htmlFor="last-name" className="sr-only">
                                    Last Name
                                </label>
                                <input id="last-name" name="lastName" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 text-lg" placeholder="Last name"
                                />
                            </div>
                            <div className="pb-2">
                                <label htmlFor="email-address" className="sr-only">
                                Email address
                                </label>
                                <input id="email-address" name="username" type="email" autoComplete="email" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 text-lg" placeholder="Email address"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                Password
                                </label>
                                <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 text-lg"
                                placeholder="Password"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterScreen
