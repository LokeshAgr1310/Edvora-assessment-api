import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from './Spinner';
import ProductChart from './ProductChart';

function Products() {

    const toastPropertyProps = {
        position: "bottom-center",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }

    const [id, setId] = useState("")
    const [productDetails, setProductDetails] = useState({})
    const [checkLoading, setCheckLoading] = useState(false)
    const [randomLoading, setRandomLoading] = useState(false)

    const getDetailsFormHandler = async (e) => {
        e.preventDefault()

        if (id.length === 0) {
            toast.info("Please enter the product id!", toastPropertyProps)
        }
        else {
            setCheckLoading(true)
            await axios.get("https://assessment.api.vweb.app/products").then((res) => {
                const data = res.data
                if (parseInt(id) <= data.length) {
                    setProductDetails(data[parseInt(id) - 1])
                } else {
                    toast.error("No details found!", toastPropertyProps)
                }

                setCheckLoading(false)
            }).catch(err => {
                toast.error(err, toastPropertyProps)
            })
        }
    }

    const randomProductsDetails = async () => {
        setRandomLoading(true)
        await axios.get("https://assessment.api.vweb.app/products").then((res) => {
            const data = res.data

            const randomNum = Math.floor(Math.random() * data?.length)

            setProductDetails(data[randomNum])
            setRandomLoading(false)

        }).catch(err => {
            toast.error(err, toastPropertyProps)
        })
    }

    return (
        <div className="mx-auto max-w-6xl"
            style={{
                height: "calc(100vh - 75px)"
            }}
        >
            <div className="grid grid-cols-5 h-full items-center">
                <div className="mt-4 p-5 col-span-2 flex flex-col">
                    <h1 className="text-2xl tracking-widest mb-4 leading-relaxed">
                        GET DETAILS OF PRODUCTS <br /> WITH TEST API
                    </h1>
                    <form onSubmit={getDetailsFormHandler}>
                        <div className="flex flex-col items-center">
                            <div className="relative w-full">
                                <input
                                    type="number" id="_id"
                                    className="input--id peer"
                                    placeholder=" "
                                    value={id}
                                    min="1"
                                    onChange={(e) => setId(e.target.value)}
                                />
                                <label
                                    htmlFor="_id"
                                    className="label--id">
                                    Enter Product Id
                                </label>
                            </div>
                            <div className='flex justify-center items-center space-x-4 mt-7'>
                                <button
                                    type='submit'
                                    className="btn">
                                    {
                                        checkLoading ?
                                            <Spinner />
                                            :
                                            <i className="fa-solid fa-database mr-2"></i>
                                    }
                                    CHECK
                                </button>
                                <span>OR</span>
                                <button
                                    type='button'
                                    className="btn"
                                    onClick={() => randomProductsDetails()}
                                >
                                    {
                                        randomLoading ?
                                            <Spinner />
                                            :
                                            <i className="fa-solid fa-database mr-2"></i>
                                    }
                                    RANDOM
                                </button>
                            </div>
                        </div>
                    </form>
                    {
                        Object.keys(productDetails).length !== 0
                        && (

                            <div className="product--card w-auto flex flex-col py-4 pl-3 pr-5 shadow-lg rounded-b-lg mt-8 bg-gradient-to-r from-blue-700">
                                <div className='flex justify-between border-b border-slate-200/5 pb-2'>
                                    <h1 className="text-lg font-semibold tracking-wider">PRODUCT DETAILS</h1>
                                    <span className="cursor-pointer"
                                        onClick={() => {
                                            setProductDetails({})
                                            setId("")
                                        }}
                                    >
                                        <i className="fa-solid fa-xmark"></i>
                                    </span>
                                </div>
                                <div className='flex flex-col text-sm space-y-1.5 px-8 mt-3'>
                                    <div className='flex justify-between'>
                                        <span>ID</span>
                                        <span>{productDetails?.product_id}</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span>NAME</span>
                                        <span>{productDetails?.name}</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span>PRICE</span>
                                        <span>
                                            ₹ {productDetails?.selling_price}
                                        </span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span>STOCK</span>
                                        <span>
                                            {productDetails?.stock}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>

                <div className='col-span-3 ml-8 my-auto'>
                    <h2 className="text-2xl mb-5 tracking-widest">PRODUCTS PRICE DISTRIBUTUION</h2>
                    <ProductChart />
                </div>
            </div>
            <ToastContainer />
        </div >
    )
}

export default Products