import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function LoginScreen() {

    const history = useHistory()
    const [userAuth, setUserAuth] = useState(false)
    

    // const checkUserAuth = async() => {
    //     await axios.get("/userauth", {withCredentials: true})
    //         .then((res) => (setUserAuth(res.data.auth)))
    // }
    const INITIAL_FORM_STATE = {
        username: "",
        password: "",
    };
    const { user, setUser } = useContext(UserContext);
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);

    function handleInputChange(e) {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      }
    
    function handleSubmitForm(e) {
        e.preventDefault();

        if (formData.username !== "" && formData.password !== "") {
                axios.post("/login", formData, {withCredentials: true})
                    .then((res) => {
                        setUser(res.data.user)
                        history.push("/profile")
                    })
            ;
            alert("Form submited");
        } else {
            alert("Fill out all fields");
        }
    }
    
    // useEffect(() => {
    //     checkUserAuth()
    //     if(userAuth){
    //         history.goBack()
    //     }
    // }, [userAuth])

    return (
        <div className="bg-gray-900 h-screen">
            <div className="min-h-full flex items-center justify-center pb-36 px-6 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <i className="fas fa-mountain mx-auto h-auto w-auto text-green-600 text-6xl"></i>
                        <h2 className="mt-6 text-center text-4xl font-extrabold text-yellow-300">Sign in to your account</h2>
                        <p className="mt-2 text-center text-md text-gray-600">
                            <a href="/register" className="font-medium text-green-600 hover:text-green-500">
                                Don't have an account? Register here
                            </a>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" action="/login" method="POST" onSubmit={handleSubmitForm}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="pb-2">
                                <label htmlFor="email-address" className="sr-only">
                                Email address
                                </label>
                                <input id="email-address" name="username" type="email" autoComplete="email" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 text-lg" placeholder="Email address"
                                onChange={handleInputChange}
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
                                onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-md text-green-900">
                                Remember me
                                </label>
                            </div>

                            <div className="text-md">
                                <a href="#" className="font-medium text-green-600 hover:text-green-500">
                                Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                
                                </span>
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen
