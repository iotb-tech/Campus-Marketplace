import CategoriesCard from "./CategoriesCard";
import DescriptionCard from "./DescriptionCard";

export default function About() {
    return (
        <div className="flex flex-col px-6 justify-center align-center text-zinc-950 justify-center">
            <h3 className="font-bold text-center text-2xl"> Why use Campus Market</h3>
           
            <div className="flex justify-center">
                 <p className="text-zinc-600 text-sm text-center font-light text-xl mb-5 mt-5 mx-auto m-w-2xl">
                Designed specifically for the college ecosystem to make peer-to-peer ecommerce effortless.
                </p>
            </div>

        </div>
    );
}