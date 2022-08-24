import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from './Spinner';
import OrderChart from './OrderChart';

function Orders() {

    // define react-toastify property
    const toastPropertyProps = {
        position: "bottom-center",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }

    // declare states...
    const [id, setId] = useState("")
    const [orderDetails, setOrderDetails] = useState({})
    const [checkLoading, setCheckLoading] = useState(false)
    const [randomLoading, setRandomLoading] = useState(false)

    // form handler for
    // getting orders details
    const getDetailsFormHandler = async (e) => {
        e.preventDefault()

        if (id.length === 0) {
            toast.info("Please enter the order id!", toastPropertyProps)
        }
        else {
            setCheckLoading(true)
            await axios.get("https://assessment.api.vweb.app/orders").then(async (res) => {

                const orders = res.data

                // validate the id within the
                // orders array length
                if (parseInt(id) <= orders.length) {

                    const orderData = orders[parseInt(id) - 1]

                    const { data: productData } = await axios.get("https://assessment.api.vweb.app/products")
                    const { data: userData } = await axios.get("https://assessment.api.vweb.app/users")

                    const orderedProductDetails = productData[orderData.product_id - 1]

                    const userDetails = userData[orderData.user_id - 1]

                    // set the orders details
                    // along with user and product
                    setOrderDetails({
                        ...orderData,
                        "product_name": orderedProductDetails?.name,
                        "product_price": orderedProductDetails?.selling_price,
                        "user_name": userDetails?.name
                    })

                } else {
                    setId("")
                    toast.error("No details found!", toastPropertyProps)
                }

                setCheckLoading(false)
            }).catch((err) => {
                setId("")
                toast.error(err, toastPropertyProps)
            })
        }
    }

    // get random orders
    const randomProductsDetails = async () => {

        setRandomLoading(true)
        await axios.get("https://assessment.api.vweb.app/orders").then(async (res) => {

            // generate random numbers b/w 
            // 0 and response length
            const randomNum = Math.floor(Math.random() * res?.data?.length)
            const orderData = res.data[randomNum]

            const { data: productData } = await axios.get("https://assessment.api.vweb.app/products")
            const { data: userData } = await axios.get("https://assessment.api.vweb.app/users")

            const orderedProductDetails = productData[orderData.product_id - 1]

            const userDetails = userData[orderData.user_id - 1]


            setOrderDetails({
                ...orderData,
                "product_name": orderedProductDetails?.name,
                "product_price": orderedProductDetails?.selling_price,
                "user_name": userDetails?.name
            })
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

                {/* Left side - form & order details */}
                <div className="mt-5 p-5 col-span-2 flex flex-col">
                    <h1 className="text-2xl tracking-widest mb-4 leading-relaxed">
                        GET DETAILS OF ORDERS <br /> WITH TEST API
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
                                    Enter Order Id
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
                        Object.keys(orderDetails).length !== 0
                        && (

                            <div className="product--card w-auto flex flex-col py-4 pl-3 pr-5 shadow-lg rounded-b-lg mt-8 bg-gradient-to-r from-blue-700">
                                <div className='flex justify-between border-b border-slate-200/5 pb-2'>
                                    <h1 className="text-lg font-semibold tracking-wider">ORDER DETAILS</h1>
                                    <span className="cursor-pointer"
                                        onClick={() => {
                                            setOrderDetails({})
                                            setId("")
                                        }}
                                    >
                                        <i className="fa-solid fa-xmark"></i>
                                    </span>
                                </div>
                                <div className='flex flex-col text-sm space-y-1.5 px-8 mt-3'>
                                    <div className='flex justify-between'>
                                        <span>ID</span>
                                        <span>{orderDetails?.order_id}</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span>ORDER BY</span>
                                        <span>{orderDetails?.user_name}</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span>PRODUCT</span>
                                        <div className='flex flex-col'>
                                            <span>{orderDetails?.product_name}</span>
                                            <span>Qty: {orderDetails?.quantity}</span>
                                            <span>Price: ₹{orderDetails?.product_price}</span>
                                        </div>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span>ORDER DATE</span>
                                        <span>{new Date(parseInt(orderDetails?.order_date)).toDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>

                {/* Right side - Show orders graph */}
                <div className='col-span-3 ml-8 my-auto'>
                    <h2 className="text-2xl mb-5 tracking-widest">ORDERS ANALYTICS</h2>
                    <OrderChart />
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Orders