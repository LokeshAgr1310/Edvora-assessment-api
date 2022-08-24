import React, { useEffect, useState } from 'react';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LinearScale, CategoryScale, LineElement, PointElement } from "chart.js";
import axios from 'axios';

ChartJS.register(
    LinearScale,
    CategoryScale,
    LineElement,
    PointElement,
);


function FeaturedProductChart() {

    // declaring states
    const [productsStock, setProductsStock] = useState([]);

    // to get the array of stocks of products
    const getProductsStock = async () => {

        await axios.get("https://assessment.api.vweb.app/products").then((res) => {
            const products = res.data;

            setProductsStock(products.map((product) => product.stock))
        })
    }

    useEffect(() => {
        getProductsStock()
    }, [])

    // declare datasets for chart
    const data = {
        labels: Array.from({ length: productsStock.length }, (_, i) => i + 1),
        datasets: [{
            data: productsStock,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
        }]
    }

    // properties for chart
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            y: {
                title: {
                    display: true,
                    align: "center",
                    text: "Product Stock Count",
                    padding: 8
                },
                beginAtZero: true,
                max: 120
            },
            x: {
                title: {
                    display: true,
                    align: "center",
                    text: "Product ID",
                    padding: 8
                },
                ticks: {
                    min: 0,
                    max: 50,
                    stepSize: 5,
                }
            }
        },
        backgroundColor: "#fff",
    }

    return (
        <div className="h-96 w-full bg-white p-5 shadow-xl rounded-sm">
            {
                productsStock.length !== 0 && (
                    <Line
                        data={data}
                        options={options}
                    />
                )
            }
        </div>
    )
}

export default FeaturedProductChart