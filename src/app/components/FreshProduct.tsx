import calculus from '../assets/calculus.jpg'
type FreshProductList = {
    image: string;
    isFavourite:boolean;
    productName: string;
    location: string;
    time: string;
    price:number;
}

type freshProductProps = {
    freshProductLists: FreshProductList[];
}
export default function FreshProducts(){
    return (
    <div className="flex flex-col border-1 rounded-lg  border-gray-300">
        <div className="relative h-48">
             <div className="absolute bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <img src={calculus.src} alt="product" className="w-full h-48 object-cover rounded-md"/>           
        </div>
        <div className="flex flex-row px-4 gap-6 justify-space-around">
            <div className="grow-1">
                <strong className="font-bold text-sm text-[#424754]">iPad Pro 11 (2022)</strong>   
            </div>
            <div className="text-2xl grow-1 justify-items-end font-bold">$550</div>
        </div>

         <div className="flex flex-col px-4 gap-2 pb-4 justify-space-around">
                <p className="font-normal text-md text-[#424754]">Main Library</p>
                <hr />
                <p className="font-normal text-md text-[#424754]">2 mins ago</p>
        </div>
</div>
    )
    
}