import React, { useEffect, useState } from 'react';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";
import axios from 'axios';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement
)

function ProductChart() {

    // declare states
    const [productPriceRange, setProductPriceRange] = useState([]);

    // to set the state with array of
    // price-range i.e. <=50
    const getProductPriceData = async () => {

        await axios.get("https://assessment.api.vweb.app/products").then((res) => {

            const products = res.data;

            // declare variable to store count of price-range
            let lessThan50 = 0;
            let greaterThan50OrlessThan100 = 0;
            let greaterThan100OrlessThan150 = 0;
            let greaterThan150OrlessThan200 = 0;

            // iterate each product and
            // check price-range conditions
            products.forEach((product) => {
                if (product?.selling_price < 50) {
                    lessThan50++;
                } else if (product?.selling_price < 100 && product?.selling_price >= 50) {
                    greaterThan50OrlessThan100++;
                } else if (product?.selling_price < 150 && product?.selling_price >= 100) {
                    greaterThan100OrlessThan150++;
                } else if (product?.selling_price < 200 && product?.selling_price >= 150) {
                    greaterThan150OrlessThan200++;
                }
            })

            setProductPriceRange([lessThan50, greaterThan50OrlessThan100, greaterThan100OrlessThan150, greaterThan150OrlessThan200])
        })
    }

    useEffect(() => {
        getProductPriceData()
    }, [])


    // define data for bar chart
    const data = {
        labels: ["<=50", "50-100", "100-150", "150-200"],
        datasets: [{
            data: productPriceRange,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }

    // define properties of bar chart
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            y: {
                title: {
                    display: true,
                    align: "center",
                    text: "No. of products",
                    padding: 6
                },
                beginAtZero: true,
                min: 0,
                max: 16,
            },
            x: {
                title: {
                    display: true,
                    align: "center",
                    text: "Price Range (in ₹)",
                    padding: 6
                }
            }
        },
        backgroundColor: "#fff",
    }

    return (
        <div className="h-96 w-full bg-white p-5 shadow-xl rounded-sm">
            {
                productPriceRange.length !== 0 && (
                    <Bar
                        data={data}
                        options={options}
                    />
                )
            }
        </div>
    )
}

export default ProductChart