import React, { useEffect, useState } from 'react';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale } from "chart.js";
import axios from 'axios';

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement
)

function OrderChart() {

    // declare states
    const [userOrderFrequency, setUserOrderFrequency] = useState([]);

    // array from 1 to 10 i.e [1,2,3,...10]
    const userId = Array.from({ length: 10 }, (_, i) => i + 1)

    // get the how many orders made by users (frequency) and set to the state
    const getUserOrderFrequency = async () => {

        await axios.get("https://assessment.api.vweb.app/orders").then((res) => {

            const orders = res.data;

            const userFrequency = []

            // filtering the orders having 
            // particular user_id and get the length
            // of the array formed to 
            // get the frequency
            userId.forEach((id) => {
                userFrequency.push(orders.filter((order) => order.user_id === id).length)
            })

            setUserOrderFrequency(userFrequency)
        })
    }

    useEffect(() => {
        getUserOrderFrequency()
    }, [])


    // define datasets for the chart
    const data = {
        labels: userId,
        datasets: [{
            data: userOrderFrequency,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
        }]
    }

    // define properties for the chart 
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            y: {
                title: {
                    display: true,
                    align: "center",
                    text: "No. of orders",
                    padding: 8
                },
                beginAtZero: true,
                max: 70,
            },
            x: {
                title: {
                    display: true,
                    align: "center",
                    text: "User ID",
                    padding: 8
                }
            }
        },
        backgroundColor: "#fff",
    }

    return (
        <div className="h-96 w-full bg-white p-5 shadow-xl rounded-sm">
            {
                userOrderFrequency.length !== 0 && (
                    <Line
                        data={data}
                        options={options}
                    />
                )
            }
        </div>
    )
}

export default OrderChart