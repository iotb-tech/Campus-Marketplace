import { createClient } from "@/app/lib/supabase/server";
import furniture from "../assets/furniture.jpg";

const categoryMeta: Record<string, { label: string; icon: string; description: string }> = {
  electronics: { label: "Electronics", icon: "devices", description: "Laptops, phones, gadgets and more" },
  books: { label: "Textbooks", icon: "menu_book", description: "Course materials and reading books" },
  furniture: { label: "Furniture", icon: "chair", description: "Desks, chairs, beds and other furniture" },
  clothing: { label: "Clothing", icon: "checkroom", description: "Apparel, shoes and accessories" },
  school_supplies: { label: "School Supplies", icon: "edit_note", description: "Stationery, bags and essentials" },
  vehicles_rides: { label: "Vehicles & Rides", icon: "directions_car", description: "Cars, bikes and ride shares" },
  other: { label: "Other", icon: "category", description: "Everything else" },
};

export default async function CategoriesCard (){

    
   const supabase = await createClient();
  
    const { data } = await supabase
      .from("listings")
      .select("category")
      .eq("status", "available");
  
    const category = data!;
    const counts: Record<string, number> = {};
    data?.forEach((row) => {
      counts[row.category] = (counts[row.category] || 0) + 1;
    });
    

    return Object.entries(categoryMeta).map(([key, meta]) =>(
            <div className="relative h-48 rounded-lg rounded-blue-200" key={key}>
            <img src={furniture.src} className="rounded-lg  h-full" alt="Book Image" />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className=" flex flex-col absolute left-8 bottom-3">      
            <strong className="font-bold text-xl text-white"> {meta.label}</strong>
            <span className="font-thin text-white text-sm">{counts[key] || 0} item{counts[key] !== 1 ? "s" : ""}    Listings</span>
            </div>
        </div>
    ))
    
    
}