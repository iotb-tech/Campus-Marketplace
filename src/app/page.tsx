import { createClient } from "@/app/lib/supabase/server";
import Link from 'next/link';
import LandingHeader from './components/LandingHeader';
import About from './components/About';
import CategoriesCard from './components/CategoriesCard';
import DescriptionCard from './components/DescriptionCard';
import FreshProducts from './components/FreshProduct';
import Hero from './components/Hero';
import BuiltForStudent from './components/Student';
import calculus  from './assets/calculus.jpg'
import salesItem  from './assets/salesitem.jpg'
import { cookies } from 'next/headers';
import Footer from './components/Footer';

const categoriesItems = [
  {
    image : salesItem.src,
    title:"Textbooks",
    numberOfListings:1240
    
  },
   {
    image : salesItem.src,
    title:"Textbooks",
    numberOfListings:1240
  },
   {
    image : salesItem.src,
    title:"Textbooks",
    numberOfListings:1240
  },
   {
    image : salesItem.src,
    title:"Textbooks",
    numberOfListings:1240
  },
]


const  freshProductItems = {
    image: calculus.src,
    isFavourite:true,
    productName: "iPad Pro 11 (2022)",
    location:"Main Library",
    time: "2 mins ago",
    price:550, 
}

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center gap-4">
      <LandingHeader isLoggedIn={!!user} />
      <main className="px-6">
        <Hero />
        {/* <About />*/}

        <div className="flex flex-row justify-between">
          <div className="text-2xl font-bold">Explore Categories</div>
          <Link href="/categories" className="text-primary">View All</Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 py-12">
          <CategoriesCard /> 
        </div>

        <div className="flex flex-row justify-between">
          <div className="text-2xl font-bold">Fresh on Campus</div>
          <Link href="/my-listings" className="text-primary">View All</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 py-6 overflow-x-auto gap-4 justify-between">
          <FreshProducts />
          <FreshProducts />
          <FreshProducts />
          <FreshProducts />
        </div>

        {/* <BuiltForStudent /> */}
      </main>
      <Footer />
    </div>
  );
}