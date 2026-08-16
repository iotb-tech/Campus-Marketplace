export default function Hero(){
    return (
        <div className="flex flex-col bg-white h-screen">
            <div className="flex flex-col sm:w-9/25 px-3">
                <div>
                <span className="border-1  border-solid border-blue-300 rounded-lg bg-blue-100 px-2 text-sm text-blue-600">Trusted by <b>10,000+</b> students</span>
               </div>
               <div className="flex flex-col mt-3">
                    <strong className="text-zinc-950 text-xl">The safest way to buy </strong>
                    <strong className="text-zinc-950 text-xl">and sell on campus</strong>
                </div>
                <p className="text-zinc-600 text-sm font-thin text-xs mb-5 mt-5">
                    Connect with verified students at your university. Buy textbooks, sell furnitures, and discover local deals safely and sustainably
                </p>
                <p className="flex flex-row mt-1">
                    <a className="border-1 border-blue--300 rounded-md px-4 py-1 bg-blue-500 text-sm font-bold">Browse Listings</a>
                    <a className="border-1 border-blue--300 rounded-md px-4 py-1  text-sm mx-3 text-zinc-700 font-bold">How it works</a>
                </p>
            </div>
        </div>
    )
}