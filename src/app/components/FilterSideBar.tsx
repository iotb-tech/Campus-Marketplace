"use client"

export default function FilterSideBar() {
    
    return (
        <>
        <aside className="w-64 p-6 bg-white border border-gray-300 rounded-2xl shadow-sm text-gray-800 font-sans m-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Filters</h2>
            {/* Categories Section*/}
            <section >
                <h3 className="text-xl font-bold tracking-wider text-gray-500 uppercase mb-4">Categories</h3>
                <div className="flex flex-col justify-center gap-2">
                    <label htmlFor="textbooks" className="flex items-center gap-3 cursor-pointer text-lg font-medium">
                        <input type="checkbox" name="textbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" defaultChecked/>
                        Textbooks
                    </label>
                    <label htmlFor="electronics" className="flex items-center gap-3 cursor-pointer text-lg font-medium">
                        <input type="checkbox" name="electronics" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"/>
                        Electronics
                    </label>
                    <label htmlFor="furniture" className="flex items-center gap-3 cursor-pointer text-lg font-medium">
                        <input type="checkbox" name="furniture" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"/>
                        Furniture
                    </label>
                    <label htmlFor="clothing" className="flex items-center gap-3 cursor-pointer text-lg font-medium">
                        <input type="checkbox" name="clothing" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"/>
                        Clothing
                    </label>
                    <label htmlFor="supplies" className="flex items-center gap-3 cursor-pointer text-lg font-medium">
                        <input type="checkbox" name="supplies" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"/>
                        Supplies
                    </label>
                </div>
            </section>
            {/* Price Section*/}
            <section>
                <h3 className="text-xl font-bold tracking-wider text-gray-500 uppercase my-3">Price</h3>
                <div className="flex items-center gap-2">
                    <input type="number" placeholder="Min" className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500" />
                    <span className="text-gray-400 font-medium">-</span>
                    <input type="number" placeholder="Max" className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500" />
                </div>
            </section>
            {/* Conditon Section*/}
            <section>
                <h3 className="text-xl font-bold tracking-wider text-gray-500 uppercase my-3">Condition</h3>
                <div>
                    <label htmlFor="Any" className="flex items-center gap-3 cursor-pointer text-lg font-medium">
                        <input type="radio" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" defaultChecked/>
                        Any
                    </label>
                    <label htmlFor="New" className="flex items-center gap-3 cursor-pointer text-lg font-medium">
                        <input type="radio" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"/>
                        New
                    </label>
                    <label htmlFor="Like New" className="flex items-center gap-3 cursor-pointer text-lg font-medium">
                        <input type="radio" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"/>
                        Like New
                    </label>
                    <label htmlFor="Good" className="flex items-center gap-3 cursor-pointer text-lg font-medium">
                        <input type="radio" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"/>
                        Good
                    </label>
                </div>
            </section>
        </aside>
        </>
    );
}