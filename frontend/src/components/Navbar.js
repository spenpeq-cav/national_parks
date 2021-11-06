import React, {useState, useEffect, Fragment} from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useHistory } from 'react-router'

function Navbar() {
    const history = useHistory()

    const [mobileMenuHidden, setMobileMenuHidden] = useState(true)

    const [userData, setUserData] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [userAuth, setUserAuth] = useState(false)

    const toggleMobileMenu = () => {
        setMobileMenuHidden(!mobileMenuHidden)
    }

    const checkUserAuth = async() => {
        await axios.get("/userauth", {withCredentials: true})
            .then((res) => (setUserAuth(res.data.auth)))
        setLoaded(true)
    }
    
    const getUserData = async() => {
        const res = await axios.get("/user", {withCredentials: true})
        const data = res.data
        setUserData(data)
    }

    const handleLogOut = () => {
        axios.get("/logout", {withCredentials: true})
        history.go(0)
    }

    useEffect(() => {
        checkUserAuth()
        if(loaded){
            if(userAuth){
                getUserData()
            }
        }
    }, [loaded, userAuth])

    return (
        <div className="bg-black p-4 items-center">
            <nav className="">
                <Link className="pl-4 text-green-600 uppercase font-bold tracking-wide text-xl" to="/"><i className="fas fa-mountain pr-1"></i> National Parks</Link>
                <div className="float-right pr-1 divide-x divide-green-400 divide-opacity-75 hidden lg:block">
                    { userAuth ? 
                        <Fragment>
                            <a className="text-gray-200 px-4">Welcome, {userData.first}</a>
                            <Link className="px-4 text-red-400 font-semibold uppercase hover:text-gray-200 tracking-wider text-lg" onClick={handleLogOut}>Log Out</Link>
                            <Link className="px-4 text-blue-400 font-semibold uppercase hover:text-gray-200 tracking-wider text-lg" to="/profile">My Profile</Link> 
                        </Fragment> : 
                            <Link className="px-4 text-yellow-300 font-semibold uppercase hover:text-gray-200 tracking-wider text-lg" to="/login">Log In</Link> 
                        }
                    
                    <Link className="px-4 text-gray-400 uppercase hover:text-gray-200 tracking-wider text-sm" to="/">Home</Link>
                    <Link className="px-4 text-gray-400 uppercase hover:text-gray-200 tracking-wider text-sm" to="/explore">Explore</Link>
                    <Link className="px-4 text-gray-400 uppercase hover:text-gray-200 tracking-wider text-sm" to="/about">About</Link>
                </div>
                <div className="lg:hidden float-right text-2xl">
                    <button className="items-center" onClick={toggleMobileMenu}><i class="fas fa-bars text-gray-300 h-8 w-8"></i></button>
                </div>
                <div className={mobileMenuHidden ? "hidden" : "lg:hidden"}>
                    { userAuth ? 
                        <Fragment>
                            <a className="text-gray-200 px-4 py-2 block">Welcome, {userData.first}</a>
                            <Link className="px-4 text-red-400 font-semibold uppercase hover:text-gray-200 tracking-wider text-lg block" onClick={() => {handleLogOut(); toggleMobileMenu()}}>Log Out</Link>
                            <Link className="px-4 text-blue-400 font-semibold uppercase hover:text-gray-200 tracking-wider text-lg block" to="/profile" onClick={toggleMobileMenu}>My Profile</Link> 
                        </Fragment> : 
                            <Link className="px-4 py-2 text-yellow-300 font-semibold uppercase hover:text-gray-200 tracking-wider text-lg block" to="/login" onClick={toggleMobileMenu}>Log In</Link>
                            }
                    <Link className="px-4 py-2 text-gray-400 uppercase hover:text-gray-200 tracking-wider text-sm block" to="/" onClick={toggleMobileMenu}>Home</Link>
                    <Link className="px-4 py-2 text-gray-400 uppercase hover:text-gray-200 tracking-wider text-sm block" to="/explore" onClick={toggleMobileMenu}>Explore</Link>
                    <Link className="px-4 py-2 text-gray-400 uppercase hover:text-gray-200 tracking-wider text-sm block" to="/about" onClick={toggleMobileMenu}>About</Link>
                </div>
            </nav>
        </div>
    )
}

export default Navbar