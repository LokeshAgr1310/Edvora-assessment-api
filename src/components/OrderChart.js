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

    const [userOrderFrequency, setUserOrderFrequency] = useState([]);

    const userId = Array.from({ length: 10 }, (_, i) => i + 1)

    const getUserOrderFrequency = async () => {

        await axios.get("https://assessment.api.vweb.app/orders").then((res) => {

            const orders = res.data;

            const userFrequency = []

            userId.forEach((id) => {
                userFrequency.push(orders.filter((order) => order.user_id === id).length)
            })

            setUserOrderFrequency(userFrequency)
        })
    }

    useEffect(() => {
        getUserOrderFrequency()
    }, [])


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

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        onHover: (e) => {
            console.log("event", e)
        },
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