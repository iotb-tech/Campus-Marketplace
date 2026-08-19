
type Categories = {
    image : string;
    title:string;
    numberOfListings:number
}


type CategoriesCardProps = {
    categories: Categories[];
};

export default function CategoriesCard ({categories}:CategoriesCardProps){
    return categories.map((category,index) =>(
            <div className="relative h-48 rounded-lg rounded-blue-200" key={index}>
            <img src={category.image} className="rounded-lg  h-full" alt="Book Image" />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className=" flex flex-col absolute left-8 bottom-3">      
            <strong className="font-bold text-xl text-white"> {category.title}</strong>
            <span className="font-thin text-white text-sm">{category.numberOfListings}Listings</span>
            </div>
        </div>
    ))
    
    
}