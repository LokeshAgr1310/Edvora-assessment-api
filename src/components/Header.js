import React from 'react'
import { Link } from "react-router-dom"

function Header() {
    return (
        <nav className='border-b border-b-gray-600'>
            <div className="py-3 flex justify-between items-center mx-14">

                {/* Left Side - Logo */}
                <Link to="/">
                    <div className="flex items-center space-x-3 cursor-pointer">
                        <img src="/logo512.png" alt="" className='w-12 h-12' />
                        <h1 className='text-2xl'>TEST API</h1>
                    </div>
                </Link>

                {/* Right Side - NavItems */}
                <div>
                    <ul className="flex space-x-10 items-center">
                        <li>
                            <Link to="/" className="relative nav--link">
                                <i className="fa-solid fa-house"></i>
                                <span>Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/products" className="relative nav--link">
                                <i className="fa-solid fa-rocket"></i>
                                <span>Products</span>
                            </Link>
                        </li>
                        <li>
                            <Link className="relative nav--link" to="/orders">
                                <i className="fa-solid fa-briefcase"></i>
                                <span>Orders</span>
                            </Link>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    )
}

export default Header