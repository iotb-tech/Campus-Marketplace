export default function CreateList (){
    return (
        <div className="flex flex-col py-5 items-center h-screen">
        <div>
            <div className="font-bold mb-3">Create a New Listing</div>
            <div>
                <p>Fill out the details below to post your item for sale to the campus community</p>
            </div>
            <div className="border-solid flex mt-4 flex-col px-6 rounded-md py-5 w-[700px] h-[450px] border-1 border-white">
                <div>
                    <p>Photos</p>
                    <div className="border-dotted static border-2 rounded-md mt-2 border-white w-[600px] h-[100px]">
                        <div className="relative top-5 text-center">
                            <input type="file" name="file" id="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                            <p> Click to Upload or drag and drop</p>
                            <p>SVG, JPG, PNG or GIF (max. 800 x 400px) </p>
                        </div>
                    </div>
                </div>

                <div className="mt-2">
                    <label htmlFor="first-name" className="block text-sm/6 font-medium text-white">Title *</label>
                    <div className="mt-2">
                        <input id="first-name" type="text" name="first-name" autoComplete="given-name" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                    </div>
                </div>

                <div className="flex flex-row gap-4 mt-2">
                    
                    <div className="grow">
                        <label htmlFor="condition" className="block text-sm/6 font-medium text-white">Condition *</label>
                        <div className="mt-2">
                            <select id="condition" name="condition" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6">
                                <option value="new">New</option>
                                <option value="like-new">Like New</option>
                                <option value="good">Good</option>
                                <option value="fair">Fair</option>
                                <option value="poor">Poor</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="grow">
                        <label htmlFor="price" className="block text-sm/6 font-medium text-white">Price *</label>
                        <div className="mt-2">
                            <input id="price" type="text" name="price" autoComplete="price" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                        </div>
                    </div>

                </div>

                <div  className="mt-2">
                    <p>Description *</p>
                    <div className="mt-2">
                            <textarea id="about" name="about" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"></textarea>
                        </div>
                    </div>
                </div>
        </div>
        </div>
    );
}