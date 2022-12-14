import React from 'react'
import FeaturedProductChart from './FeaturedProductChart'


function Home() {

    return (
        <div className="flex pt-10 mx-auto max-w-6xl">
            <div className="w-full">
                <h2 className="text-2xl tracking-widest mb-5">OUR FEATURED PRODUCTS</h2>

                {/* Chart with full width */}
                <div className='w-full'>
                    <FeaturedProductChart />
                </div>
            </div>
        </div >
    )
}

export default Home