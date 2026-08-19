import campusmarket from "../assets/campusmarket.jpg"
export default function Hero(){
    return (
        <section className="pt-24 pb-10 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 py-3 ">
            <div className="w-full flex flex-col text-left gap-1">
                <div className="py-4">
                <span className="border-1  border-solid border-blue-300 rounded-lg bg-blue-100 px-2 text-sm text-blue-600">Trusted by <b>10,000+</b> students</span>
               </div>
               <div className="flex flex-col py-4 gap-1">
                    <strong className="text-zinc-950 text-3xl">The safest way to buy </strong>
                    <strong className="text-zinc-950 text-3xl">and sell on campus</strong>
                </div>
                <p className="text-zinc-600 font-medium text-sm py-6">
                    Connect with verified students at your university. Buy textbooks, sell furnitures, and discover local deals safely and sustainably
                </p>
                <div className="flex flex-col gap-6 sm:flex-row">
                    <button className="rounded-lg px-12 py-3 sm:px-8 sm:py-3 bg-[#3b82f6] hover:opacity-90 text-sm text-white font-normal">Browse Listings</button>
                    <button className="border-1 border-outline bg-surface rounded-lg px-12 py-3 sm:px-8 sm:py-3  text-sm text-zinc-700 font-bold">How it works</button>
                </div>
            </div>

            <div className="relative w-full p-3">
            <div className="absolute w-full h-100 rounded-lg rotate-4 px-4 py-4 bg-[#f6f2f7]"></div>
            <div className="w-full relative m-4">
                <img src={campusmarket.src} className="relative z-10 w-full h-[400px] object-cover rounded-[2rem] shadow-lg " alt="Hero Image"/>
            </div>
            </div>
        </div>
        </section>
    )
}