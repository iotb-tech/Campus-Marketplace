
import Link from 'next/link';
import About from './components/About';
import CategoriesCard from './components/CategoriesCard';
import DescriptionCard from './components/DescriptionCard';
import FreshProducts from './components/FreshProduct';
import Hero from './components/Hero';
import BuiltForStudent from './components/Student';

import calculus  from '../assets/calculus.jpg'

import salesItem  from '../assets/salesitem.jpg'

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

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center gap-4">
        <main className="px-6">
      <Hero />
      <About />
      <div className="flex flex-col sm:flex-row px-6 justify-between">
        <DescriptionCard />
        <DescriptionCard />
        <DescriptionCard />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4  gap-4 py-12 px-2 justify-between">
         <CategoriesCard categories={categoriesItems}/>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 py-6 overflow-x-auto gap-4 px-2 justify-between">
        <FreshProducts />
        <FreshProducts />
        <FreshProducts />
        <FreshProducts />
      </div>
     
      <BuiltForStudent />
    </main>
    </div>
  );
}
